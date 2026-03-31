import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    quote: "Loved how I can customize digital badges for our certifications! I don't have to manually send badges when trainees complete courses.",
    name: "Samuel R.",
    role: "Director of Partnerships",
    company: "MyQuest",
    category: "Small Business",
    rating: 5,
  },
  {
    quote: "Great and accessible certificate generator app. It has been reliable, ensuring we can manage our certification processes efficiently.",
    name: "Fatima P.",
    role: "Senior Learning Program Manager",
    company: "Wizeline",
    category: "Mid-size Business",
    rating: 5,
  },
  {
    quote: "The only thing you need when issuing professional-looking certificates and badges without any hassle. Next-level automation.",
    name: "Jong H.",
    role: "Senior Technical Support Engineer",
    company: "Dynatrace",
    category: "Enterprise",
    rating: 5,
  },
  {
    quote: "Create badges in minutes without design or coding skills. The easy-to-use interface and the variety of design choices are impressive.",
    name: "Sebastian R.",
    role: "Solutions Architect",
    company: "Cloudera",
    category: "Enterprise",
    rating: 5,
  },
  {
    quote: "An awesome tool to work with! It simplifies the certification process and automates verification and design beautifully.",
    name: "Fernando R.",
    role: "Doctor of Education",
    company: "Atlantic University",
    category: "Education",
    rating: 5,
  },
  {
    quote: "Provides professional holistic digital certifications that are preserved for later access. Essential resource in our L&D strategy.",
    name: "Rachel H.",
    role: "Deeper Learning Specialist",
    company: "KEDC",
    category: "Mid-size Business",
    rating: 5,
  },
];

const ReviewsCarousel = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What our digital certificate issuers say
          </h2>
          <p className="text-muted-foreground">
            Businesses of all sizes trust us to streamline their certification process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-muted-foreground mb-4">
                {review.category}
              </span>
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-5">"{review.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role} · {review.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
