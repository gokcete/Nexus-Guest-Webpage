"use client"; // This forces the component to run only on the client side

import Image from "next/image";
import { motion } from "framer-motion";
import fitness from "@/assets/fitnes.png";

const cardVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function FitnessClub() {
  return (
    <div className="relative min-h-screen text-white font-poppins">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={fitness}
          alt="Nexus Hotel Fitness Club"
          fill
          sizes="(max-width: 400px)"
          quality={100}
          style={{ objectFit: "cover" }}
          loading="lazy"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Nexus Hotel Fitness Club
        </h1>
        <p className="text-xl max-w-3xl mb-12">
          Welcome to the Nexus Hotel Fitness Club, exclusively designed for our
          guests. Elevate your workout routine with our state-of-the-art
          machines, now equipped with AI-powered trainers to optimize your
          experience.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Exclusive Guest Access */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Exclusive Guest Access
            </h3>
            <p>
              As a Nexus guest, enjoy 24/7 access to our world-class fitness
              facilities, designed to keep you energized and focused during your
              stay.
            </p>
          </motion.div>

          {/* Card 2: AI-Powered Fitness Machines */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
          >
            <h3 className="text-2xl font-semibold mb-4">
              AI-Powered Fitness Machines
            </h3>
            <p>
              Experience the future of fitness with our advanced AI trainers,
              guiding you through personalized workouts on every machine.
            </p>
          </motion.div>

          {/* Card 3: Personalized Workouts */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            whileHover="hover"
            whileTap="tap"
            variants={cardVariants}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Personalized Workouts
            </h3>
            <p>
              Our AI-driven system customizes each workout based on your goals,
              ensuring optimal results for your fitness journey.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
