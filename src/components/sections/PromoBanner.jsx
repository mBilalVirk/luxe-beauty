import Button from "../ui/Button";

export default function PromoBanner({ onBookNow }) {
  return (
    <section className="mx-auto max-w-luxe px-4 pb-28 md:px-8">
      <div className="relative overflow-hidden rounded-[12px] bg-ink px-8 py-10 text-[#f4e9e4] md:px-12 md:py-14">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(168,94,109,0.5),rgba(20,14,12,0.9))]" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="mb-3 block text-[0.78rem] uppercase tracking-[0.15em] text-rosePale">
              New Client Special Offer
            </span>
            <h3 className="font-serif text-[2rem] leading-tight text-white">
              Get 20% Off on Your First Visit
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Limited time offer for all new clients. Book your appointment
              today!
            </p>
          </div>
          <Button
            onClick={onBookNow}
            className="px-6 py-3.5 text-base font-medium"
          >
            Book Now &amp; Save 20%
          </Button>
        </div>
      </div>
    </section>
  );
}
