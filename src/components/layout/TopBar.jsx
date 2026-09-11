import { Camera, MapPin, MessageCircle, Music2, Phone } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: "#", icon: Camera },
  { label: "Facebook", href: "#", icon: MessageCircle },
  { label: "TikTok", href: "#", icon: Music2 },
];

export default function TopBar() {
  return (
    <div className="bg-ink text-[#ece3de] text-[0.82rem]">
      <div className="mx-auto flex max-w-luxe items-center justify-between px-8 py-2.5">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="opacity-80 transition hover:text-rosePale hover:opacity-100"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-1.5 opacity-85 sm:flex">
            <MapPin size={14} />
            <span>123 Beauty Street, New York</span>
          </div>
        </div>

        <a
          href="tel:+12125558890"
          className="flex items-center gap-2 font-medium"
        >
          <Phone size={14} />
          <span>+1 (212) 555-8890</span>
        </a>
      </div>
    </div>
  );
}
