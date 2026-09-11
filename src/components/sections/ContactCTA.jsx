import { CalendarDays } from "lucide-react";
import Button from "../ui/Button";

export default function ContactCTA({ onBookNow }) {
  return (
    <section id="contact" className="bg-rosePale py-6">
      <div className="mx-auto flex max-w-luxe flex-col items-center justify-between gap-6 px-4 py-6 md:flex-row md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-roseDark shadow-sm">
            <CalendarDays size={22} />
          </div>
          <div>
            <h4 className="font-serif text-[1.3rem] text-ink">
              Ready to Pamper Yourself?
            </h4>
            <p className="text-sm text-inkSoft">
              Book your appointment today and let us take care of you.
            </p>
          </div>
        </div>
        <Button
          onClick={onBookNow}
          className="px-6 py-3.5 text-base font-medium"
        >
          Book Your Appointment
        </Button>
      </div>
    </section>
  );
}
