import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
};

const todayString = () => new Date().toISOString().split("T")[0];

function validateBooking(values) {
  const errors = {};
  const name = values.fullName.trim();
  if (!name || name.length < 2)
    errors.fullName = "Please enter your full name.";

  const phone = values.phone.trim();
  if (!phone || !/^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]*$/.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  const email = values.email.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.service) errors.service = "Please select a service.";
  if (!values.date) errors.date = "Please choose a date.";
  else if (new Date(values.date) < new Date(todayString()))
    errors.date = "Date cannot be before today.";
  if (!values.time) errors.time = "Please choose a time.";

  return errors;
}

export default function BookingModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && !isSubmitted) {
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [isOpen, isSubmitted]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateBooking(form);
    setErrors(nextErrors);

    const invalidKey = Object.keys(nextErrors)[0];
    if (invalidKey) {
      const field = document.querySelector(`[name="${invalidKey}"]`);
      field?.focus();
      return;
    }

    onSubmit?.(form);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(15,10,9,0.6)] p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative w-full max-w-[460px] rounded-[12px] bg-white p-6 shadow-2xl md:p-8">
        <button
          type="button"
          aria-label="Close booking form"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink transition hover:bg-rosePale"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <>
            <h3 className="font-serif text-[1.8rem] text-ink">
              Book Your Visit
            </h3>
            <p className="mt-2 text-sm text-inkSoft">
              We’ll help you find the perfect treatment for your beauty goals.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div className={errors.fullName ? "invalid" : ""}>
                <label
                  className="mb-1 block text-[0.82rem] text-inkSoft"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  ref={firstInputRef}
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-roseDark"
                />
                {errors.fullName && (
                  <div className="mt-1 text-xs text-[#b23b3b]">
                    {errors.fullName}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className={errors.phone ? "invalid" : ""}>
                  <label
                    className="mb-1 block text-[0.82rem] text-inkSoft"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-roseDark"
                  />
                  {errors.phone && (
                    <div className="mt-1 text-xs text-[#b23b3b]">
                      {errors.phone}
                    </div>
                  )}
                </div>

                <div className={errors.email ? "invalid" : ""}>
                  <label
                    className="mb-1 block text-[0.82rem] text-inkSoft"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-roseDark"
                  />
                  {errors.email && (
                    <div className="mt-1 text-xs text-[#b23b3b]">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className={errors.service ? "invalid" : ""}>
                <label
                  className="mb-1 block text-[0.82rem] text-inkSoft"
                  htmlFor="service"
                >
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-roseDark"
                >
                  <option value="">Select a service</option>
                  <option value="Makeup Services">Makeup Services</option>
                  <option value="Hair Styling">Hair Styling</option>
                  <option value="Nail Care">Nail Care</option>
                  <option value="Facial Treatment">Facial Treatment</option>
                  <option value="Waxing Services">Waxing Services</option>
                  <option value="Eyelash Extensions">Eyelash Extensions</option>
                  <option value="Body Massage">Body Massage</option>
                </select>
                {errors.service && (
                  <div className="mt-1 text-xs text-[#b23b3b]">
                    {errors.service}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className={errors.date ? "invalid" : ""}>
                  <label
                    className="mb-1 block text-[0.82rem] text-inkSoft"
                    htmlFor="date"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={todayString()}
                    value={form.date}
                    onChange={handleChange}
                    className="w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-roseDark"
                  />
                  {errors.date && (
                    <div className="mt-1 text-xs text-[#b23b3b]">
                      {errors.date}
                    </div>
                  )}
                </div>

                <div className={errors.time ? "invalid" : ""}>
                  <label
                    className="mb-1 block text-[0.82rem] text-inkSoft"
                    htmlFor="time"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink outline-none transition focus:border-roseDark"
                  >
                    <option value="">Select a time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </select>
                  {errors.time && (
                    <div className="mt-1 text-xs text-[#b23b3b]">
                      {errors.time}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-roseDark px-4 py-3 text-base font-medium text-white transition hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roseDark focus-visible:ring-offset-2"
              >
                Confirm Booking
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rosePale text-roseDark">
              <Check size={32} />
            </div>
            <h3 className="font-serif text-[1.8rem] text-ink">
              Booking Requested!
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-inkSoft">
              Thank you — our team will call you shortly to confirm your
              appointment.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-roseDark px-5 py-3 text-sm font-medium text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
