import {
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Pin,
} from "lucide-react";

const quickLinks = ["Home", "About Us", "Services", "Gallery", "Contact"];
const serviceLinks = [
  "Makeup",
  "Hair Styling",
  "Nail Care",
  "Facial Treatment",
  "Eyelash Extensions",
];

export default function Footer() {
  return (
    <footer className="bg-ink pt-20 text-[#cbbdb6]">
      <div className="mx-auto max-w-luxe px-6 md:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex flex-col items-start leading-none">
              <span className="font-serif text-3xl tracking-[0.12em] text-white">
                LUXE
              </span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-[#cbbdb6]">
              Enhancing your beauty and transforming your confidence, one visit
              at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {[Camera, MessageCircle, Music2, Pin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="Social media"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition hover:border-roseDark hover:bg-roseDark"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-5 text-base font-semibold uppercase tracking-[0.08em] text-white">
              Quick Links
            </h5>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="opacity-80 transition hover:text-rosePale hover:opacity-100"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-base font-semibold uppercase tracking-[0.08em] text-white">
              Services
            </h5>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="opacity-80 transition hover:text-rosePale hover:opacity-100"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-base font-semibold uppercase tracking-[0.08em] text-white">
              Contact
            </h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 opacity-90">
                <MapPin size={15} className="mt-1 flex-none text-rosePale" />
                <span>123 Beauty Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Phone size={15} className="flex-none text-rosePale" />
                <a href="tel:+12125558890">+1 (212) 555-8890</a>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Mail size={15} className="flex-none text-rosePale" />
                <a href="mailto:info@luxebeauty.com">info@luxebeauty.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-7 pt-6 text-[0.82rem] opacity-75 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Luxe Beauty Salon. All Rights Reserved.</p>
          <p>Made with ♥ for your beauty</p>
        </div>
      </div>
    </footer>
  );
}
