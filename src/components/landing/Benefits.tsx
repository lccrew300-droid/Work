import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Users, Megaphone, Sparkles, ChevronDown } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save time and resources",
    description: "Ditch the paperwork and the hassle of manually creating PDF certificates. Streamline credential issuance, verification, and management — all from one platform.",
  },
  {
    icon: BookOpen,
    title: "Drive skill development",
    description: "Recognized certifications motivate recipients to keep learning and improving. Foster a culture of growth within your organization.",
  },
  {
    icon: Users,
    title: "Ignite recipient engagement",
    description: "Digital certificates serve as proof of achievement. Reinforce your brand credibility and increase recipient engagement.",
  },
  {
    icon: Megaphone,
    title: "Boost your brand",
    description: "When recipients share their digital certificates, your brand gains instant visibility and free marketing across social media.",
  },
  {
    icon: Sparkles,
    title: "Add professional certificates",
    description: "Issue enterprise-level credentials that stand out. Design from scratch or choose from thousands of professionally crafted templates.",
  },
];

const Benefits = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-primary mb-2">1.1M+ people already received their certifications</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Real tangible benefits of certificate automation
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex items-center gap-4 w-full p-5 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display font-bold text-foreground flex-1">{benefit.title}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pl-[4.5rem] text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
