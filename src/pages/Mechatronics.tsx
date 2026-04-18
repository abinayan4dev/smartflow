import { motion } from "motion/react";
import { Cpu, Settings, Lightbulb, ArrowRight } from "lucide-react";
import { PageTransition, fadeUp, staggerContainer } from "../lib/animations";
import { WHATSAPP_LINK } from "../lib/constants";
import TiltCard from "../components/TiltCard";

export default function Mechatronics() {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-20 relative"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)] relative">
              <Cpu className="w-4 h-4" /> Hardware & Software Integration
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-6 text-glow">
              Engineering & <span className="text-cyan-400">Innovation</span> Solutions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-400">
              Bridging the gap between physical systems and digital intelligence for businesses and students.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
            {[
              {
                icon: Cpu,
                title: "IoT Systems",
                desc: "Smart, connected devices that collect data and automate physical processes. From sensor networks to remote monitoring dashboards."
              },
              {
                icon: Settings,
                title: "Automation Projects",
                desc: "Custom mechanical and electronic automation solutions designed to improve efficiency and reduce manual labor."
              },
              {
                icon: Lightbulb,
                title: "Research & Development",
                desc: "Prototyping and R&D services for innovative hardware concepts. We help turn your engineering ideas into functional prototypes."
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full relative"
              >
                <TiltCard className="h-full">
                  <div className="glass-card p-10 rounded-3xl h-full relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-500/20 transition-all"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/20">
                      <section.icon className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{section.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="max-w-4xl mx-auto glass-card border-cyan-500/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-cyan-900/10 group-hover:bg-cyan-900/20 transition-colors"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-glow">Have an engineering project in mind?</h2>
              <p className="text-lg text-cyan-100/80 mb-8 max-w-2xl mx-auto">
                Whether you're a business looking to automate a physical process or a student needing help with a complex mechatronics project, we have the expertise to help.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-4 rounded-full bg-cyan-500 text-gray-900 text-lg font-bold hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all items-center gap-2"
              >
                Discuss Your Project <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
