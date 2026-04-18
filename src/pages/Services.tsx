import { motion } from "motion/react";
import { Code, Cpu, LineChart, Share2 } from "lucide-react";
import { PageTransition, fadeUp, staggerContainer } from "../lib/animations";
import TiltCard from "../components/TiltCard";

const services = [
  {
    icon: Code,
    title: "Website Design",
    description: "Custom-built websites designed to convert visitors into customers. We focus on speed, user experience, and modern aesthetics to make your brand stand out.",
    features: ["Responsive Design", "Fast Loading Speeds", "Conversion Optimization", "Custom UI/UX"]
  },
  {
    icon: Cpu,
    title: "AI Automation",
    description: "Automate customer interaction, lead capture, and follow-ups. Save time and resources while providing 24/7 support to your potential clients.",
    features: ["Chatbots", "Automated Workflows", "CRM Integration", "Lead Nurturing"]
  },
  {
    icon: LineChart,
    title: "SEO (Technical + Local)",
    description: "Improve your visibility and get found by real customers. We optimize your digital infrastructure to rank higher on search engines.",
    features: ["Keyword Research", "On-page SEO", "Technical Audits", "Local SEO Setup"]
  },
  {
    icon: Share2,
    title: "Social Media (Optional)",
    description: "Consistent content and strategy to grow your brand presence. Engage with your audience where they spend their time.",
    features: ["Content Strategy", "Profile Optimization", "Engagement Tracking", "Brand Consistency"]
  }
];

export default function Services() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20 relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6 text-glow">Our <span className="text-blue-500">Services</span></motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-400">
              Comprehensive digital solutions engineered to scale your business and dominate your local market.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full relative"
              >
                <TiltCard className="h-full">
                  <div className="glass-card p-10 rounded-3xl h-full group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all"></div>
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500/20 transition-colors border border-blue-500/20">
                      <service.icon className="w-8 h-8 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
