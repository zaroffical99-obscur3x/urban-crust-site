import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ArrowUp, Truck, Flame, Globe, Camera, MessageCircle, Navigation, Star } from "lucide-react";
import { PHONES, ADDRESS, WHATSAPP_NUMBER, DELIVERY_AREAS } from "../data/menu";
import { Logo } from "./Navbar";

export default function Footer() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Urban Crust! I want to place an order.")}`;

  return (
    <>
      {/* VISIT */}
      <section id="visit" className="relative bg-[#FFF8E7] text-black py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 checker-strip" />
        <div className="absolute -top-24 left-10 w-[380px] h-[380px] bg-[#FFC800]/30 blur-[110px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-black text-[#FFC800] text-xs font-extrabold tracking-widest uppercase px-5 py-2.5 rounded-full"
              >
                <MapPin className="w-4 h-4" /> Find The Crust
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 font-display text-5xl md:text-7xl leading-[0.92]"
              >
                COME HUNGRY.<br />LEAVE <span className="text-[#E63E00]">HAPPY.</span>
              </motion.h2>

              <div className="mt-7 space-y-3.5">
                {[
                  { icon: MapPin, title: "Our Spot", desc: ADDRESS + ", Islamabad", color: "bg-black text-[#FFC800]" },
                  { icon: Clock, title: "Open Daily", desc: "12:00 PM – 2:00 AM (Late night cravings welcome)", color: "bg-[#E63E00] text-white" },
                  { icon: Phone, title: "Call Us", desc: PHONES.join("  •  "), color: "bg-[#22C55E] text-white" },
                ].map((row, i) => (
                  <motion.div
                    key={row.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white rounded-2xl border-2 border-black/8 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-2xl ${row.color} flex items-center justify-center`}>
                      <row.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-widest text-black/45">{row.title}</div>
                      <div className="font-extrabold text-[15px]">{row.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gloss flex items-center gap-2 bg-[#22C55E] hover:bg-[#1eb356] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.35)] hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Alpha Arcade E-16/3 Islamabad")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-black text-white font-extrabold px-6 py-3.5 rounded-2xl hover:bg-[#222] hover:scale-105 transition-all"
                >
                  <Navigation className="w-5 h-5 text-[#FFC800]" /> Get Directions
                </a>
              </div>
            </div>

            {/* map-style card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[28px] overflow-hidden bg-[#0B0B0C] text-white min-h-[420px] flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(255,200,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,200,0,0.4) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -inset-8 rounded-full bg-[#FFC800]/20 animate-ping" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FFC800] to-[#FF6B00] flex items-center justify-center shadow-[0_0_40px_rgba(255,200,0,0.6)]">
                  <MapPin className="w-8 h-8 text-black" />
                </motion.div>
              </div>
              {/* area chips positioned like map pins */}
              {[
                { label: "E-16", x: "18%", y: "22%" },
                { label: "D-17", x: "68%", y: "18%" },
                { label: "E-17", x: "72%", y: "62%" },
                { label: "Roshan P.", x: "14%", y: "66%" },
              ].map((p) => (
                <div key={p.label} className="absolute bg-white/10 backdrop-blur border border-[#FFC800]/40 rounded-full px-3 py-1.5 text-xs font-extrabold flex items-center gap-1.5" style={{ left: p.x, top: p.y }}>
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> {p.label}
                </div>
              ))}

              <div className="mt-auto relative m-4 rounded-2xl bg-[#141416]/95 backdrop-blur border border-white/12 p-5">
                <div className="flex items-center gap-2 text-[#FFC800] font-extrabold text-sm">
                  <Truck className="w-5 h-5" /> FREE DELIVERY ZONES
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DELIVERY_AREAS.map((a) => (
                    <span key={a} className="bg-[#FFC800] text-black text-xs font-extrabold px-3 py-1.5 rounded-full">{a}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-white/60 font-semibold">
                  <Star className="w-3.5 h-3.5 text-[#FFC800] fill-[#FFC800]" /> Outside these areas? Call us — we'll still try our best!
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-[#0B0B0C] pt-14 pb-6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-3 checker-strip" />
        <div className="absolute inset-0 halftone opacity-25 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
            <div>
              <Logo size="lg" />
              <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-xs">
                Islamabad's craziest crust house. Pizzas, burgers, shawarmas & late-night cravings — delivered free in E-16, D-17 & E-17.
              </p>
              <div className="mt-5 flex gap-2.5">
                {[
                  { icon: Globe, label: "Facebook" },
                  { icon: Camera, label: "Instagram" },
                  { icon: MessageCircle, label: "WhatsApp" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.label === "WhatsApp" ? waLink : "#home"}
                    target={s.label === "WhatsApp" ? "_blank" : undefined}
                    rel="noreferrer"
                    className="w-11 h-11 rounded-2xl bg-white/8 border border-white/12 flex items-center justify-center hover:bg-[#FFC800] hover:text-black hover:border-[#FFC800] hover:-translate-y-1 transition-all"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg tracking-wide text-[#FFC800]">EXPLORE</h4>
              <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/60">
                {[
                  ["Crazy Deals", "#deals"],
                  ["Full Menu", "#menu"],
                  ["Why Urban Crust", "#why"],
                  ["Reviews", "#reviews"],
                  ["Visit Us", "#visit"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-[#FFC800] transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg tracking-wide text-[#FFC800]">TOP PICKS</h4>
              <ul className="mt-4 space-y-2.5 text-sm font-semibold text-white/60">
                {["Crown Crust Pizza", "Zinger Senior", "UC Special Shawarma", "Loaded Fries", "Family Broast", "Karak Chai"].map((t) => (
                  <li key={t}>
                    <a href="#menu" className="hover:text-[#FFC800] transition-colors flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#FF6B00]" /> {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-lg tracking-wide text-[#FFC800]">ORDER NOW</h4>
              <div className="mt-4 space-y-2.5 text-sm font-bold">
                {PHONES.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-2xl px-4 py-3 hover:border-[#FFC800]/50 hover:bg-white/10 transition-all">
                    <Phone className="w-4 h-4 text-[#FFC800]" /> {p}
                  </a>
                ))}
                <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 bg-[#22C55E]/15 border border-[#22C55E]/40 rounded-2xl px-4 py-3 hover:bg-[#22C55E]/25 transition-all">
                  <MessageCircle className="w-4 h-4 text-[#22C55E]" /> 0317 1991742
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40 font-semibold text-center md:text-left">
              © {new Date().getFullYear()} Urban Crust • {ADDRESS} • Made with hunger in Islamabad
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 bg-[#FFC800] text-black text-xs font-extrabold px-5 py-2.5 rounded-full hover:bg-[#FFDD55] transition-colors"
            >
              Back to top <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
