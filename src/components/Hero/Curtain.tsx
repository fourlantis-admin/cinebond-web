"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Curtain() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth ease for opening
  const easeInOutCubic = (latest: number) =>
    latest < 0.5
      ? 4 * latest * latest * latest
      : 1 - Math.pow(-2 * latest + 2, 3) / 2;

  // Curtains move outwards
  // We want them to open fully by the time we scroll, say, 70% of the container
  const xLeft = useTransform(scrollYProgress, [0, 0.8], ["0%", "-100%"]);
  const xRight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  // Internal visual details
  // Shadow opacity to vanish as it opens? Or keep it.

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black z-50 flex">
        {/* Background Content (Revealed) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {/* Dynamic lighting effect behind curtains */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,1)_70%)]" />
          <h1 className="text-white text-6xl md:text-9xl font-serif font-bold tracking-widest opacity-80 uppercase drop-shadow-2xl">
            Cinebond
          </h1>
        </div>

        {/* Left Curtain */}
        <motion.div
          style={{ x: xLeft }}
          className="relative h-full w-1/2 bg-[#5c0000] z-10 box-border border-r border-[#3a0000]"
        >
          {/* Velvet Texture & Folds */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(92,0,0,0) 4%, rgba(255,50,50,0.1) 8%, rgba(0,0,0,0.4) 12%)",
            }}
          />
          {/* Bottom Hem */}
          <div className="absolute bottom-0 w-full h-[5vh] bg-[#3a0000] shadow-[0_-5px_10px_rgba(0,0,0,0.5)]" />
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          style={{ x: xRight }}
          className="relative h-full w-1/2 bg-[#5c0000] z-10 box-border border-l border-[#3a0000]"
        >
          {/* Velvet Texture & Folds */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(92,0,0,0) 4%, rgba(255,50,50,0.1) 8%, rgba(0,0,0,0.4) 12%)",
            }}
          />
          {/* Bottom Hem */}
          <div className="absolute bottom-0 w-full h-[5vh] bg-[#3a0000] shadow-[0_-5px_10px_rgba(0,0,0,0.5)]" />
        </motion.div>
      </div>
    </div>
  );
}
