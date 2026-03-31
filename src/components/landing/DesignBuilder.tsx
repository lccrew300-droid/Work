import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const designFeatures = [
  "Personalize certificate branding",
  "Customize all types of text elements",
  "Add graphic elements and icons",
  "Upload custom certificate backgrounds",
  "Add dynamic content and attributes",
];

const generatorFeatures = [
  "Generate certificates in multiple ways",
  "Use dynamic attributes in documents",
  "Add dynamic QR codes to credentials",
  "Customize email text & branding",
  "Create multiple email templates",
];

const DesignBuilder = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide space-y-24">
        {/* Design Builder */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Design Builder
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Create professional certificate designs in minutes
            </h2>
            <p className="text-muted-foreground mb-6">
              Our AI-powered certificate maker allows you to create stunning, professional-looking certificates — no design or coding skills required.
            </p>
            <ul className="space-y-3 mb-8">
              {designFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-sm text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full">Book a demo</Button>
              <Button className="rounded-full">
                Start for free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-8 flex items-center justify-center min-h-[320px]"
          >
            <div className="w-full max-w-sm space-y-4">
              <div className="h-3 rounded-full bg-primary/20 w-3/4" />
              <div className="h-3 rounded-full bg-primary/10 w-full" />
              <div className="h-3 rounded-full bg-primary/15 w-5/6" />
              <div className="h-40 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-border mt-6 flex items-center justify-center">
                <span className="text-muted-foreground text-sm font-display">Certificate Preview</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bulk Generator */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 bg-card rounded-2xl border border-border p-8 flex items-center justify-center min-h-[320px]"
          >
            <div className="w-full max-w-sm space-y-3">
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {row}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 rounded-full bg-primary/15 w-2/3" />
                    <div className="h-2 rounded-full bg-primary/10 w-1/2" />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-primary/20" />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-3 block">
              Certificate Generator
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Generate personalized credentials in bulk
            </h2>
            <p className="text-muted-foreground mb-6">
              Generate multiple digital certificates and send them to recipients via email or download them as PDF or CSV files.
            </p>
            <ul className="space-y-3 mb-8">
              {generatorFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-sm text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="rounded-full">Book a demo</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesignBuilder;
