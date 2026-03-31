import { Link } from "react-router-dom";

const footerLinks = {
  Product: ["Home", "Pricing", "Create Certificates", "Digital Badge Platform", "All Solutions", "vs Credly", "vs Accredible"],
  Features: ["Integrations", "Design Builder", "Bulk Generator", "Credential Distribution", "Credential Management", "Social Sharing", "Tracking and Analytics"],
  Resources: ["AI Certificate Generator", "Blog", "Certificate Templates", "Badge Templates", "Video Tutorials", "Customer Stories", "Changelog"],
  Company: ["About", "Contact Us", "Legal Docs", "Security Hub", "System Status", "Knowledge Base", "API Documentation"],
};

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,20%,10%)] text-[hsl(210,40%,98%)] pt-20 pb-8">
      <div className="container-wide px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">CP</span>
              </div>
              <span className="font-display font-bold text-xl">CredentialPro</span>
            </div>
            <p className="text-sm text-[hsl(210,10%,60%)] leading-relaxed mb-6 max-w-[240px]">
              Join 2,000+ organizations which issue digital credentials every day
            </p>
            <div className="flex flex-col gap-3">
              <Link to="/login">
                <button className="w-48 h-11 rounded-lg border border-[hsl(210,10%,30%)] text-sm font-medium hover:bg-[hsl(210,10%,15%)] transition-colors">
                  Book a demo
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-48 h-11 rounded-lg border border-[hsl(210,10%,30%)] text-sm font-medium hover:bg-[hsl(210,10%,15%)] transition-colors">
                  Sign up free
                </button>
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[hsl(210,10%,60%)]">4.7 (500+)</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-bold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[hsl(210,10%,60%)] hover:text-[hsl(210,40%,98%)] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-[hsl(210,10%,20%)] pt-8 mb-8">
          <p className="text-xs text-[hsl(210,10%,45%)] max-w-md">
            CredentialPro sp. z o.o. Reg No (KRS): 0000863560<br />
            VAT: PL6762586390 Poland, Dolnych Młynów 3/1, 31-124 Cracow
          </p>
          <div className="flex items-center gap-6">
            {["ISO 9001", "ISO 27001", "GDPR"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 border border-[hsl(210,10%,25%)] rounded-lg px-4 py-2">
                <span className="text-xs font-bold text-[hsl(210,10%,60%)]">{badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[hsl(210,10%,20%)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(210,10%,45%)]">
            © 2026 CredentialPro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["instagram", "linkedin", "pinterest", "facebook", "youtube"].map((social) => (
              <a key={social} href="#" className="text-[hsl(210,10%,45%)] hover:text-[hsl(210,40%,98%)] transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-xs capitalize">{social[0].toUpperCase()}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[hsl(210,10%,45%)] hover:text-[hsl(210,40%,98%)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[hsl(210,10%,45%)] hover:text-[hsl(210,40%,98%)] transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-[hsl(210,10%,45%)] hover:text-[hsl(210,40%,98%)] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
