import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Button from "../ui/Button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const serviceItems = [
  "Makeup",
  "Hair Styling",
  "Nail Care",
  "Facial Treatment",
  "Waxing",
  "Eyelash Extensions",
];

export default function Header({ onBookNow }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? "shadow-[0_8px_30px_-20px_rgba(0,0,0,0.35)]" : ""}`}
    >
      <div className="mx-auto flex max-w-luxe min-w-0 items-center justify-between gap-4 px-4 py-4 md:px-8">
        <a
          href="#home"
          className="flex flex-col items-center leading-none"
          aria-label="Luxe Beauty Salon home"
        >
          <span className="font-serif text-[1.7rem] tracking-[0.12em] text-ink">
            LUXE
          </span>
          <span className="mt-1 text-[0.55rem] tracking-[0.2em] text-roseDark">
            BEAUTY
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 xl:flex"
        >
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.label} className="group relative">
                <a
                  href={item.href}
                  className="relative inline-flex items-center gap-1 py-1.5 text-[0.94rem] text-inkSoft transition hover:text-roseDark"
                >
                  {item.label}
                  <ChevronDown size={15} />
                </a>
                <div className="invisible absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-md border border-line bg-white p-2 opacity-0 shadow-soft transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {serviceItems.map((service) => (
                    <a
                      key={service}
                      href="#services"
                      className="block rounded px-3 py-2 text-sm text-inkSoft transition hover:bg-creamDeep hover:text-roseDark"
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1.5 text-[0.94rem] text-inkSoft transition hover:text-roseDark"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <div className="flex items-center gap-2.5 text-sm text-inkSoft">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rosePale text-roseDark">
              <Phone size={16} />
            </div>
            <div>
              <div className="text-[0.74rem] uppercase tracking-[0.16em] text-inkSoft/80">
                Call us
              </div>
              <div className="font-semibold text-ink">+1 (212) 555-8890</div>
            </div>
          </div>
          <Button
            onClick={onBookNow}
            className="
                    inline-flex items-center justify-center
                    gap-[10px]
                    px-8 py-4
                    rounded-[var(--radius)]
                    text-[0.95rem]
                    font-medium
                    tracking-[0.02em]
                    transition-[transform,box-shadow,background]
                    duration-250
                    ease-[var(--ease)]
                    whitespace-nowrap
                    rounded-[4px]
                "
          >
            Book Now
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <Button className="!px-3 !py-2 text-sm sm:!px-4" onClick={onBookNow}>
            Book Now
          </Button>
          <button
            type="button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative z-50 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(20,14,12,0.45)] transition-opacity duration-300 xl:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-[#fffaf7] px-6 py-6 shadow-2xl transition-transform duration-300 xl:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-[0.12em] text-ink">
            LUXE
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="space-y-2">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.label}
                className="rounded-md border border-line bg-white"
              >
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-list"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-inkSoft"
                >
                  {item.label}
                  <ChevronDown size={16} />
                </button>
                {mobileServicesOpen && (
                  <div
                    id="mobile-services-list"
                    className="border-t border-line bg-creamDeep/50 px-3 py-2"
                  >
                    {serviceItems.map((service) => (
                      <a
                        key={service}
                        href="#services"
                        onClick={handleNavClick}
                        className="block rounded px-3 py-2 text-sm text-inkSoft"
                      >
                        {service}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="block rounded-md px-4 py-3 text-inkSoft hover:bg-creamDeep hover:text-roseDark"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="mt-7 rounded-xl bg-rosePale p-4 text-sm text-ink">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <Phone size={16} className="text-roseDark" />
            +1 (212) 555-8890
          </div>
          <Button
            onClick={() => {
              onBookNow();
              setIsMenuOpen(false);
            }}
            className="w-full"
          >
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
