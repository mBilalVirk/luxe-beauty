const AVAILABILITY_SHEET = "Availability";
const BOOKINGS_SHEET = "Bookings";
const DEFAULT_TIMES = [
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
];

function doGet(request) {
  const action = request.parameter.action;
  if (action !== "availability") {
    return jsonResponse({ success: false, error: "Unknown action." });
  }

  const date = request.parameter.date;
  if (!date)
    return jsonResponse({ success: false, error: "Date is required." });

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(AVAILABILITY_SHEET);
  if (!sheet)
    return jsonResponse({
      success: false,
      error: "Availability sheet is missing.",
    });

  const rows = sheet.getDataRange().getValues();
  const times = rows
    .slice(1)
    .filter((row) => formatDate(row[0]) === date && Number(row[3]) > 0)
    .map((row) => String(row[1]));

  return jsonResponse({
    success: true,
    times: times.length ? times : DEFAULT_TIMES,
  });
}

function doPost(request) {
  const booking = JSON.parse(request.postData.contents);
  const requiredFields = [
    "fullName",
    "phone",
    "email",
    "service",
    "date",
    "time",
  ];
  if (requiredFields.some((field) => !booking[field])) {
    return jsonResponse({
      success: false,
      error: "All booking fields are required.",
    });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const availability = spreadsheet.getSheetByName(AVAILABILITY_SHEET);
    const bookings = spreadsheet.getSheetByName(BOOKINGS_SHEET);
    if (!availability || !bookings) {
      return jsonResponse({
        success: false,
        error: "Booking sheets are missing.",
      });
    }

    const rows = availability.getDataRange().getValues();
    let rowIndex = rows.findIndex(
      (row, index) =>
        index > 0 &&
        formatDate(row[0]) === booking.date &&
        String(row[1]) === booking.time,
    );
    if (rowIndex === -1) {
      if (!DEFAULT_TIMES.includes(booking.time)) {
        return jsonResponse({
          success: false,
          error: "That time is not available.",
        });
      }
      availability.appendRow([booking.date, booking.time, 1, 1]);
      rowIndex = availability.getLastRow() - 1;
    }

    const sheetRow = rowIndex + 1;
    const remaining = Number(availability.getRange(sheetRow, 4).getValue());
    if (remaining < 1) {
      return jsonResponse({
        success: false,
        error: "That time was just booked. Please choose another.",
      });
    }

    availability.getRange(sheetRow, 4).setValue(remaining - 1);
    bookings.appendRow([
      new Date(),
      booking.fullName,
      booking.phone,
      booking.email,
      booking.service,
      booking.date,
      booking.time,
      "Requested",
    ]);
    return jsonResponse({ success: true });
  } finally {
    lock.releaseLock();
  }
}

function formatDate(value) {
  return Utilities.formatDate(
    new Date(value),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd",
  );
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
