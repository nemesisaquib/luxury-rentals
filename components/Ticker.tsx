"use client";

import { motion } from "framer-motion";

const items = [
  ["New", "Cliffside villa, Amalfi"],
  ["Just booked", "Machiya loft, Kyoto"],
  ["Featured", "Adobe casa, Oaxaca"],
  ["Trending", "Canal house, Amsterdam"],
  ["New", "Stone farmhouse, Provence"],
  ["Rare find", "Keeper's cottage, Skye"],
];

export default function Ticker() {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y hairline bg-ink py-3.5 text-cream">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {loop.map(([tag, text], i) => (
          <span key={i} className="mx-10 font-serif italic opacity-90">
            <b className="mr-2 font-sans text-xs font-semibold uppercase not-italic tracking-[0.12em] text-gold">
              {tag}
            </b>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
