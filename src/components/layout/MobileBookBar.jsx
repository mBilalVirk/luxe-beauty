import Button from "../ui/Button";

export default function MobileBookBar({ onBookNow }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-20px_rgba(0,0,0,0.35)] md:hidden">
      <div>
        <div className="text-[0.72rem] uppercase tracking-[0.14em] text-inkSoft">
          From
        </div>
        <div className="font-serif text-[1.2rem] text-roseDark">$35</div>
      </div>
      <Button
        onClick={onBookNow}
        className="min-h-11 flex-1 px-4 py-3 text-sm font-medium"
      >
        Book Now
      </Button>
    </div>
  );
}
