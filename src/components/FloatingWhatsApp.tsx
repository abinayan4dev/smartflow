import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "../lib/constants";
import { motion } from "motion/react";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-colors hover:bg-blue-500"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(37,99,235,0.8)" }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      aria-label="Chat on WhatsApp"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border-2 border-blue-400"
      />
      <MessageCircle className="h-7 w-7 relative z-10" />
    </motion.a>
  );
}
