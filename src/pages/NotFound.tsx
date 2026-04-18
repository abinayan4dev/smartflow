import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Home } from "lucide-react";
import { PageTransition } from "../lib/animations";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-lg"
        >
          <p className="text-[10rem] font-extrabold leading-none text-blue-500/20 mb-4 select-none">
            404
          </p>
          <h1 className="text-4xl font-bold mb-4 text-glow">Page Not Found</h1>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
