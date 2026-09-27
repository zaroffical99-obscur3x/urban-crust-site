import { motion } from "framer-motion";
import { Flame, Truck, BadgeCheck, Timer, ChefHat, Heart, ArrowUpRight, Bike, MapPin, Star } from "lucide-react";
import { IMGS, DELIVERY_AREAS } from "../data/menu";

const FEATURES = [
  { icon: Flame, title: "Fired Fresh, Always", desc: "Every pizza hits a screaming-hot oven. No frozen bases. Ever.", color: "from-[#FF6B00] to-[#E63E00]" },
  { icon: Truck, title: "Free Delivery Gang", desc: "Zero delivery fee in D-17, E-16, E-17 & Roshan Pakistan.", color: "from-[#FFC800] to-[#FF9D00]" },
  { icon: ChefHat, title: "Desi Meets Urban", desc: "Behari kabab pizza, chapli burgers, karak chai — fusion done right.", color: "from-[#22C55E] to-[#15803D]" },
  { icon: Timer, title: "Hot in 30 Minutes", desc: "Late? Your next loaded fries are on us. That's the promise.", color: "from-[#8B5CF6] to-[#6D28D9]" },
];

const POSTERS = [
  {
    img: IMGS.burgerDouble,
    top: "I think I'm",
    big: "IN LOVE",
    script: "maybe",
    bottom: "Double Cheese Smash Burger",
    bg: "bg-[#E69A00]",
  },
  {
    img: IMGS.sandwichPanini,
    top: "I think I'm",
    big: "IN LOVE",
    script: "maybe",
    bottom: "Grilled Sandwich + Fries",
    bg: "bg-[#D98E00]",
  },
  {
    img: IMGS.pastaBlack,
    top: "It's that",
    big: "CRUNCH",
    script: "again",
    bottom: "Baked Crunchy Pasta",
    bg: "bg-[#E69A00]",
  },
  {
    img: IMGS.pastaAlfredo,
    top: "Is it that",
    big: "CRUNCH",
    script: "maybe",
    bottom: "Creamy Alfredo Pasta",
    bg: "bg-[#D98E00]",
  },
  {
    img: IMGS.chaiPour,
    top: "Karak",
    big: "CHAI",
    script: "ho to aisi",
    bottom: "Desi Karak Chai",
    bg: "bg-[#22C55E]",
  },
  {
    img: IMGS.iceCreamCone,
    top: "Brand New",
    big: "PARLINE",
    script: "ice cream",
    bottom: "Nutty Parline Cones",
    bg: "bg-[#16A34A]",
  },
];

