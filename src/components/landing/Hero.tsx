import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Play, Star } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const benefits = [
  "Save hours of manual work",
  "Increase program visibility",
  "Provide branded experience",
];

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 md:px-8 overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold font-mono tracking-widest uppercase mb-6">
              #1 Certificate Maker
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.1] tracking-tighter text-foreground mb-8">
              Issue and Manage{" "}
              <br />
              <span className="text-gradient">Digital Credentials</span>
            </h1>
            <p className="text-xl text-muted-foreground/90 mb-10 max-w-xl leading-relaxed font-medium">
              AI-powered platform to generate verifiable certificates, credentials, and badges. Connect to your tools and run certifications from one place.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-sm font-medium">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-6 mt-4">
              <Button size="lg" className="rounded-full px-10 h-14 font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Sign up for free
              </Button>
              <button className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all group">
                <span className="w-12 h-12 rounded-full border-2 border-border bg-white flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                  <Play className="w-5 h-5 text-primary fill-primary" />
                </span>
                <span className="text-base font-bold font-heading uppercase tracking-wide">Watch Explainer</span>
              </button>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.7/5 (800+ reviews)</span>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img
                src={heroDashboard}
                alt="CredentialPro certificate builder dashboard"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:-left-8 bg-card rounded-xl p-4 shadow-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">2,400+</p>
                  <p className="text-xs text-muted-foreground">Certificates issued</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
