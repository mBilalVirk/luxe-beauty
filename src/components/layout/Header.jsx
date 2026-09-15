import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isServicesOpen) return undefined;

    const closeOnOutsidePointer = (event) => {
      if (!servicesMenuRef.current?.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsServicesOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isServicesOpen]);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const toggleMobileMenu = () => {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMobileMenuMounted(true);
      requestAnimationFrame(() => {
        setIsMenuOpen(true);
      });
    }
  };

  const handleNavClick = () => {
    closeMobileMenu();
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? "shadow-[0_8px_30px_-20px_rgba(0,0,0,0.35)]" : ""}`}
    >
      <div className="mx-auto flex max-w-luxe min-w-0 items-center justify-between gap-4 px-4 py-4 md:px-8">
        <a
          href="#home"
          onClick={handleNavClick}
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
              <div key={item.label} ref={servicesMenuRef} className="relative">
                <button
                  type="button"
                  aria-expanded={isServicesOpen}
                  aria-controls="desktop-services-menu"
                  aria-haspopup="true"
                  onClick={() => setIsServicesOpen((open) => !open)}
                  className="relative inline-flex items-center gap-1 py-1.5 text-[0.94rem] text-inkSoft transition hover:text-roseDark"
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    className={isServicesOpen ? "rotate-180" : ""}
                  />
                </button>
                {isServicesOpen && (
                  <div
                    id="desktop-services-menu"
                    className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-md border border-line bg-white p-2 shadow-soft"
                  >
                    {serviceItems.map((service) => (
                      <a
                        key={service}
                        href="#services"
                        onClick={() => setIsServicesOpen(false)}
                        className="block rounded px-3 py-2 text-sm text-inkSoft transition hover:bg-creamDeep hover:text-roseDark"
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
            aria-controls={isMenuOpen ? "mobile-navigation" : undefined}
            onClick={toggleMobileMenu}
            className="relative z-50 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuMounted &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 z-[100] bg-[rgba(20,14,12,0.45)] transition-opacity duration-300 ease-out xl:hidden ${
                isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <div
              id="mobile-navigation"
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget && !isMenuOpen) {
                  setIsMobileMenuMounted(false);
                }
              }}
              className={`fixed right-0 top-0 z-[101] h-full w-80 max-w-[85vw] overflow-y-auto bg-[#fffaf7] px-6 py-6 shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
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
                  onClick={closeMobileMenu}
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
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
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
                    closeMobileMenu();
                  }}
                  className="w-full"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
