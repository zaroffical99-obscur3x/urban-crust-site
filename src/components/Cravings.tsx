import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMGS, type CategoryId } from "../data/menu";

const TILES: { id: CategoryId; label: string; desc: string; img: string; count: string }[] = [
  { id: "pizza", label: "Pizzas", desc: "Crown Crust & more", img: IMGS.pizzaPepperoni, count: "15+ types" },
  { id: "burgers", label: "Burgers", desc: "Zingers & Hulks", img: IMGS.burgerCheddar, count: "10 smashers" },
  { id: "deals", label: "Deals", desc: "From 550 Rs", img: IMGS.pizzaBox, count: "21 deals" },
  { id: "shawarma", label: "Shawarma", desc: "Cheesy rolls", img: IMGS.shawarmaBoard, count: "6 rolls" },
  { id: "rolls", label: "Paratha Rolls", desc: "Desi fusion", img: IMGS.wrapPlate, count: "9 rolls" },
  { id: "fries", label: "Fries", desc: "Loaded & cheesy", img: IMGS.friesCheese, count: "5 styles" },
  { id: "broast", label: "Broast", desc: "Crispy & juicy", img: IMGS.broastPlatter, count: "9 items" },
  { id: "italian", label: "Pasta", desc: "Alfredo & crunch", img: IMGS.pastaAlfredo, count: "2 baked" },
  { id: "chinese", label: "Chinese", desc: "Wok tossed", img: IMGS.noodlesChicken, count: "5 dishes" },
  { id: "wings", label: "Wings", desc: "5 flavours", img: IMGS.wingsFlat, count: "5 flavours" },
  { id: "extras", label: "Chai & More", desc: "Karak & ice cream", img: IMGS.chaiPour, count: "12 extras" },
];

export default function Cravings() {
  const go = (id: CategoryId) => {
    window.dispatchEvent(new CustomEvent("uc:set-category", { detail: id }));
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#0B0B0C] pt-10 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-hand text-2xl text-[#FFC800]">what are you craving today?</p>
            <h2 className="font-display text-3xl md:text-5xl">PICK YOUR <span className="text-[#FFC800]">CRAVING</span></h2>
          </div>
          <a href="#menu" className="hidden md:flex items-center gap-1.5 text-sm font-extrabold text-white/60 hover:text-[#FFC800] transition-colors">
            Full menu <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="mt-5 flex gap-4 overflow-x-auto no-scrollbar snap-x px-5 md:px-8 pb-6">
        {TILES.map((t, i) => (
          <motion.button
            key={t.id}
            onClick={() => go(t.id)}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.4) }}
            whileHover={{ y: -8 }}
            className="group relative shrink-0 w-[160px] md:w-[190px] snap-start text-left rounded-[22px] overflow-hidden bg-[#141416] border border-white/10 hover:border-[#FFC800]/60 transition-colors"
          >
            <div className="h-[110px] md:h-[130px] overflow-hidden">
              <img src={t.img} alt={t.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500" />
            </div>
            <div className="p-3">
              <div className="font-display text-lg leading-none group-hover:text-[#FFC800] transition-colors">{t.label.toUpperCase()}</div>
              <div className="text-[11px] text-white/50 font-semibold mt-1">{t.desc}</div>
              <div className="mt-2 inline-block bg-[#FFC800]/15 text-[#FFC800] text-[10px] font-extrabold px-2.5 py-1 rounded-full">{t.count}</div>
            </div>
            <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4 text-[#FFC800]" />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
