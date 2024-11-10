"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import hotel from "@/assets/hotel.png";
import restaurant1 from "@/assets/restaurant1.png";
import fitnes from "@/assets/fitnes.png";
import pool1 from "@/assets/pool1.png";

// import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import dynamic from "next/dynamic";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const NavBarBottom = dynamic(() => import("@/components/NavBarBottom"), {
  ssr: false,
});
// interface RoomViewProps {
//   onBackToHome: () => void;
// }
// { onBackToHome }: RoomViewProps

const rooms = [
  {
    image: hotel,
    name: "",
    description: "",
  },
  {
    image: restaurant1,
    name: "Nebula Dining",
    description:
      "Experience culinary excellence at Nebula Dining, where luxury meets the future. With an ambiance inspired by the cosmos, guests enjoy a transformative dining experience, surrounded by immersive lighting and interactive holographic displays that shift with the mood of the evening.",
  },
  {
    image: fitnes,
    name: "Pulse Lab",
    description:
      "Elevate your workout at Pulse Lab, where state-of-the-art fitness meets futuristic innovation. This cutting-edge space features adaptive equipment, immersive digital landscapes, and smart materials that respond to your energy, offering a personalized fitness experience designed to optimize your performance and well-being.",
  },
  {
    image: pool1,
    name: "Aqua Celeste",
    description:
      "Dive into Aqua Celeste, an ethereal oasis where luxury meets the future. With its shimmering, holographic water effects and celestial-inspired ambiance, this one-of-a-kind pool offers a serene, otherworldly experience that transcends traditional relaxation.",
  },
];

export default function RoomView() {
  const [currentRoom, setCurrentRoom] = useState(0);

  const nextRoom = () => setCurrentRoom((prev) => (prev + 1) % rooms.length);
  const prevRoom = () =>
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevRoom();
      if (event.key === "ArrowRight") nextRoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="relative h-[93vh] w-full overflow-hidden bg-gray-100 flex flex-col justify-end">
        {/* Centered TextHoverEffect */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <TextHoverEffect text="NEXUS" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 "
          >
            <Image
              src={rooms[currentRoom].image}
              alt={rooms[currentRoom].name}
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
              placeholder="blur"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/30" />

        <motion.div className="absolute left-0 top-0 bottom-0 w-24 flex items-center justify-center z-50">
          <button
            onClick={prevRoom}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Previous room"
          >
            <ChevronLeft size={48} />
          </button>
        </motion.div>

        <motion.div className="absolute right-0 top-0 bottom-0 w-24 flex items-center justify-center z-50">
          <button
            onClick={nextRoom}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Next room"
          >
            <ChevronRight size={48} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-2 hidden md:block">
            {rooms[currentRoom].name}
          </h2>
          <p className="text-lg  max-w-2xl hidden md:block">
            {rooms[currentRoom].description}
          </p>
        </motion.div>

        <NavBarBottom />
      </div>
    </>
  );
}
