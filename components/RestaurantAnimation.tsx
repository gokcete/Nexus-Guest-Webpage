"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Coffee,
  Pizza,
  Fish,
  Carrot,
  X,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import restaurant from "@/assets/restaurant1.png";

export default function RestaurantPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      name: "Grilled Salmon",
      price: "$24",
      icon: <Fish className="w-6 h-6" />,
    },
    {
      name: "Beef Tenderloin",
      price: "$28",
      icon: <Utensils className="w-6 h-6" />,
    },
    {
      name: "Vegetarian Pasta",
      price: "$18",
      icon: <Carrot className="w-6 h-6" />,
    },
    {
      name: "Margherita Pizza",
      price: "$16",
      icon: <Pizza className="w-6 h-6" />,
    },
    { name: "Tiramisu", price: "$10", icon: <Coffee className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      <Image
        src={restaurant}
        fill
        sizes="(max-width: 400px)"
        className="absolute inset-0"
        alt="Restaurant background"
        style={{ objectFit: "cover" }}
        loading="lazy"
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="max-w-4xl w-full bg-white/10  rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="p-12">
          <h1 className="text-5xl font-bold text-white mb-6 text-center">
            Welcome to Nexus Restaurant
          </h1>
          <p className="text-xl text-white mb-12 text-center leading-relaxed">
            Indulge in a culinary journey that transcends the ordinary. At
            Nexus, we blend exquisite flavors with elegant ambiance, crafting
            unforgettable dining experiences. Our passionate chefs use only the
            finest, locally-sourced ingredients to create masterpieces that
            delight both the palate and the eye.
          </p>

          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 rounded-xl p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all hover:bg-gray-100/20"
                onClick={toggleCard}
              >
                <h2 className="text-4xl font-semibold text-black text-center mb-4">
                  Discover Our Menu
                </h2>
                <p className="text-center text-gray-900 mb-6">
                  Click to explore our culinary offerings
                </p>
                <ChevronDown className="w-8 h-8 mx-auto text-white animate-bounce" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-black/20 rounded-xl p-2 shadow-lg"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-semibold text-black/80 font-mono">
                    Our Signature Dishes
                  </h2>
                  <button
                    onClick={toggleCard}
                    className="text-gray-100 hover:text-white/50 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between bg-white/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="bg-white/60 p-2 rounded-full">
                          {item.icon}
                        </div>
                        <span className="text-xl font-medium text-white">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xl font-semibold ">
                        {item.price}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
