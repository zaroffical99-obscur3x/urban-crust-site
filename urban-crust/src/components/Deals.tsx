import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Flame, Users, Sparkles, BadgePercent } from "lucide-react";
import { MENU, formatRs } from "../data/menu";

export default function Deals({ onAdd }: { onAdd: (id: string) => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const deals = MENU.filter((m) => m.category === "deals");

  const scroll = (dir: number) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / 340));
  };

  return (
    <section id="deals" className="relative bg-[#0B0B0C] py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 halftone opacity-30" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#FF6B00]/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#FF6B00]/15 border border-[#FF6B00]/40 text-[#FF9D00] text-xs font-extrabold tracking-widest uppercase px-4 py-2 rounded-full"
            >
              <BadgePercent className="w-4 h-4" /> Limited Time Madness
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]"
            >
              CRAZY <span className="text-[#FFC800]">DEALS</span>
              <span className="block font-hand text-2xl md:text-3xl text-white/60 font-medium tracking-normal mt-1">pick your fighter — feed the whole gang</span>
            </motion.h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll(-1)} className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-[#FFC800] hover:text-black hover:border-[#FFC800] flex items-center justify-center transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => scroll(1)} className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-[#FFC800] hover:text-black hover:border-[#FFC800] flex items-center justify-center transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* cards row */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="mt-8 flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0"
        >
          {deals.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.55 }}
              className="group relative shrink-0 w-[290px] md:w-[320px] snap-start rounded-[26px] overflow-hidden bg-[#141416] border border-white/10 hover:border-[#FFC800]/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(255,200,0,0.18)]"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent" />
                {d.tag && (
                  <span className="absolute top-3 left-3 bg-[#FFC800] text-black text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" /> {d.tag}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur text-[#FFC800] text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Users className="w-3 h-3" /> {d.serves}
                </span>
                {/* price ribbon */}
                <div className="absolute bottom-2 right-3 bg-gradient-to-r from-[#FFC800] to-[#FF9D00] text-black font-display text-xl px-4 py-1 rounded-xl rotate-[-3deg] shadow-[0_6px_20px_rgba(255,200,0,0.4)]">
                  {formatRs(d.price)}
                </div>
              </div>
              <div className="p-5 pt-3">
                <h3 className="font-display text-2xl tracking-wide group-hover:text-[#FFC800] transition-colors">{d.name.toUpperCase()}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed mt-1 min-h-[38px]">{d.desc}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => onAdd(d.id)}
                    className="btn-gloss flex-1 flex items-center justify-center gap-2 bg-[#FFC800] hover:bg-[#FFDD55] text-black font-extrabold text-sm py-3 rounded-2xl transition-all hover:shadow-[0_0_24px_rgba(255,200,0,0.45)] active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Add to Order
                  </button>
                  <div className="w-[46px] h-[46px] rounded-2xl bg-white/8 border border-white/12 flex flex-col items-center justify-center">
                    <Flame className="w-4 h-4 text-[#FF6B00]" />
                    <span className="text-[10px] font-extrabold">{d.rating}</span>
                  </div>
                </div>
              </div>
              {/* shine */}
              <div className="card-shine absolute inset-0 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* dots */}
        <div className="mt-2 flex justify-center gap-1.5">
          {Array.from({ length: Math.min(deals.length - 2, 10) }).map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === Math.min(active, 9) ? "w-8 bg-[#FFC800]" : "w-1.5 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
