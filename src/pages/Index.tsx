import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogoBar from "@/components/landing/LogoBar";
import ProductCards from "@/components/landing/ProductCards";
import ProcessTabs from "@/components/landing/ProcessTabs";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import DesignBuilder from "@/components/landing/DesignBuilder";
import Benefits from "@/components/landing/Benefits";
import ReviewsCarousel from "@/components/landing/ReviewsCarousel";
import Templates from "@/components/landing/Templates";
import AdvancedFeatures from "@/components/landing/AdvancedFeatures";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LogoBar />
      <ProductCards />
      <ProcessTabs />
      <Features />
      <Testimonials />
      <DesignBuilder />
      <Benefits />
      <ReviewsCarousel />
      <Templates />
      <AdvancedFeatures />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
