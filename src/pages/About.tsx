import { motion } from "motion/react";
import { Target, Zap, Shield } from "lucide-react";
import { PageTransition, fadeUp, staggerContainer } from "../lib/animations";
import TiltCard from "../components/TiltCard";

export default function About() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-12 text-center text-glow">
              About <span className="text-blue-500">Smartflow</span>
            </motion.h1>
            
            <div className="mb-20">
              <motion.div variants={fadeUp} className="glass-card p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <p className="text-xl leading-relaxed text-gray-300 mb-6 relative z-10">
                  Smartflow is built on an engineering mindset, focused on creating systems that work, scale, and perform.
                </p>
                <p className="text-xl leading-relaxed text-gray-300 relative z-10">
                  We don't just design websites — we build digital infrastructure for business growth. In a world where digital presence is non-negotiable, we provide the tools and systems that give our clients an unfair advantage.
                </p>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="text-center mb-20 relative">
              <h2 className="text-3xl font-bold mb-6 text-glow">Our Mission</h2>
              <div className="inline-block glass-card border-blue-500/30 px-8 py-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                <p className="text-2xl font-medium text-blue-400 relative z-10 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                  "To help businesses grow using technology and smart systems."
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Precision", desc: "Every pixel and line of code serves a specific business purpose." },
                { icon: Zap, title: "Performance", desc: "Fast, optimized, and reliable systems that never sleep." },
                { icon: Shield, title: "Reliability", desc: "Robust infrastructure built on modern engineering principles." }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  variants={fadeUp}
                  className="h-full relative"
                >
                  <TiltCard className="h-full">
                    <div className="glass-card p-8 rounded-2xl text-center h-full group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all"></div>
                      <div className="w-14 h-14 mx-auto bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                        <value.icon className="w-7 h-7 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-gray-400">{value.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
