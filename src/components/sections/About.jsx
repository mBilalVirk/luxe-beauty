import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { createPortal } from "react-dom";
import ImageWithFallback from "../ui/ImageWithFallback";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function About() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const youtubeVideoId = "lXu8bZn24Qs";

  const handleOpenTour = () => {
    setIsVideoOpen(true);
  };

  const handleCloseTour = () => {
    setIsVideoOpen(false);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVideoOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    if (!isVideoOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseTour();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVideoOpen]);

  return (
    <section id="about" className="py-28">
      <div className="mx-auto grid max-w-luxe items-center gap-16 px-4 md:px-8 lg:grid-cols-2">
        <Reveal className="relative overflow-hidden rounded-[14px] shadow-luxe">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxe Beauty Salon interior and beauty studio"
            className="aspect-[6/5] w-full object-cover"
          />

          <button
            type="button"
            aria-label="Play salon tour video"
            onClick={handleOpenTour}
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
            <Button className="px-5 py-3" onClick={handleOpenTour}>
              Watch Salon Tour
            </Button>
          </div>
        </Reveal>
      </div>

      {/* YouTube Video Modal Portal */}
      {isVideoOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm transition-opacity"
            onClick={handleCloseTour}
            role="dialog"
            aria-modal="true"
            aria-label="Salon virtual tour video player"
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                aria-label="Close video player"
                onClick={handleCloseTour}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              >
                <X size={20} />
              </button>

              {/* Responsive YouTube Embed Container */}
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="Luxe Beauty Salon Virtual Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
