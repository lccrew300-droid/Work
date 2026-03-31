import { motion } from "framer-motion";

const logos = [
  "Amazon", "Stanford", "Volvo", "Duolingo", "BAFTA",
  "D-Link", "UC Berkeley", "Odoo", "Warner Bros", "USC",
];

const LogoBar = () => {
  return (
    <section className="py-12 md:py-16 border-y border-border bg-secondary/30">
      <div className="container-wide px-4 md:px-8">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
          Trusted by 2,000+ companies, organizations & certification bodies
        </p>
        <div className="relative overflow-hidden">
          <div className="marquee">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center h-10"
              >
                <span className="text-muted-foreground/50 font-display font-bold text-lg whitespace-nowrap select-none">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
