import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cravings from "./components/Cravings";
import Deals from "./components/Deals";
import MenuSection from "./components/MenuSection";
import Showcase from "./components/Showcase";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import { CartDrawer, FloatingButtons, type CartItem } from "./components/Cart";
import { MENU } from "./data/menu";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = (id: string, variant?: string) => {
    const item = MENU.find((m) => m.id === id);
    if (!item) return;
    let price = item.price;
    let vLabel = variant;
    if (item.variants) {
      const v = item.variants.find((x) => x.label === variant) ?? item.variants[0];
      vLabel = v.label;
      price = v.price;
    } else {
      vLabel = undefined;
    }
    const key = `${id}__${vLabel ?? "std"}`;
    setCart((prev) => {
      const ex = prev.find((c) => c.key === key);
      if (ex) {
        return prev.map((c) => (c.key === key ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { key, id, name: item.name, variant: vLabel, price, qty: 1, image: item.image }];
    });
    setToast({ id: Date.now(), msg: `${item.name}${vLabel ? ` (${vLabel})` : ""} added!` });
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.key === key ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const removeItem = (key: string) => setCart((prev) => prev.filter((c) => c.key !== key));

  const { count, total } = useMemo(() => {
    return {
      count: cart.reduce((s, c) => s + c.qty, 0),
      total: cart.reduce((s, c) => s + c.qty * c.price, 0),
    };
  }, [cart]);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white overflow-x-hidden">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      <Navbar cartCount={count} cartTotal={total} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onOrder={scrollToMenu} />
        <Cravings />
        <Deals onAdd={(id) => addToCart(id)} />
        <MenuSection onAdd={addToCart} />
        <Showcase />
        <Reviews />
        <Footer />
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onClear={() => setCart([])}
      />

      <FloatingButtons cartCount={count} onCartOpen={() => setCartOpen(true)} />

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-2.5 bg-[#0B0B0C] border border-[#FFC800]/50 rounded-full pl-3 pr-5 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
          >
            <span className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </span>
            <span className="text-sm font-bold whitespace-nowrap">{toast.msg}</span>
            <button
              onClick={() => { setToast(null); setCartOpen(true); }}
              className="ml-1 bg-[#FFC800] text-black text-xs font-extrabold px-3 py-1.5 rounded-full hover:bg-[#FFDD55]"
            >
              View
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
