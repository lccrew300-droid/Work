import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["CPD", "Completion", "OSHA", "First-aid", "Training", "Participation", "Graduation", "Appreciation"];

const templateColors = [
  "from-blue-50 to-blue-100 border-blue-200",
  "from-emerald-50 to-emerald-100 border-emerald-200",
  "from-amber-50 to-amber-100 border-amber-200",
  "from-rose-50 to-rose-100 border-rose-200",
  "from-violet-50 to-violet-100 border-violet-200",
  "from-cyan-50 to-cyan-100 border-cyan-200",
];

const Templates = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Certificate templates designed for you
          </h2>
          <p className="text-muted-foreground">
            Start from scratch or choose from 2,000+ professionally designed templates.
          </p>
        </motion.div>

        {/* Category pills - scrollable marquee */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-pointer"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {templateColors.map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl bg-gradient-to-br ${color} border p-6 aspect-[3/4] flex flex-col items-center justify-center gap-4 card-elevated cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-full bg-background/60 flex items-center justify-center">
                <span className="text-lg font-display font-bold text-foreground/40">✦</span>
              </div>
              <div className="space-y-2 w-3/4">
                <div className="h-2.5 rounded-full bg-foreground/10 w-full" />
                <div className="h-2 rounded-full bg-foreground/5 w-2/3 mx-auto" />
              </div>
              <div className="mt-auto space-y-1.5 w-2/3">
                <div className="h-2 rounded-full bg-foreground/5 w-full" />
                <div className="h-2 rounded-full bg-foreground/5 w-3/4 mx-auto" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center flex flex-wrap justify-center gap-4">
          <Button className="rounded-full">
            Create your own certificate
          </Button>
          <Button variant="outline" className="rounded-full">
            See all templates <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Templates;
