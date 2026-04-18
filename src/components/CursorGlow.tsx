import { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

export default function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const update = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08), transparent 40%)`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ background }}
    />
  );
}
