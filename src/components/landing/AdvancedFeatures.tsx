import { motion } from "framer-motion";
import { RefreshCw, QrCode, BarChart3, Type, Users, Globe, Zap, Linkedin, FileCheck } from "lucide-react";

const advancedFeatures = [
  { icon: RefreshCw, title: "Credential renewals", description: "Manage validity by setting expiration dates and sending automatic email reminders." },
  { icon: QrCode, title: "Dynamic QR codes", description: "Add a dynamic QR code to each credential, enabling instant verification." },
  { icon: BarChart3, title: "Insightful analytics", description: "Track credential performance with detailed analytics and monitor engagement." },
  { icon: Type, title: "Custom fonts", description: "Maintain brand identity by incorporating your own fonts into certificate designs." },
  { icon: Users, title: "RBAC & Workspaces", description: "Collaborate seamlessly with role-based access control and multiple workspaces." },
  { icon: Globe, title: "Branded Portal", description: "Get a fully branded issuer profile that showcases your organization and credentials." },
  { icon: Zap, title: "Integrations & API", description: "Automate credential issuance by integrating with Zapier, Make, and Pipedream." },
  { icon: Linkedin, title: "LinkedIn credentials", description: "Enable recipients to add credentials to LinkedIn's Certifications section." },
  { icon: FileCheck, title: "Verifiable documents", description: "Transform static PDFs into verifiable, legitimate digital certificates." },
];

const AdvancedFeatures = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Advanced certification features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlock even more possibilities with robust features for certificate automation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advancedFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;
