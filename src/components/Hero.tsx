import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Flame, Truck, ArrowRight, Play, BadgePercent, Pizza, Beef, Timer } from "lucide-react";
import { IMGS, PHONES } from "../data/menu";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ onOrder }: { onOrder: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yPizza = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotatePizza = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div ref={ref} id="home" className="relative overflow-hidden bg-[#0B0B0C] noise-overlay">
      {/* BG decor */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#FFC800]/12 blur-[130px]" />
        <div className="absolute top-1/2 -left-40 w-[460px] h-[460px] rounded-full bg-[#FF6B00]/12 blur-[130px]" />
        <div className="absolute inset-0 halftone opacity-50" />
        <div className="absolute top-24 left-6 font-display text-[120px] md:text-[200px] leading-none text-white/[0.03] select-none tracking-tight">
          CRUST
        </div>
      </motion.div>

      {/* checker side rails */}
      <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 checker-strip opacity-90" />
      <div className="absolute right-0 top-0 bottom-0 w-3 md:w-4 checker-strip opacity-90" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-8 md:pt-14 pb-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center min-h-[82vh]">
        {/* LEFT */}
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 bg-white/8 border border-[#FFC800]/40 rounded-full pl-1.5 pr-4 py-1.5 backdrop-blur">
            <span className="bg-[#FFC800] text-black text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> FREE
            </span>
            <span className="text-xs md:text-sm font-semibold text-white/85">Delivery in D-17 • E-16 • E-17</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-5">
            <p className="font-hand text-3xl md:text-4xl text-[#FFC800] -rotate-2">I think I'm in love... maybe?</p>
            <h1 className="font-display leading-[0.92] tracking-tight mt-1">
              <span className="block text-[15vw] sm:text-7xl md:text-8xl text-white display-shadow-yellow">TASTE THE</span>
              <span className="block text-[15vw] sm:text-7xl md:text-8xl">
                <span className="text-[#FFC800] display-shadow">URBAN</span>{" "}
                <span className="text-stroke-yellow">CRAZE</span>
              </span>
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-5 text-white/65 text-sm md:text-base max-w-xl leading-relaxed">
            Islamabad's loudest flavour house — <span className="text-white font-bold">Crown Crust Pizzas, Zinger Storms, Shawarmas, Broasts</span> & baked pastas. Made fresh, served hot, delivered{" "}
            <span className="text-[#FFC800] font-bold">FREE</span> to your doorstep in E-16.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-7 flex flex-wrap items-center gap-3">
            <motion.button
              onClick={onOrder}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gloss group flex items-center gap-2 bg-gradient-to-r from-[#FFC800] to-[#FF9D00] text-black font-extrabold px-7 py-4 rounded-full text-base shadow-[0_10px_40px_rgba(255,200,0,0.35)]"
            >
              <Pizza className="w-5 h-5 group-hover:rotate-[24deg] transition-transform" />
              Explore Full Menu
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <a
              href={`tel:${PHONES[0].replace(/\s/g, "")}`}
              className="group flex items-center gap-3 bg-white/8 hover:bg-white/14 border border-white/15 rounded-full pl-2 pr-6 py-2 transition-colors"
            >
              <span className="w-11 h-11 rounded-full bg-[#FF6B00] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,107,0,0.5)]">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[11px] text-white/55 font-semibold">Call to order</span>
                <span className="block text-sm font-extrabold">{PHONES[0]}</span>
              </span>
            </a>
          </motion.div>

          {/* stats */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-8 grid grid-cols-3 max-w-md gap-3">
            {[
              { icon: Pizza, big: "25+", small: "Pizza Varieties" },
              { icon: Beef, big: "80+", small: "Menu Items" },
              { icon: Timer, big: "30 min", small: "Avg. Delivery" },
            ].map((s) => (
              <div key={s.small} className="rounded-2xl bg-white/6 border border-white/10 p-3 text-center backdrop-blur hover:border-[#FFC800]/50 hover:bg-white/10 transition-colors">
                <s.icon className="w-5 h-5 mx-auto text-[#FFC800]" />
                <div className="font-display text-xl md:text-2xl mt-1">{s.big}</div>
                <div className="text-[10px] md:text-[11px] text-white/55 font-semibold">{s.small}</div>
              </div>
            ))}
          </motion.div>

          {/* rating row */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} className="mt-5 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[IMGS.burgerCheddar, IMGS.pizzaSlice, IMGS.shawarmaBoard].map((src, i) => (
                <img key={i} src={src} alt="customer" className="w-9 h-9 rounded-full border-2 border-[#0B0B0C] object-cover" />
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-[#0B0B0C] bg-[#FFC800] text-black text-[10px] font-extrabold flex items-center justify-center">2k+</div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#FFC800] fill-[#FFC800]" />
                ))}
                <span className="text-sm font-extrabold ml-1">4.9</span>
              </div>
              <div className="text-xs text-white/55 font-medium">Loved by E-16 & D-17 foodies</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — pizza hero visual */}
        <motion.div style={{ y: yPizza }} className="relative flex items-center justify-center py-6">
          {/* glow */}
          <div className="absolute w-[80%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,200,0,0.28)_0%,transparent_65%)] blur-2xl" />

          {/* rotating dashed ring */}
          <motion.div
            className="absolute w-[92%] aspect-square rounded-full border-[3px] border-dashed border-[#FFC800]/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          />
          <motion.div
            className="absolute w-[104%] aspect-square rounded-full border border-white/10"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
          />

          {/* main pizza */}
          <motion.div style={{ rotate: rotatePizza }} className="relative w-[86%] max-w-[480px] aspect-square">
            <motion.img
              src={IMGS.pizzaCheese}
              alt="Urban Crust Signature Pizza"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover rounded-full border-[10px] border-[#1c1c1f] shadow-[0_30px_100px_rgba(255,150,0,0.35)] animate-sizzle"
            />
            {/* steam */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-10 rounded-full bg-white/50 blur-[3px] animate-steam"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
          </motion.div>

          {/* floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute top-4 -left-1 md:left-2 animate-float"
          >
            <div className="flex items-center gap-2.5 bg-[#141416]/95 backdrop-blur border border-white/12 rounded-2xl px-3 py-2.5 shadow-2xl">
              <img src={IMGS.burgerDouble} alt="Zinger" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <div className="text-xs font-extrabold">Zinger Senior</div>
                <div className="text-[11px] text-[#FFC800] font-bold">500 Rs • ★ 4.9</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute bottom-8 -right-1 md:right-2 animate-float-delayed"
          >
            <div className="flex items-center gap-2.5 bg-[#141416]/95 backdrop-blur border border-white/12 rounded-2xl px-3 py-2.5 shadow-2xl">
              <img src={IMGS.friesCheese} alt="Fries" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <div className="text-xs font-extrabold">Loaded Fries</div>
                <div className="text-[11px] text-[#FFC800] font-bold">from 600 Rs</div>
              </div>
            </div>
          </motion.div>

          {/* rotating badge */}
          <motion.div
            className="absolute -bottom-2 left-4 md:left-10 w-28 h-28 md:w-32 md:h-32"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path id="circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text className="fill-[#FFC800] text-[10.5px] font-extrabold tracking-[2.5px]">
                  <textPath href="#circ">FREE DELIVERY • URBAN CRUST •</textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFC800] flex items-center justify-center shadow-[0_0_30px_rgba(255,200,0,0.6)]">
                <Truck className="w-6 h-6 text-black" />
              </div>
            </div>
          </motion.div>

          {/* deal badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 8 }}
            transition={{ delay: 1.1, type: "spring", stiffness: 220 }}
            className="absolute top-2 right-2 md:right-6 bg-gradient-to-br from-[#FF6B00] to-[#E63E00] rounded-2xl px-4 py-2.5 shadow-[0_10px_30px_rgba(255,107,0,0.5)] animate-wobble"
          >
            <div className="flex items-center gap-1.5 text-white">
              <BadgePercent className="w-5 h-5" />
              <div className="leading-none">
                <div className="font-display text-lg">DEALS</div>
                <div className="text-[10px] font-bold opacity-90">from 550 Rs</div>
              </div>
            </div>
          </motion.div>

          {/* flame dots */}
          <div className="absolute top-1/2 -left-2 flex items-center gap-1.5 bg-black/70 backdrop-blur border border-[#FF6B00]/40 rounded-full px-3 py-1.5">
            <Flame className="w-4 h-4 text-[#FF6B00] flame-anim" />
            <span className="text-xs font-bold">Wood-fired taste</span>
          </div>
        </motion.div>
      </div>

      {/* bottom marquee */}
      <div className="relative border-t-4 border-[#FFC800] bg-[#FFC800] text-black py-2.5 overflow-hidden -rotate-[0.6deg] scale-[1.02] mb-[-8px]">
        <div className="flex whitespace-nowrap animate-marquee-fast w-max">
          {[0, 1].map((n) => (
            <div key={n} className="flex items-center gap-8 pr-8 font-display text-lg md:text-xl tracking-wide">
              {["CROWN CRUST PIZZA", "ZINGER STORM", "FREE DELIVERY", "LOADED FRIES", "SHAWARMA", "BROAST", "KARAK CHAI", "PARLINE ICE CREAM"].map((t) => (
                <span key={t} className="flex items-center gap-8">
                  {t} <span className="text-xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
