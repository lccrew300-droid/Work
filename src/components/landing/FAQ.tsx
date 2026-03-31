import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Can I generate certificates in bulk?",
    a: "Yes, you can generate digital certificates in bulk. Create a group of recipients, add their information, and generate all certificates at once. You can also mass-export a list of URLs for quick and easy access.",
  },
  {
    q: "What do recipients receive when I send certificates?",
    a: "Recipients receive a personalized email with a link to their digital certificate. They can view, download as PDF, share on social media, and add it to their LinkedIn profile — all without creating an account.",
  },
  {
    q: "Can I add custom branding to issued certificates?",
    a: "Absolutely. You can fully customize certificates with your logo, brand colors, custom fonts, backgrounds, and design elements. Every credential reflects your organization's identity.",
  },
  {
    q: "How do I edit a certificate after issuing it?",
    a: "You can update certificate designs and recipient information at any time. Changes are reflected immediately on the hosted credential page, ensuring accuracy.",
  },
  {
    q: "How is this different from other certificate generators?",
    a: "We provide an end-to-end platform that covers design, generation, delivery, sharing, verification, and analytics — all in one place. Plus, our OpenBadge 3.0 compliance and enterprise-grade security set us apart.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(-1);

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Still got questions? We've got answers
          </h2>
          <p className="text-muted-foreground">
            Haven't found what you were looking for?{" "}
            <a href="#" className="text-primary font-medium hover:underline">Contact us</a>
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex items-center justify-between w-full p-5 text-left"
              >
                <span className="font-display font-bold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
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
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
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

export default FAQ;
