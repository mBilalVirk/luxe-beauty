# Luxe Beauty Salon

A modern React/Vite recreation of the Luxe Beauty Salon website.

## Features

- Hero carousel
- Services carousel
- Booking modal
- Gallery lightbox
- Testimonials
- Responsive navigation
- Scroll animations
- Image fallback
- Mobile booking bar
- Accessibility support

## Installation

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Google Sheets Booking Setup

1. Create a Google Sheet with two tabs named `Availability` and `Bookings`.
2. In `Availability`, add this header row: `Date`, `Time`, `Capacity`, `Remaining`.
3. Add one row per bookable slot, using real dates in column A, times such as `10:30 AM` in column B, and the available quantity in columns C and D. If no rows exist for a date, the app uses hourly slots from `2:00 PM` through `10:00 PM` with one booking per slot.
4. In `Bookings`, add this header row: `Created At`, `Full Name`, `Phone`, `Email`, `Service`, `Date`, `Time`, `Status`.
5. Open **Extensions > Apps Script**, paste in `google-apps-script/Code.gs`, and deploy it as a web app. Set **Execute as** to yourself and **Who has access** to anyone.
6. Copy the deployment URL to a local `.env` file as `VITE_BOOKING_API_URL`, based on `.env.example`, then restart Vite.

The Apps Script validates each slot under a lock, decreases its remaining capacity, and appends confirmed requests to `Bookings`.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── hero/
│   ├── layout/
│   ├── modals/
│   ├── sections/
│   └── ui/
├── data/
├── hooks/
├── App.jsx
├── main.jsx
└── index.css
```

This project preserves the Luxe Beauty Salon identity while modernizing the implementation with React, Tailwind CSS, reusable components, and Lucide icons.
