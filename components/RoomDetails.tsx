"use client";

import { motion } from "framer-motion";
import { MdOutlineKingBed } from "react-icons/md";
import { SlSizeActual } from "react-icons/sl";
import { BsPeople } from "react-icons/bs";
import { FaWifi, FaSwimmer, FaConciergeBell, FaCoffee } from "react-icons/fa"; // Example icons
import Link from "next/link";
import { Button } from "@/components/ui/moving-border";

export default function RoomDetails({ room }) {
  const amenitiesIcons = {
    Wifi: <FaWifi />,
    Pool: <FaSwimmer />,
    "Room Service": <FaConciergeBell />,
    "Free Coffee": <FaCoffee />,
    // Add more icons as per your actual amenities
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-7 pt-12"
    >
      <div className="max-w-7xl mx-auto bg-white dark:bg-neutral-900 p-8 shadow-2xl rounded-xl">
        {/* Room Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-neutral-800 dark:text-neutral-100 text-center">
          {room.title}
        </h1>

        {/* Room Description */}
        <p className="mb-6 text-neutral-600 dark:text-neutral-300 text-base sm:text-lg text-center">
          {room.description}
        </p>

        {/* Room Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="text-center flex flex-col items-center text-neutral-500 dark:text-neutral-400">
            <MdOutlineKingBed className="text-4xl sm:text-5xl" />
            <h3 className="text-lg font-semibold mt-2">Beds</h3>
            <p className="text-sm sm:text-base">{room.bed}</p>
          </div>
          <div className="text-center flex flex-col items-center text-neutral-500 dark:text-neutral-400">
            <SlSizeActual className="text-4xl sm:text-5xl" />
            <h3 className="text-lg font-semibold mt-2">Size</h3>
            <p className="text-sm sm:text-base">{room.size}</p>
          </div>
          <div className="text-center flex flex-col items-center text-neutral-500 dark:text-neutral-400">
            <BsPeople className="text-4xl sm:text-5xl" />
            <h3 className="text-lg font-semibold mt-2">Occupancy</h3>
            <p className="text-sm sm:text-base">{room.occupancy}</p>
          </div>
        </div>

        {/* Booking Button */}
        <div className="text-center">
          <Button
            borderRadius="1.75rem"
            className="
          bg-[rgb(171,164,147)] 
          dark:bg-slate-900 
          text-white dark:text-white 
          border-neutral-200 dark:border-slate-800 
          
          rounded-none sm:rounded-[1.75rem_1rem] 
          shadow-[0_0_15px_rgb(171,164,147)] 
          hover:shadow-[0_0_25px_rgb(171,164,147)] 
          transition-shadow duration-300 ease-in-out
        "
          >
            <Link href={"/booking"}>Book now</Link>
          </Button>
        </div>

        {/* Room Amenities */}
        <div className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-4 text-center">
            Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-neutral-600 dark:text-neutral-300">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-start space-x-2 bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Check if an icon is available, otherwise fallback to text */}
                <div className="text-2xl text-amber-500">
                  {amenitiesIcons[item] || "•"}
                </div>
                <p className="text-sm sm:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
