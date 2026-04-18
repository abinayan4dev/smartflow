import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Code, Cpu, LineChart, CheckCircle2, MessageCircle, Globe, Unlink, SignalLow } from "lucide-react";
import { Link } from "react-router-dom";
import { WHATSAPP_LINK } from "../lib/constants";
import { PageTransition, fadeUp, staggerContainer } from "../lib/animations";
import Hero3D from "../components/Hero3D";
import TiltCard from "../components/TiltCard";
import BrokenNetwork from "../components/BrokenNetwork";
import TransformationNetwork from "../components/TransformationNetwork";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <PageTransition>
      <div ref={containerRef} className="relative w-full">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
          <Hero3D />
          <div className="container mx-auto px-6 relative z-10 pointer-events-none">
            <motion.div 
              className="max-w-4xl mx-auto text-center relative pointer-events-auto"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <motion.h1 
                variants={fadeUp}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-glow"
              >
                Build a Website That Actually <span className="text-blue-500">Brings You Customers</span>
              </motion.h1>
              <motion.p 
                variants={fadeUp}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                We design high-performance websites and automation systems that help local businesses grow faster and smarter.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative flex items-center gap-2">
                    Chat on WhatsApp <ArrowRight className="w-5 h-5" />
                  </span>
                </a>
                <Link
                  to="/services"
                  className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-lg font-semibold hover:bg-white/10 transition-all w-full sm:w-auto text-center backdrop-blur-md"
                >
                  View Services
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-32 relative overflow-hidden bg-[#020617]">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ y: y1 }} 
            className="absolute -inset-y-[200px] inset-x-0"
          >
            <BrokenNetwork />
          </motion.div>
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] pointer-events-none"></div>
          
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-20 relative"
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Most Businesses Are Invisible Online
              </h2>
              <p className="text-xl text-gray-300">
                A disconnected system costs you leads, trust, and revenue.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { icon: Globe, title: "No Proper Website", desc: "Relying only on social media limits your credibility and reach." },
                { icon: Unlink, title: "No Lead Generation", desc: "Traffic means nothing if you can't capture and convert visitors." },
                { icon: SignalLow, title: "Poor Online Presence", desc: "Competitors are winning because they are easier to find." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp}
                  className="h-full relative"
                >
                  <TiltCard className="h-full">
                    <div className="glass-card p-8 rounded-2xl border border-blue-500/10 hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all duration-300 h-full relative overflow-hidden group bg-white/[0.02] backdrop-blur-xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-all"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-blue-500/20 transition-all"></div>
                      
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-400/50 transition-colors">
                        <item.icon className="w-6 h-6 text-blue-400 group-hover:text-purple-400 transition-colors drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Transformation / Solution Section */}
        <section className="py-32 relative overflow-hidden">
          <motion.div style={{ y: y2 }} className="absolute -inset-y-[200px] inset-x-0">
            <TransformationNetwork />
          </motion.div>
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712] pointer-events-none"></div>
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="max-w-3xl mx-auto text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-6 text-glow"
              >
                We Build Systems That <span className="text-blue-500">Grow Your Business</span>
              </motion.h2>
              <p className="text-xl text-gray-400">Stop losing customers to outdated tech. We provide the infrastructure for modern growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Code, title: "Website Design", desc: "Conversion-focused websites that turn visitors into paying customers." },
                { icon: Cpu, title: "AI Automation", desc: "Automate customer interaction, lead capture, and follow-ups 24/7." },
                { icon: LineChart, title: "SEO Optimization", desc: "Technical and local SEO to ensure you get found by real customers." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full relative"
                >
                  <TiltCard className="h-full">
                    <div className="glass-card p-10 rounded-3xl h-full relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all"></div>
                      <service.icon className="w-12 h-12 text-blue-500 mb-8 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
          <motion.div 
            className="container mx-auto px-6 relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-glow">Why Choose <span className="text-blue-500">Smartflow?</span></h2>
                <p className="text-xl text-gray-400 mb-10">We don't just build pretty websites. We engineer digital assets designed for performance and ROI.</p>
                
                <div className="space-y-6">
                  {[
                    "Engineering-driven approach to web development",
                    "Built for speed, performance, and conversions",
                    "Deep understanding of the local market",
                    "Scalable systems that grow with your business"
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      <span className="text-lg text-gray-300">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-full bg-blue-600/20 blur-[100px] absolute inset-0 pointer-events-none"></div>
                <TiltCard>
                  <div className="glass-card rounded-3xl p-8 relative z-10 shadow-2xl">
                    <pre className="text-sm text-blue-400 font-mono overflow-x-auto">
                      <code>{`const smartflow = {
  mission: "Business Growth",
  tools: ["Websites", "AI", "SEO"],
  performance: "100%",
  approach: "Engineering-driven",
  readyToScale: true,
  
  initiateGrowth() {
    return this.tools.map(tool => 
      optimize(tool)
    );
  }
};`}</code>
                    </pre>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full max-w-4xl mx-auto pointer-events-none"></div>
          <motion.div 
            className="container mx-auto px-6 relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-glow">Ready to grow your business?</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Let's build a system that works for you 24/7. Get in touch today for a free consultation.</p>
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(37,99,235,0.4)",
                    "0 0 40px rgba(37,99,235,0.8)",
                    "0 0 20px rgba(37,99,235,0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex px-10 py-5 rounded-full bg-blue-600 text-white text-xl font-semibold hover:bg-blue-500 transition-all hover:scale-105 items-center gap-3 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative flex items-center gap-3">
                  Chat on WhatsApp <MessageCircle className="w-6 h-6" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
