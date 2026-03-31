import { motion } from "framer-motion";
import { Mail, FileText, Link, Shield, Server } from "lucide-react";

const features = [
  {
    icon: Mail,
    title: "Send certificates in bulk",
    description: "Save time and eliminate errors by sending certificates and badges to all recipients in one go.",
  },
  {
    icon: FileText,
    title: "Mass export PDF certificates",
    description: "Instantly mass-generate and export certificates as PDF documents. No manual work or delays.",
  },
  {
    icon: Link,
    title: "Generate credential URL lists",
    description: "Issue digital certificates with unique and shareable URLs. Give recipients instant access.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade security",
    description: "ISO 27001 certification, GDPR compliance, AWS cloud hosting, and external penetration testing.",
  },
  {
    icon: Server,
    title: "Unlimited certificate hosting",
    description: "All issued digital certificates are stored online forever — at no extra cost. Login-free access anytime.",
  },
];

const Features = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-mono text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Capabilities</span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Automatic certificate generator <br className="hidden md:block" /> for any use case
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Generate, issue, send, mass-export, and download certificates in bulk with enterprise-grade precision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-7 card-elevated"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
