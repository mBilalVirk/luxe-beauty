import { ShieldCheck, Sparkles, Star, SunMedium } from "lucide-react";

const features = [
  {
    title: "Premium Products",
    text: "We use high-quality international brands",
    icon: Sparkles,
  },
  {
    title: "Expert Beauticians",
    text: "Certified & experienced professionals",
    icon: Star,
  },
  {
    title: "Hygiene & Safety",
    text: "Clean, sanitized & fully professional",
    icon: ShieldCheck,
  },
  {
    title: "Relaxing Environment",
    text: "Luxury ambiance for your comfort",
    icon: SunMedium,
  },
];

export default function Features() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-luxe grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ title, text, icon: Icon }) => (
          <div
            key={title}
            className="flex items-start gap-3.5 border-b border-line p-8 md:border-b-0 md:border-r last:md:border-r-0 xl:border-r xl:last:border-r-0"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rosePale text-roseDark">
              <Icon size={20} />
            </div>
            <div>
              <h4 className="mb-1 font-serif text-[1.05rem] text-ink">
                {title}
              </h4>
              <p className="text-sm text-inkSoft">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
