import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This platform saves me tons of work. I love the tracking part — you can see how recipients engaged with certificates in real time.",
    name: "Sarah Mitchell",
    role: "Head of Learning Academy",
    company: "TechForward Inc.",
  },
  {
    quote: "We issued over 4,000 digital credentials for our webinars. The bulk generation feature is a game changer for our team.",
    name: "James Chen",
    role: "Director of Education",
    company: "EduGlobal",
  },
  {
    quote: "The white-label credential portal perfectly matches our brand. Our students love sharing their achievements on LinkedIn.",
    name: "Maria Rodriguez",
    role: "VP of Certification Programs",
    company: "CyberSkills Academy",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            We're revolutionizing digital certificates
          </h2>
          <p className="text-muted-foreground">
            Don't take our word for it. See what some of our users have to say.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center"
            >
              <Quote className="w-10 h-10 text-primary/20 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium">
                "{testimonials[current].quote}"
              </p>
              <div>
                <p className="font-display font-bold text-foreground">{testimonials[current].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                <p className="text-xs text-muted-foreground mt-1">{testimonials[current].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
