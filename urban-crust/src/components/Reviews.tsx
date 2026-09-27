import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { IMGS } from "../data/menu";

const REVIEWS = [
  {
    name: "Ahmed Raza",
    area: "E-16, Islamabad",
    text: "Crown Crust pizza is genuinely the best I've had in Islamabad. Cheese pull for days! And free delivery to E-16? Unreal value.",
    rating: 5,
    img: IMGS.burgerCheddar,
    item: "Crown Crust Large",
  },
  {
    name: "Fatima Khan",
    area: "D-17, Islamabad",
    text: "Ordered the Special 4 for family night — XL pizza, wings, pasta. Everything arrived HOT in 30 minutes. Kids are obsessed!",
    rating: 5,
    img: IMGS.pizzaSlice,
    item: "Special 4 Deal",
  },
  {
    name: "Bilal Hussain",
    area: "E-17, Islamabad",
    text: "Zinger Senior + loaded fries is my weekly fix. Crispy, juicy, saucy. WhatsApp ordering takes literally 10 seconds.",
    rating: 5,
    img: IMGS.burgerDouble,
    item: "Zinger Senior",
  },
  {
    name: "Ayesha Malik",
    area: "Roshan Pakistan",
    text: "That karak chai after a shawarma hits different. UC Special Shawarma with fries INSIDE is genius. Highly recommended!",
    rating: 5,
    img: IMGS.shawarmaBoard,
    item: "UC Special Shawarma",
  },
  {
    name: "Usman Tariq",
    area: "E-16, Islamabad",
    text: "Family broast fed 7 of us easily. Crispy coating, juicy inside, garlic dip is addictive. Best broast in the sector, no debate.",
    rating: 4,
    img: IMGS.broastPlatter,
    item: "Family Broast",
  },
];

export default function Reviews() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => {
    setDir(d);
    setIdx((i) => (i + d + REVIEWS.length) % REVIEWS.length);
  };

  const r = REVIEWS[idx];

  return (
    <section id="reviews" className="relative bg-[#141416] py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-4 checker-strip" />
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-[#FFC800]/8 blur-[130px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-xs font-extrabold tracking-widest uppercase px-5 py-2.5 rounded-full text-white/80"
          >
            <Star className="w-4 h-4 text-[#FFC800] fill-[#FFC800]" /> 4.9 — 2,400+ Happy Reviews
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 font-display text-5xl md:text-7xl"
          >
            FOODIES <span className="text-[#FFC800]">TALK</span>
          </motion.h2>
        </div>

        {/* carousel card */}
        <div className="mt-10 relative">
          <Quote className="absolute -top-6 left-6 md:left-14 w-14 h-14 text-[#FFC800] fill-[#FFC800]/20 z-10" />
          <div className="rounded-[30px] bg-[#0B0B0C] border border-white/10 p-6 md:p-12 min-h-[300px] relative overflow-hidden">
            <div className="absolute inset-0 halftone opacity-40" />
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid md:grid-cols-[auto_1fr] gap-6 items-center"
              >
                <div className="flex md:flex-col items-center gap-4">
                  <img src={r.img} alt={r.name} className="w-20 h-20 md:w-28 md:h-28 rounded-3xl object-cover border-4 border-[#FFC800]/40 rotate-3" />
                  <div className="md:text-center">
                    <div className="flex items-center gap-1 justify-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < r.rating ? "text-[#FFC800] fill-[#FFC800]" : "text-white/20"}`} />
                      ))}
                    </div>
                    <div className="mt-1 text-[11px] font-extrabold bg-[#FFC800]/15 text-[#FFC800] px-3 py-1 rounded-full inline-block">
                      Ordered: {r.item}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-medium leading-relaxed text-white/90">"{r.text}"</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-display text-xl tracking-wide">{r.name.toUpperCase()}</span>
                    <BadgeCheck className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div className="text-sm text-white/50 font-semibold">{r.area} • Verified Order</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-10 bg-[#FFC800]" : "w-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(-1)} className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-[#FFC800] hover:text-black hover:border-[#FFC800] flex items-center justify-center transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => go(1)} className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-[#FFC800] hover:text-black hover:border-[#FFC800] flex items-center justify-center transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
