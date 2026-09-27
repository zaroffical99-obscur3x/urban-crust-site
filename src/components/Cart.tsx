import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Minus, Plus, Trash2, ShoppingBasket, MessageCircle, User, Phone,
  MapPin, StickyNote, Wallet, ChevronRight, PartyPopper, Bike, CheckCircle2
} from "lucide-react";
import confetti from "canvas-confetti";
import { buildWhatsAppOrder, formatRs } from "../data/menu";

export interface CartItem {
  key: string;
  id: string;
  name: string;
  variant?: string;
  price: number;
  qty: number;
  image: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
}

const PAYMENTS = ["Cash on Delivery", "JazzCash", "EasyPaisa", "Bank Transfer"];

export function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, onClear }: Props) {
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "", payment: PAYMENTS[0] });
  const [error, setError] = useState("");

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const count = cart.reduce((s, it) => s + it.qty, 0);

  const closeAll = () => {
    onClose();
    setTimeout(() => { setStep("cart"); setError(""); }, 400);
  };

  const placeOrder = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please fill your name, phone & address so our rider can find you!");
      return;
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      setError("That phone number looks short — please double-check it.");
      return;
    }
    setError("");
    const url = buildWhatsAppOrder(
      cart.map((c) => ({ name: c.name, variant: c.variant, qty: c.qty, price: c.price })),
      form
    );
    // confetti blast
    confetti({
      particleCount: 130,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FFC800", "#FF6B00", "#ffffff", "#22C55E"],
    });
    setTimeout(() => {
      confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ["#FFC800", "#FF6B00"] });
      confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ["#FFC800", "#FF6B00"] });
    }, 250);
    setStep("done");
    setTimeout(() => {
      window.open(url, "_blank");
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAll}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-[#141416] z-[71] flex flex-col border-l border-[#FFC800]/25 shadow-2xl"
          >
            <div className="h-2 checker-strip shrink-0" />

            {/* header */}
            <div className="p-5 pb-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FFC800] to-[#FF6B00] flex items-center justify-center">
                  <ShoppingBasket className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="font-display text-2xl tracking-wide">
                    {step === "cart" ? "YOUR BASKET" : step === "checkout" ? "CHECKOUT" : "ORDER READY!"}
                  </div>
                  <div className="text-xs text-white/50 font-semibold">
                    {step === "cart" ? `${count} items • ${formatRs(total)}` : step === "checkout" ? "Almost there, foodie..." : "Redirecting to WhatsApp..."}
                  </div>
                </div>
              </div>
              <button onClick={closeAll} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* steps indicator */}
            {step !== "done" && (
              <div className="px-5 pt-4 flex items-center gap-2">
                {["Basket", "Details", "WhatsApp"].map((s, i) => {
                  const activeIdx = step === "cart" ? 0 : 1;
                  const done = i < activeIdx;
                  const active = i === activeIdx;
                  return (
                    <div key={s} className="flex-1 flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full text-[11px] font-extrabold flex items-center justify-center shrink-0 ${done ? "bg-[#22C55E] text-white" : active ? "bg-[#FFC800] text-black" : "bg-white/10 text-white/40"}`}>
                        {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-[11px] font-extrabold ${active || done ? "text-white" : "text-white/35"}`}>{s}</span>
                      {i < 2 && <div className="flex-1 h-[2px] rounded bg-white/10" />}
                    </div>
                  );
                })}
              </div>
            )}

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-5">
              {step === "cart" && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10">
                      <motion.div
                        animate={{ rotate: [0, -8, 8, 0], y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-24 h-24 rounded-full bg-white/6 border border-white/10 flex items-center justify-center"
                      >
                        <ShoppingBasket className="w-10 h-10 text-[#FFC800]" />
                      </motion.div>
                      <h3 className="mt-5 font-display text-2xl">BASKET'S EMPTY!</h3>
                      <p className="mt-1 text-sm text-white/50 font-medium max-w-[240px]">Your stomach deserves better. Go grab something delicious!</p>
                      <button onClick={closeAll} className="mt-5 bg-[#FFC800] text-black font-extrabold px-6 py-3 rounded-2xl hover:bg-[#FFDD55] transition-colors">
                        Browse Menu
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <AnimatePresence initial={false}>
                        {cart.map((it) => (
                          <motion.div
                            key={it.key}
                            layout
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 60 }}
                            className="flex gap-3 bg-white/6 border border-white/10 rounded-2xl p-3"
                          >
                            <img src={it.image} alt={it.name} className="w-[68px] h-[68px] rounded-xl object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <div className="font-extrabold text-sm truncate">{it.name}</div>
                                  {it.variant && <div className="text-[11px] font-bold text-[#FFC800]">{it.variant}</div>}
                                </div>
                                <button onClick={() => onRemove(it.key)} className="text-white/35 hover:text-red-400 transition-colors shrink-0">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-1 bg-black/40 rounded-full p-1">
                                  <button onClick={() => onUpdateQty(it.key, -1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FFC800] hover:text-black flex items-center justify-center transition-colors">
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="w-7 text-center text-sm font-extrabold">{it.qty}</span>
                                  <button onClick={() => onUpdateQty(it.key, 1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FFC800] hover:text-black flex items-center justify-center transition-colors">
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="font-display text-lg text-[#FFC800]">{formatRs(it.price * it.qty)}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <button onClick={onClear} className="w-full text-center text-xs font-bold text-white/40 hover:text-red-400 py-2 transition-colors">
                        Clear entire basket
                      </button>
                    </div>
                  )}
                </>
              )}

              {step === "checkout" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#FFC800]/10 border border-[#FFC800]/30 p-4 flex items-start gap-3">
                    <Bike className="w-6 h-6 text-[#FFC800] shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed text-white/75 font-medium">
                      <span className="font-extrabold text-[#FFC800]">FREE delivery</span> in D-17, E-16, E-17 & Roshan Pakistan.
                      Your full order opens in <span className="font-extrabold text-white">WhatsApp</span> — you just press send!
                    </p>
                  </div>

                  {[
                    { icon: User, label: "Your Name *", key: "name" as const, ph: "e.g. Ahmed Raza" },
                    { icon: Phone, label: "Phone Number *", key: "phone" as const, ph: "e.g. 0336 1234567" },
                    { icon: MapPin, label: "Full Delivery Address *", key: "address" as const, ph: "House, street, sector, area..." },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-xs font-extrabold text-white/60 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <f.icon className="w-3.5 h-3.5 text-[#FFC800]" /> {f.label}
                      </label>
                      <input
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.ph}
                        className="w-full bg-white/8 border border-white/15 focus:border-[#FFC800] rounded-2xl px-4 py-3.5 text-sm font-semibold outline-none transition-colors placeholder:text-white/30"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="text-xs font-extrabold text-white/60 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Wallet className="w-3.5 h-3.5 text-[#FFC800]" /> Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PAYMENTS.map((p) => (
                        <button
                          key={p}
                          onClick={() => setForm({ ...form, payment: p })}
                          className={`text-xs font-extrabold px-3 py-3 rounded-2xl border transition-all ${
                            form.payment === p
                              ? "bg-[#FFC800] text-black border-[#FFC800]"
                              : "bg-white/6 text-white/60 border-white/12 hover:border-white/30"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-white/60 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                      <StickyNote className="w-3.5 h-3.5 text-[#FFC800]" /> Note for Kitchen (optional)
                    </label>
                    <textarea
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      placeholder="Extra spicy? No onions? Extra cheese..."
                      rows={2}
                      className="w-full bg-white/8 border border-white/15 focus:border-[#FFC800] rounded-2xl px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:text-white/30 resize-none"
                    />
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold rounded-2xl px-4 py-3">
                      {error}
                    </motion.div>
                  )}
                </div>
              )}

              {step === "done" && (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220 }}
                    className="w-24 h-24 rounded-full bg-[#22C55E] flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                  >
                    <PartyPopper className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="mt-5 font-display text-3xl">ORDER PACKED!</h3>
                  <p className="mt-2 text-sm text-white/60 font-medium max-w-[280px]">
                    Opening WhatsApp with your full order... just hit <span className="text-[#22C55E] font-extrabold">SEND</span> and we'll fire up the ovens!
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-white/50">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" /> Redirecting...
                  </div>
                </div>
              )}
            </div>

            {/* footer */}
            {step !== "done" && cart.length > 0 && (
              <div className="shrink-0 p-5 pt-4 border-t border-white/10 bg-[#0B0B0C]/60 backdrop-blur">
                <div className="flex items-center justify-between text-sm font-bold text-white/60">
                  <span>Subtotal</span>
                  <span>{formatRs(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-white/60 mt-1">
                  <span className="flex items-center gap-1.5">Delivery <span className="bg-[#22C55E] text-white text-[10px] px-2 py-0.5 rounded-full">FREE</span></span>
                  <span className="text-[#22C55E]">0 Rs</span>
                </div>
                <div className="mt-2 pt-2 border-t border-dashed border-white/15 flex items-center justify-between">
                  <span className="font-extrabold">Total</span>
                  <span className="font-display text-3xl text-[#FFC800]">{formatRs(total)}</span>
                </div>
                {step === "cart" ? (
                  <button
                    onClick={() => setStep("checkout")}
                    className="btn-gloss mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFC800] to-[#FF9D00] text-black font-extrabold py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(255,200,0,0.5)] transition-all active:scale-[0.98]"
                  >
                    Checkout <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setStep("cart")} className="px-5 py-4 rounded-2xl bg-white/10 font-extrabold text-sm hover:bg-white/15 transition-colors">
                      Back
                    </button>
                    <button
                      onClick={placeOrder}
                      className="btn-gloss flex-1 flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#1eb356] text-white font-extrabold py-4 rounded-2xl shadow-[0_10px_30px_rgba(34,197,94,0.35)] transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-5 h-5" /> Send Order on WhatsApp
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function FloatingButtons({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  return (
    <>
      {/* WhatsApp float */}
      <motion.a
        href="https://wa.me/923171991742?text=Hi%20Urban%20Crust!%20I%20want%20to%20place%20an%20order."
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-5 left-5 z-[60] w-14 h-14 rounded-full bg-[#22C55E] flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.5)] group"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute left-full ml-3 whitespace-nowrap bg-black text-white text-xs font-bold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat & Order
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFC800] border-2 border-[#0B0B0C] animate-pulse" />
      </motion.a>

      {/* Mobile cart float */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            onClick={onCartOpen}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] md:hidden flex items-center gap-2.5 bg-[#FFC800] text-black font-extrabold pl-4 pr-5 py-3.5 rounded-full shadow-[0_14px_40px_rgba(255,200,0,0.5)]"
          >
            <span className="relative">
              <ShoppingBasket className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-[#FFC800] text-[10px] flex items-center justify-center">{cartCount}</span>
            </span>
            View Basket
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
