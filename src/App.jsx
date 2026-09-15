import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import TopBar from "./components/layout/TopBar";
import Hero from "./components/hero/Hero";
import Features from "./components/sections/Features";
import About from "./components/sections/About";
import ServicesCarousel from "./components/sections/ServicesCarousel";
import GallerySection from "./components/sections/GallerySection";
import Testimonials from "./components/sections/Testimonials";
import PromoBanner from "./components/sections/PromoBanner";
import ContactCTA from "./components/sections/ContactCTA";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/layout/BackToTop";
import MobileBookBar from "./components/layout/MobileBookBar";
import BookingModal from "./components/modals/BookingModal";
import { createBooking } from "./services/bookingApi";

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  const handleBookNow = () => {
    openBooking();
  };

  const handleSalonTour = () => {
    setToast("Salon tour demo is ready to play.");
  };

  const handleSubmitBooking = async (values) => {
    await createBooking(values);
    setToast("Booking request received.");
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      <TopBar />
      <Header onBookNow={handleBookNow} />
      <main>
        <Hero
          onBookNow={handleBookNow}
          onExploreServices={() =>
            document
              .getElementById("services")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <Features />
        <About onOpenTour={handleSalonTour} />
        <ServicesCarousel onBookNow={handleBookNow} />
        <GallerySection />
        <Testimonials />
        <PromoBanner onBookNow={handleBookNow} />
        <ContactCTA onBookNow={handleBookNow} />
      </main>
      <Footer />
      <BackToTop />
      <MobileBookBar onBookNow={handleBookNow} />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        onSubmit={handleSubmitBooking}
      />

      {toast && (
        <div className="fixed left-1/2 top-5 z-[80] -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-sm text-white shadow-lg transition-all duration-300">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
