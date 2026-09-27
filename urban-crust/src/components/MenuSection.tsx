import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Star, Flame, Pizza, Beef, Drumstick, CupSoda,
  Sandwich, Soup, Wheat, ChefHat, Sparkles, UtensilsCrossed, Cookie, Layers
} from "lucide-react";
import { MENU, CATEGORIES, formatRs, type CategoryId } from "../data/menu";

const CAT_ICONS: Record<string, typeof Pizza> = {
  all: Sparkles,
  deals: ChefHat,
  pizza: Pizza,
  burgers: Beef,
  shawarma: Sandwich,
  rolls: Wheat,
  fries: Cookie,
  broast: Drumstick,
  italian: Soup,
  chinese: UtensilsCrossed,
  wings: Flame,
  extras: Layers,
};

function Spicy({ level = 0 }: { level?: number }) {
  if (!level) return null;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]" />
      ))}
    </span>
  );
}

export default function MenuSection({ onAdd }: { onAdd: (id: string, variant?: string) => void }) {
  const [cat, setCat] = useState<CategoryId | "all">("pizza");
  const [query, setQuery] = useState("");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    const fn = (e: Event) => {
      const id = (e as CustomEvent).detail as CategoryId | "all";
      if (id) {
        setCat(id);
        setQuery("");
      }
    };
    window.addEventListener("uc:set-category", fn);
    return () => window.removeEventListener("uc:set-category", fn);
  }, []);

  const items = useMemo(() => {
    let list = cat === "all" ? MENU : MENU.filter((m) => m.category === cat || (cat === "broast" && m.category === "sides"));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = MENU.filter((m) => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q));
    }
    return list;
  }, [cat, query]);

  const priceFor = (id: string) => {
    const item = MENU.find((m) => m.id === id)!;
    const v = selectedVariants[id];
    if (item.variants && v) {
      return item.variants.find((x) => x.label === v)?.price ?? item.price;
    }
    return item.price;
  };

  return (
    <section id="menu" className="relative bg-[#FFF8E7] text-black py-16 md:py-24 overflow-hidden">
      {/* top checker */}
      <div className="absolute top-0 left-0 right-0 h-4 checker-strip" />
      <div className="absolute -top-20 right-0 w-[420px] h-[420px] bg-[#FFC800]/25 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#FF6B00]/15 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-black text-[#FFC800] text-xs font-extrabold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full"
          >
            <CupSoda className="w-4 h-4" /> The Full Urban Menu
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 font-display text-5xl md:text-7xl leading-[0.95]"
          >
            PICK. TAP. <span className="text-[#E63E00]">DEVOUR.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-3 font-hand text-2xl md:text-3xl text-black/60"
          >
            80+ items — pizzas, zingers, shawarmas, broasts & more. Everything made fresh!
          </motion.p>
        </div>

        {/* search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-xl mx-auto relative"
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Craving something? Search pizza, zinger, shawarma..."
            className="w-full bg-white border-2 border-black/10 focus:border-[#FF6B00] rounded-full pl-12 pr-5 py-4 text-sm font-semibold outline-none shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-colors placeholder:text-black/35 placeholder:font-medium"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Clear
            </button>
          )}
        </motion.div>

        {/* category pills */}
        <div className="mt-6 -mx-5 px-5 md:mx-0 md:px-0 overflow-x-auto no-scrollbar">
          <div className="flex gap-2.5 w-max mx-auto pb-2">
            {CATEGORIES.map((c) => {
              const Icon = CAT_ICONS[c.id] ?? Pizza;
              const isActive = query ? false : cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => { setCat(c.id as CategoryId | "all"); setQuery(""); }}
                  className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-full text-[13px] md:text-sm font-extrabold whitespace-nowrap transition-all duration-300 ${
                    isActive ? "text-black" : "bg-white text-black/60 border border-black/10 hover:border-black/30"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[#FFC800] to-[#FF9D00] rounded-full shadow-[0_8px_24px_rgba(255,180,0,0.4)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="relative w-4 h-4" />
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* count */}
        <div className="mt-4 text-center text-sm font-bold text-black/45">
          Showing <span className="text-[#E63E00]">{items.length}</span> delicious items
          {query && <> for "<span className="text-black">{query}</span>"</>}
        </div>

        {/* grid */}
        <motion.div layout className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {items.map((item) => {
              const sel = selectedVariants[item.id] ?? item.variants?.[0]?.label;
              const price = priceFor(item.id);
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white rounded-[24px] overflow-hidden border-2 border-black/8 hover:border-[#FF6B00]/50 hover:shadow-[0_20px_50px_rgba(230,62,0,0.16)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    {item.tag && (
                      <span className="absolute top-3 left-3 bg-black text-[#FFC800] text-[10px] font-extrabold tracking-wide uppercase px-3 py-1.5 rounded-full shadow-lg">
                        {item.tag}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur text-black text-[11px] font-extrabold px-2.5 py-1.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#E69D00] fill-[#E69D00]" /> {item.rating.toFixed(1)}
                    </span>
                    <span className="absolute bottom-3 left-3">
                      <Spicy level={item.spicy} />
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-[15px] leading-tight">{item.name}</h3>
                    </div>
                    <p className="text-xs text-black/55 leading-relaxed mt-1.5 line-clamp-2 min-h-[32px]">{item.desc}</p>

                    {item.variants && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.variants.map((v) => (
                          <button
                            key={v.label}
                            onClick={() => setSelectedVariants((s) => ({ ...s, [item.id]: v.label }))}
                            className={`text-[11px] font-extrabold px-2.5 py-1.5 rounded-lg border transition-all ${
                              sel === v.label
                                ? "bg-black text-[#FFC800] border-black"
                                : "bg-black/5 text-black/60 border-black/10 hover:border-black/30"
                            }`}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-dashed border-black/12 flex items-center justify-between gap-2 mt-auto">
                      <div>
                        {sel && item.variants && <div className="text-[10px] font-bold text-black/40 uppercase tracking-wide">{sel}</div>}
                        <div className="font-display text-[22px] leading-none text-[#C81E1E]">{formatRs(price)}</div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={() => onAdd(item.id, sel)}
                        className="btn-gloss flex items-center gap-1.5 bg-gradient-to-r from-black to-[#2a2a2e] hover:from-[#FF6B00] hover:to-[#E63E00] text-white text-[13px] font-extrabold pl-4 pr-4 py-2.5 rounded-2xl transition-all hover:shadow-[0_8px_24px_rgba(230,62,0,0.4)]"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <div className="text-center py-16">
            <Pizza className="w-14 h-14 mx-auto text-black/20" />
            <p className="mt-3 font-display text-2xl text-black/40">NOTHING FOUND, FOODIE!</p>
            <p className="text-sm text-black/50 font-medium">Try searching "pizza" or "zinger"</p>
          </div>
        )}
      </div>

      {/* bottom checker */}
      <div className="absolute bottom-0 left-0 right-0 h-4 checker-strip" />
    </section>
  );
}
