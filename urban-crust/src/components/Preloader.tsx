import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0C] overflow-hidden"
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* bg glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FFC800]/15 blur-[120px] -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF6B00]/15 blur-[120px] bottom-0 right-0" />
      <div className="absolute inset-0 halftone opacity-40" />

      {/* spinning pizza ring */}
      <div className="relative">
        <motion.div
          className="w-36 h-36 rounded-full border-[6px] border-dashed border-[#FFC800]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFC800] to-[#FF6B00] flex items-center justify-center shadow-[0_0_60px_rgba(255,200,0,0.5)]">
            <span className="font-display text-3xl text-black tracking-tight">UC</span>
          </div>
        </motion.div>
        {/* orbiting dots */}
        <motion.div
          className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-[#FF6B00]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          style={{ transformOrigin: "0px 80px" }}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 font-display text-4xl md:text-5xl tracking-wide text-white"
      >
        URBAN <span className="text-[#FFC800]">CRUST</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 font-hand text-2xl text-[#FFC800]/90 flex items-center gap-2"
      >
        <Flame className="w-5 h-5 flame-anim text-[#FF6B00]" />
        firing up the ovens...
      </motion.p>

      {/* loading bar */}
      <div className="mt-6 w-56 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#FFC800] to-[#FF6B00]"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          style={{ width: "100%" }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-3 checker-strip" />
    </motion.div>
  );
}
