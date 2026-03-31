import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Cog, Send, Share2, ShieldCheck, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Paintbrush,
    label: "Design",
    title: "Create branded certificates and badges",
    description: "Use free templates or design from scratch using our intuitive certificate builder. Customize every element to match your brand identity.",
  },
  {
    icon: Cog,
    label: "Generate",
    title: "Generate certificates in bulk",
    description: "Generate certificates in bulk — saving time and reducing errors. Issue certificates with dynamic QR codes for instant verification.",
  },
  {
    icon: Send,
    label: "Send",
    title: "Deliver via branded emails",
    description: "Create branded email templates, personalize text, set up custom sender details, and track open rates for every credential sent.",
  },
  {
    icon: Share2,
    label: "Share",
    title: "Enable social sharing",
    description: "Make it easy for recipients to share achievements on LinkedIn, Facebook, X, and add credentials to email signatures.",
  },
  {
    icon: ShieldCheck,
    label: "Verify",
    title: "Protect with verification",
    description: "Protect your brand with verifiable digital credentials and ensure recipient security with OpenBadge 3.0 standard compliance.",
  },
  {
    icon: BarChart3,
    label: "Analyze",
    title: "Track engagement & performance",
    description: "Track credential engagement, social media shares, referrals, and other key aspects of your certification program.",
  },
];

const ProcessTabs = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            The complete certification platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Manage and automate every step of the digital credential journey.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {steps.map((step, i) => (
            <button
              key={step.label}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                active === i
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <step.icon className="w-4 h-4" />
              {step.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              {(() => {
                const Icon = steps[active].icon;
                return <Icon className="w-8 h-8 text-primary" />;
              })()}
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              {steps[active].title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {steps[active].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProcessTabs;
