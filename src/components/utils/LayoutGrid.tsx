"use client";
import React from "react";
import { motion } from "framer-motion";
import "../../index.css"


const Image = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt || "Thumbnail"}
      className="object-cover" // Ensure the image covers the card area
    />
  );
};

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="p-10 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2">
    {cards.map((card, index) => (
      <motion.div
        key={card.id}
        className="overflow-hidden rounded-sm shadow-sm bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="overflow-hidden">
          <Image src={card.thumbnail} alt={`Thumbnail for ${card.id}`} />
        </div>
        <div className="p-4">
          {card.content}
        </div>
      </motion.div>
    ))}
  </div>
  );
};