export default function Showcase() {
  return (
    <>
      {/* WHY US */}
      <section id="why" className="relative bg-[#0B0B0C] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 checker-dark" />
        <div className="absolute top-10 right-10 w-[360px] h-[360px] bg-[#FFC800]/10 blur-[120px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* images collage */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[28px] overflow-hidden border-4 border-[#FFC800]/30 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
              <img src={IMGS.restoNight} alt="Urban Crust at night" className="w-full h-[340px] md:h-[440px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="font-hand text-2xl text-[#FFC800]">est. with love in E-16</div>
                  <div className="font-display text-3xl md:text-4xl">THE CRUST HOUSE</div>
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-[#FFC800] text-black text-xs font-extrabold px-3 py-2 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-black" /> 4.9 RATED
                </div>
              </div>
            </motion.div>

            {/* floating mini cards */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 -right-2 md:-right-6 w-44 md:w-56 rounded-2xl overflow-hidden border-4 border-[#0B0B0C] shadow-2xl animate-float"
            >
              <img src={IMGS.shawarmaBoard} alt="Shawarma" className="w-full h-32 md:h-40 object-cover" />
              <div className="bg-[#FFC800] text-black text-center text-xs font-extrabold py-2">UC Special Shawarma</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-5 -left-2 md:-left-5 bg-[#141416] border border-white/12 rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 animate-float-delayed"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#15803D] flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-extrabold">100% Halal</div>
                <div className="text-[11px] text-white/55 font-semibold">Fresh chicken daily</div>
              </div>
            </motion.div>
          </div>

          {/* text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-xs font-extrabold tracking-widest uppercase px-4 py-2 rounded-full text-white/80"
            >
              <Heart className="w-4 h-4 text-[#FF6B00] fill-[#FF6B00]" /> Why E-16 Loves Us
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-display text-5xl md:text-6xl leading-[0.95]"
            >
              NOT JUST FOOD.<br />
              <span className="text-[#FFC800]">IT'S A WHOLE VIBE.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-lg"
            >
              From midnight pizza cravings to family broast nights — Urban Crust is where Islamabad comes to feast.
              Loud flavours, honest prices, and delivery riders who actually fly.
            </motion.p>

            <div className="mt-7 grid sm:grid-cols-2 gap-3.5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl bg-white/6 hover:bg-white/10 border border-white/10 hover:border-[#FFC800]/40 p-4 transition-all hover:-translate-y-1"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="mt-3 font-extrabold text-[15px]">{f.title}</div>
                  <div className="mt-1 text-xs text-white/55 leading-relaxed">{f.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREE DELIVERY BILLBOARD */}
      <section className="relative bg-[#FFC800] text-black py-14 md:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 bg-black" style={{ backgroundImage: "repeating-linear-gradient(90deg,#000 0 22px,#FFC800 22px 44px)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-black" style={{ backgroundImage: "repeating-linear-gradient(90deg,#000 0 22px,#FFC800 22px 44px)" }} />

        {/* road animation */}
        <div className="absolute bottom-10 left-0 right-0 h-[3px] opacity-30" style={{ backgroundImage: "repeating-linear-gradient(90deg,#000 0 30px,transparent 30px 60px)" }} />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-black text-[#FFC800] font-extrabold text-xs tracking-widest uppercase px-4 py-2 rounded-full"
            >
              <Bike className="w-4 h-4" /> Zero Delivery Charges
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-display text-[13vw] sm:text-6xl md:text-7xl leading-[0.9]"
            >
              FREE DELIVERY.<br />NO EXCUSES.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 font-bold text-black/70 max-w-md text-sm md:text-base"
            >
              Like our billboard says — our riders drop from the sky if they have to.
              Hot & fresh at your door in minutes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {DELIVERY_AREAS.map((a) => (
                <span key={a} className="flex items-center gap-1.5 bg-black text-white font-extrabold text-sm px-4 py-2.5 rounded-full shadow-lg">
                  <MapPin className="w-4 h-4 text-[#FFC800]" /> {a}
                </span>
              ))}
            </motion.div>
          </div>

          {/* animated rider card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-black text-white rounded-[28px] p-6 md:p-8 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 halftone opacity-30" />
              <div className="relative flex items-center justify-between">
                <div className="font-display text-2xl md:text-3xl">ORDER ON<br /><span className="text-[#FFC800]">WHATSAPP</span></div>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  className="w-16 h-16 rounded-2xl bg-[#22C55E] flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                >
                  <Bike className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <div className="relative mt-5 space-y-2.5">
                {["1. Add items to your basket", "2. Tap checkout & fill details", "3. We fire WhatsApp with your full order — just press send!"].map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="flex items-center gap-3 bg-white/8 border border-white/12 rounded-2xl px-4 py-3 text-sm font-bold"
                  >
                    <span className="w-7 h-7 shrink-0 rounded-full bg-[#FFC800] text-black text-xs font-extrabold flex items-center justify-center">{i + 1}</span>
                    {s}
                  </motion.div>
                ))}
              </div>
              <a href="#menu" className="relative mt-5 flex items-center justify-center gap-2 bg-[#FFC800] text-black font-extrabold py-4 rounded-2xl hover:bg-[#FFDD55] transition-colors">
                Start Your Order <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* POSTER GALLERY */}
      <section className="relative bg-[#0B0B0C] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 halftone opacity-30" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#FFC800] text-black text-xs font-extrabold tracking-widest uppercase px-5 py-2.5 rounded-full"
            >
              Fresh Off The Fryer
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 font-display text-5xl md:text-7xl"
            >
              THE <span className="text-stroke-yellow">CRAVING</span> <span className="text-[#FFC800]">WALL</span>
            </motion.h2>
            <p className="mt-2 font-hand text-2xl text-white/55">warning: scrolling may cause extreme hunger</p>
          </div>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {POSTERS.map((p, i) => (
              <motion.div
                key={p.bottom + i}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                className={`relative rounded-[22px] overflow-hidden ${p.bg} shadow-2xl cursor-pointer group`}
              >
                {/* checker sides */}
                <div className="absolute left-0 top-0 bottom-0 w-3 md:w-4 checker-strip !bg-black/20 z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-3 md:w-4 checker-strip !bg-black/20 z-10" />
                <div className="pt-5 md:pt-7 pb-0 px-8 text-center">
                  <div className="text-white/90 font-bold text-xs md:text-sm">{p.top}</div>
                  <div className="font-display text-3xl md:text-6xl text-white leading-none drop-shadow-lg">{p.big}</div>
                  <div className="font-hand text-xl md:text-3xl text-white -mt-1">{p.script}</div>
                </div>
                <div className="mt-3 md:mt-4 h-40 md:h-64 overflow-hidden">
                  <img src={p.img} alt={p.bottom} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="bg-black text-white text-center text-[11px] md:text-sm font-extrabold py-2.5 px-4 flex items-center justify-center gap-2">
                  {p.bottom}
                  <ArrowUpRight className="w-4 h-4 text-[#FFC800] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
