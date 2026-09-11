import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Star, Clock } from "lucide-react";
import { heroSlides } from "../../data/heroSlides";
import ImageWithFallback from "../ui/ImageWithFallback";
import Button from "../ui/Button";

const getTouchPosition = (event) => {
  if (event.touches && event.touches[0]) return event.touches[0].clientX;
  return null;
};

export default function Hero({ onBookNow, onExploreServices }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const activeSlide = useMemo(() => heroSlides[activeIndex], [activeIndex]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || isPaused) return undefined;

    timerRef.current = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroSlides.length);
    }, 6000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);

  const goToSlide = (index) => {
    setActiveIndex((index + heroSlides.length) % heroSlides.length);
  };

  const resetAutoPlay = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timerRef.current = window.setInterval(() => {
        setActiveIndex((index) => (index + 1) % heroSlides.length);
      }, 6000);
    }
  };

  const handlePrevious = () => {
    goToSlide(activeIndex - 1);
    resetAutoPlay();
  };

  const handleNext = () => {
    goToSlide(activeIndex + 1);
    resetAutoPlay();
  };

  const handleTouchStart = (event) => {
    touchStartX.current = getTouchPosition(event);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const currentX = getTouchPosition(event);
    if (currentX === null) return;
    const delta = touchStartX.current - currentX;

    if (delta > 50) handleNext();
    if (delta < -50) handlePrevious();
    touchStartX.current = null;
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      handlePrevious();
    }
    if (event.key === "ArrowRight") {
      handleNext();
    }
  };

  return (
    <section
      className="relative overflow-hidden pb-16 pt-14 md:pb-20"
      id="home"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Beauty salon hero slideshow"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(193,126,139,0.14),_transparent_38%)]" />
      <div className="mx-auto max-w-luxe px-4 md:px-8">
        <div className="relative min-h-[560px]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10 max-w-xl">
              <p className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-roseDark">
                <span className="h-px w-7 bg-roseDark" />
                {activeSlide.eyebrow}
              </p>
              <h1 className="font-serif text-[2.45rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3rem] lg:text-[4rem]">
                {activeSlide.headline}
              </h1>
              <p className="mt-5 max-w-[440px] text-[1.05rem] leading-7 text-inkSoft">
                {activeSlide.text}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  className="px-6 py-3.5 text-base font-medium"
                  onClick={onBookNow}
                >
                  {activeSlide.cta}
                </Button>
                <Button
                  variant="secondary"
                  className="px-6 py-3.5 text-base font-medium"
                  onClick={onExploreServices}
                >
                  {activeSlide.secondary}
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
                    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
                  ].map((src, index) => (
                    <ImageWithFallback
                      key={src}
                      src={src}
                      alt="Client review avatar"
                      className="h-10 w-10 rounded-full border-2 border-cream object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </div>
                <div className="text-sm text-inkSoft">
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <span className="mt-1 block">
                    4.9 rating by 2,000+ happy clients
                  </span>
                </div>
              </div>
            </div>

            <div
              className="relative z-10"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative overflow-hidden rounded-[14px_14px_90px_14px] shadow-luxe">
                <ImageWithFallback
                  key={activeIndex}
                  src={activeSlide.image}
                  alt={activeSlide.headline}
                  className="h-[420px] w-full object-cover transition-opacity duration-500 md:h-[500px]"
                  loading="eager"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 flex h-32 w-32 items-center justify-center rounded-full bg-roseDark text-center text-white shadow-[0_20px_40px_-16px_rgba(168,94,109,0.7)] sm:-bottom-7 sm:-left-7 sm:h-36 sm:w-36">
                <div className="flex flex-col items-center px-3 text-[0.68rem] leading-[1.3]">
                  {activeSlide.icon === "star" && <Star size={18} />}
                  {activeSlide.icon === "clock" && <Clock size={18} />}
                  {activeSlide.icon === "calendar" && (
                    <CalendarDays size={18} />
                  )}
                  <strong className="font-serif text-base">
                    {activeSlide.badge}
                  </strong>
                  <span>{activeSlide.subBadge || "Luxury treatment"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={handlePrevious}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => {
                    setActiveIndex(index);
                    resetAutoPlay();
                  }}
                  className={`h-2.5 rounded-full transition-all ${activeIndex === index ? "w-7 bg-roseDark" : "w-2.5 bg-line"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
