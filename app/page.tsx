import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeatureProduct";
import AboutPreview from "@/components/home/AboutPreview";
import SubscriptionPlan from "@/components/home/SubscriptionPlane";
import Testimonials from "@/components/home/Testimonial";
import FeaturedMenu from "@/components/home/CustomerFev";
import CTA from "@/components/home/CTA";
import CategorySection from "@/components/home/CategorySection";
import WhyChooseUs from "@/components/home/WhyChoose"
import Gallery from "@/components/home/Gallery"
import SpecialOffers from "@/components/home/SpecialOffer"
import ContactSection from "@/components/home/ContactSection"

export default function Home() {
  return (
    <main>
      {/* 1. HERO (strong hook + CTA buttons) */}
      <Hero />

      {/* 2. QUICK ACTION (VERY IMPORTANT) */}
      <CategorySection />

      {/* 3. FEATURED / BEST SELLERS (CUSTOMER FAVORITES) */}
      <FeaturedMenu />

      {/* 4. WHY CHOOSE US (trust building) */}
      <WhyChooseUs />

      {/* 5. SPECIAL OFFERS (conversion boost) */}
      <SpecialOffers />

      {/* 6. FULL MENU PREVIEW (optional but powerful) */}
      {/* <FeaturedProducts /> */}

      {/* 7. ABOUT BRAND */}
      <AboutPreview />

      {/* 8. GALLERY (social proof / visuals) */}
      <Gallery />

      {/* 9. TESTIMONIALS (trust) */}
      <Testimonials />

      {/* 10. CONTACT */}
      <ContactSection />

      {/* 11. FINAL CTA (VERY IMPORTANT) */}
      <CTA />
    </main>
  );
}