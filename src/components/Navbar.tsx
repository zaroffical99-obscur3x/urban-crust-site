import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, Phone, MapPin, Menu, X, Truck, Flame, ChevronRight } from "lucide-react";
import { PHONES, ADDRESS } from "../data/menu";

interface Props {
  cartCount: number;
  cartTotal: number;
  onCartOpen: () => void;
}

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Deals", href: "#deals" },
  { label: "Menu", href: "#menu" },
  { label: "Why Us", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit Us", href: "#visit" },
];

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const txt = size === "lg" ? "text-xl" : "text-lg";
  return (
    <a href="#home" className="flex items-center gap-3 group">
      <div className={`relative ${box} rounded-2xl bg-gradient-to-br from-[#FFC800] to-[#FF6B00] flex items-center justify-center rotate-3 group-hover:rotate-[10deg] transition-transform duration-300 shadow-[0_8px_24px_rgba(255,200,0,0.35)]`}>
        <span className={`font-display ${txt} text-black leading-none pt-0.5`}>UC</span>
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0B0B0C] border-2 border-[#FFC800] flex items-center justify-center">
          <Flame className="w-3 h-3 text-[#FFC800]" />
        </div>
      </div>
      <div className="leading-none">
        <div className="font-display text-xl md:text-2xl tracking-wide text-white">
          URBAN <span className="text-[#FFC800]">CRUST</span>
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-semibold">Pizza • Burgers • More</div>
      </div>
    </a>
  );
}

export default function Navbar({ cartCount, cartTotal, onCartOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Top info bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[#FFC800] text-black overflow-hidden">
          <div className="flex items-center justify-center gap-2 py-1.5 px-4 text-[11px] md:text-xs font-bold tracking-wide">
            <Truck className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">FREE DELIVERY in Roshan Pakistan, D-17, E-16 & E-17</span>
            <span className="sm:hidden">FREE DELIVERY D-17 • E-16 • E-17</span>
            <span className="hidden md:inline-flex items-center gap-1 ml-4 bg-black text-[#FFC800] px-2.5 py-0.5 rounded-full">
              <Phone className="w-3 h-3" /> {PHONES[0]}
            </span>
          </div>
        </div>

        {/* Main navbar */}
        <motion.nav
          animate={{ backgroundColor: scrolled ? "rgba(11,11,12,0.92)" : "rgba(11,11,12,0.55)" }}
          className="backdrop-blur-xl border-b border-white/10"
          style={{ WebkitBackdropFilter: "blur(20px)" }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-[68px]">
            <Logo />

            <div className="hidden lg:flex items-center gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="relative px-4 py-2 text-sm font-bold text-white/75 hover:text-white transition-colors group"
                >
                  {l.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full bg-[#FFC800] group-hover:w-8 transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <a
                href="#visit"
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-[#FFC800] transition-colors mr-1"
              >
                <MapPin className="w-4 h-4" />
                <span className="max-w-[120px] truncate">{ADDRESS}</span>
              </a>

              {/* Cart button */}
              <motion.button
                onClick={onCartOpen}
                whileTap={{ scale: 0.92 }}
                className="relative flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 rounded-full pl-3 pr-4 py-2 transition-colors"
              >
                <div className="relative">
                  <ShoppingBasket className="w-5 h-5 text-[#FFC800]" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        key={cartCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF6B00] text-white text-[10px] font-extrabold flex items-center justify-center"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-sm font-extrabold hidden sm:inline">
                  {cartTotal > 0 ? `${cartTotal.toLocaleString()} Rs` : "Cart"}
                </span>
              </motion.button>

              <a
                href="#menu"
                className="hidden sm:inline-flex btn-gloss items-center gap-1 bg-gradient-to-r from-[#FFC800] to-[#FF9D00] text-black font-extrabold text-sm px-5 py-2.5 rounded-full hover:shadow-[0_0_28px_rgba(255,200,0,0.5)] hover:scale-105 transition-all"
              >
                Order Now <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#141416] z-[61] border-l border-[#FFC800]/20 flex flex-col"
            >
              <div className="h-2 checker-strip" />
              <div className="p-5 flex items-center justify-between">
                <Logo />
                <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-5 flex flex-col gap-1">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i }}
                    className="flex items-center justify-between py-3.5 border-b border-white/8 font-display text-2xl tracking-wide text-white/85 hover:text-[#FFC800] transition-colors"
                  >
                    {l.label.toUpperCase()}
                    <ChevronRight className="w-5 h-5 text-[#FFC800]" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto p-5 space-y-3">
                <div className="rounded-2xl bg-[#FFC800] text-black p-4">
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    <Truck className="w-4 h-4" /> FREE DELIVERY
                  </div>
                  <div className="text-xs font-semibold mt-1 opacity-80">D-17 • E-16 • E-17 • Roshan Pakistan</div>
                  <div className="mt-2 text-sm font-extrabold">{PHONES.join("  •  ")}</div>
                </div>
                <a
                  href="#menu"
                  onClick={() => setOpen(false)}
                  className="block text-center bg-gradient-to-r from-[#FF6B00] to-[#E63E00] font-extrabold py-3.5 rounded-2xl"
                >
                  Order Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* spacer */}
      <div className="h-[100px]" />
    </>
  );
}
