import { motion } from "framer-motion";
import { Award, BadgeCheck, ShieldCheck, ArrowRight } from "lucide-react";

const products = [
  {
    icon: Award,
    title: "Digital Certificates",
    description: "Issue digital certificates with our certificate generator. Send certificates in bulk, provide login-free access to recipients, and host all issued certificates online.",
    cta: "Start for free",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BadgeCheck,
    title: "Digital Badges",
    description: "Recognize achievements with verifiable digital badges. Create and send badges with our online badge generator, compliant with the OpenBadge 3.0 standard.",
    cta: "Learn more",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: ShieldCheck,
    title: "Credentials Portal",
    description: "Provide recipients with a white-label Credential Portal to access and verify all certificates and badges. A secure way to keep credentials organized.",
    cta: "Book a demo",
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

const ProductCards = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-2xl border border-border p-8 card-elevated cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl ${product.color} flex items-center justify-center mb-5`}>
                <product.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{product.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                {product.cta} <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
