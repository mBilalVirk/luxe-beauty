import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Plus } from "lucide-react";
import { services } from "../../data/services";
import ImageWithFallback from "../ui/ImageWithFallback";
import Button from "../ui/Button";

export default function ServicesCarousel({ onBookNow }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, []);

  const cardStep = useMemo(() => {
    const track = trackRef.current;
    if (!track) return 320;
    const firstCard = track.querySelector("[data-service-card]");
    return firstCard ? firstCard.getBoundingClientRect().width + 24 : 320;
  }, [trackRef.current]);

  const updateProgress = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    setProgress(Math.min(100, Math.max(0, ratio * 100)));
  };

  const scrollByAmount = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * cardStep * 1.5, behavior: "smooth" });
    setTimeout(updateProgress, 150);
  };

  const onPointerDown = (event) => {
    const track = trackRef.current;
    if (!track) return;
    setDragging(true);
    setStartX(event.clientX);
    setScrollLeft(track.scrollLeft);
    track.classList.add("cursor-grabbing");
  };

  const onPointerMove = (event) => {
    if (!dragging || !trackRef.current) return;
    const dx = event.clientX - startX;
    trackRef.current.scrollLeft = scrollLeft - dx;
  };

  const onPointerUp = () => {
    if (!trackRef.current) return;
    setDragging(false);
    trackRef.current.classList.remove("cursor-grabbing");
    updateProgress();
  };

  return (
    <section id="services" className="pb-28">
      <div className="mx-auto max-w-luxe px-4 md:px-8">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-roseDark">
              <span className="h-px w-7 bg-roseDark" />
              Our Services
            </p>
            <h2 className="font-serif text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
              Beauty Services Tailored to You
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous services"
              onClick={() => scrollByAmount(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next services"
              onClick={() => scrollByAmount(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            onScroll={updateProgress}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchStart={(event) =>
              onPointerDown({ clientX: event.touches[0].clientX })
            }
            onTouchMove={(event) =>
              onPointerMove({ clientX: event.touches[0].clientX })
            }
            onTouchEnd={onPointerUp}
            className="flex snap-x gap-6 overflow-x-auto px-1 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x proximity" }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.id}
                  data-service-card
                  className="group min-w-[270px] max-w-[270px] snap-start overflow-hidden rounded-[10px] border border-line bg-white shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-luxe"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-roseDark shadow-sm">
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <h3 className="font-serif text-[1.25rem] text-ink">
                      {service.name}
                    </h3>
                    <p className="text-sm leading-6 text-inkSoft">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-inkSoft">
                      <span className="flex items-center gap-2">
                        <Clock3 size={15} /> {service.duration}
                      </span>
                      <span className="font-serif text-[1.45rem] text-roseDark">
                        {service.price}
                      </span>
                    </div>
                    <Button
                      className="w-full px-4 py-3 text-sm"
                      onClick={onBookNow}
                    >
                      Book Now
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-roseDark transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
