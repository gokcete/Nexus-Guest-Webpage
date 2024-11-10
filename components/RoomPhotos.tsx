"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function RoomPhotos({ photos }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  // const [showDetails, setShowDetails] = useState(false); // State to toggle details

  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % photos.length);
  const prevPhoto = () =>
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);

  // const toggleDetails = () => {
  //   setShowDetails(!showDetails); // Toggle the state for showing details
  // };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevPhoto();
      if (event.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <>
      <div className="relative h-[40vh] w-full overflow-hidden bg-gray-100 flex flex-col justify-end mb-8">
        {/* Photo Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={photos[currentPhoto]}
              alt="Room image"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/30" />

        {/* Navigation Arrows */}
        <motion.div className="absolute left-0 top-0 bottom-0 w-24 flex items-center justify-center z-10">
          <button
            onClick={prevPhoto}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Previous room"
          >
            <ChevronLeft size={48} />
          </button>
        </motion.div>

        <motion.div className="absolute right-0 top-0 bottom-0 w-24 flex items-center justify-center z-10">
          <button
            onClick={nextPhoto}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Next room"
          >
            <ChevronRight size={48} />
          </button>
        </motion.div>
      </div>
    </>
  );
}
