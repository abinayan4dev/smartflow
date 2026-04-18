import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import CursorGlow from "./components/CursorGlow";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Mechatronics from "./pages/Mechatronics";
import NotFound from "./pages/NotFound";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* location prop typed as `any` — known RR v7 / motion incompatibility */}
      <Routes location={location as any} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/mechatronics" element={<Mechatronics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CursorGlow />
      <div className="min-h-screen flex flex-col font-sans relative z-10">
        <Navbar />
        <main className="flex-grow relative w-full">
          <AnimatedRoutes />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}
