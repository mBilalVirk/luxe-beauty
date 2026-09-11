import { Play } from "lucide-react";
import ImageWithFallback from "../ui/ImageWithFallback";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function About({ onOpenTour }) {
  return (
    <section id="about" className="py-28">
      <div className="mx-auto grid max-w-luxe items-center gap-16 px-4 md:px-8 lg:grid-cols-2">
        <Reveal className="relative overflow-hidden rounded-[14px] shadow-luxe">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1521590832167-7e3a5d74f1b2?auto=format&fit=crop&w=1200&q=80"
            alt="Luxe Beauty Salon interior and beauty studio"
            className="aspect-[6/5] w-full object-cover"
          />

          <button
            type="button"
            aria-label="Play salon tour video"
            onClick={onOpenTour}
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-roseDark shadow-xl transition hover:scale-105"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
            <Play size={28} className="relative ml-1 fill-current" />
          </button>
        </Reveal>

        <Reveal>
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-roseDark">
            <span className="h-px w-7 bg-roseDark" />
            About Luxe
          </p>
          <h2 className="font-serif text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
            Where Beauty Meets Luxury
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-inkSoft">
            At Luxe Beauty Salon, we believe beauty is more than just looking
            good — it's about feeling your best. Our mission is to deliver
            exceptional services tailored to your unique style and needs, in a
            space built for you to unwind.
          </p>

          <div className="mt-9 flex flex-wrap gap-10">
            {[
              ["10+", "Years of Experience"],
              ["15K+", "Happy Clients"],
              ["25+", "Professional Experts"],
            ].map(([value, label]) => (
              <div key={label}>
                <b className="block font-serif text-[1.8rem] text-roseDark">
                  {value}
                </b>
                <span className="text-sm text-inkSoft">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button className="px-5 py-3" onClick={onOpenTour}>
              Watch Salon Tour
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
