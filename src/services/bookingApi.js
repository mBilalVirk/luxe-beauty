const bookingApiUrl = import.meta.env.VITE_BOOKING_API_URL;
export const defaultBookingTimes = [
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

async function parseResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.error || "The booking service is unavailable.");
  }
  return payload;
}

export async function getAvailableTimes(date) {
  if (!bookingApiUrl) {
    return defaultBookingTimes;
  }

  const response = await fetch(
    `${bookingApiUrl}?action=availability&date=${encodeURIComponent(date)}`,
  );
  const payload = await parseResponse(response);
  return payload.times?.length ? payload.times : defaultBookingTimes;
}

export async function createBooking(values) {
  if (!bookingApiUrl) {
    throw new Error(
      "Booking is not connected. Deploy the Google Apps Script and set VITE_BOOKING_API_URL in .env.",
    );
  }

  const response = await fetch(bookingApiUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(values),
  });
  return parseResponse(response);
}
