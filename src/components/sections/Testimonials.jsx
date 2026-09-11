import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import ImageWithFallback from "../ui/ImageWithFallback";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3);
  const paddedTestimonials = [...visibleTestimonials, ...testimonials].slice(
    0,
    3,
  );

  return (
    <section id="testimonials" className="pb-28">
      <div className="mx-auto max-w-luxe px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-roseDark">
            <span className="h-px w-7 bg-roseDark" />
            Testimonials
          </p>
          <h2 className="font-serif text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
            Loved by Our Clients
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {paddedTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="rounded-xl bg-white p-7 shadow-soft"
              >
                <div className="font-serif text-[2.4rem] leading-none text-rosePale">
                  “
                </div>
                <div className="mt-2 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-inkSoft">
                  {testimonial.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <ImageWithFallback
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-ink">
                      {testimonial.name}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() =>
                setActiveIndex(
                  (index) =>
                    (index - 1 + testimonials.length) % testimonials.length,
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() =>
                setActiveIndex((index) => (index + 1) % testimonials.length)
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:bg-ink hover:text-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
