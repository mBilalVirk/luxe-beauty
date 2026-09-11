import { useState } from "react";
import { Expand } from "lucide-react";
import { gallery } from "../../data/gallery";
import ImageWithFallback from "../ui/ImageWithFallback";

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="gallery" className="py-28">
      <div className="mx-auto max-w-luxe px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-roseDark">
            <span className="h-px w-7 bg-roseDark" />
            Our Gallery
          </p>
          <h2 className="font-serif text-[2.1rem] leading-tight text-ink md:text-[2.6rem]">
            Beauty Moments to Remember
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {gallery.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Open ${item.alt} in lightbox`}
              onClick={() => setActiveIndex(index)}
              className="group relative overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-roseDark focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[3/3.6] overflow-hidden">
                <ImageWithFallback
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-ink opacity-0 transition group-hover:opacity-100">
                  <Expand size={15} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,10,9,0.92)] p-5"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            aria-label="Close gallery lightbox"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            ✕
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === 0 ? gallery.length - 1 : prev - 1,
              )
            }
            className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            ←
          </button>

          <div className="relative max-w-[880px]">
            <ImageWithFallback
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              className="max-h-[82vh] w-auto max-w-[min(880px,92vw)] rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-sm text-white/80">
              {activeIndex + 1} / {gallery.length}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % gallery.length)
            }
            className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
