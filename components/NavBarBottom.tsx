import React from "react";
import { LogIn, Map, MapPin } from "lucide-react"; // Added MapPin icon
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import map from "@/assets/map.png"; // Replace with your actual hotel image
import mapNexus from "@/assets/mapNexus.png"; // Replace with your actual map screenshot
import Link from "next/link";
import ChatBot from "./ChatBoot";

const NavBarBottom = () => {
  return (
    <nav className="flex justify-center items-center gap-10 relative z-50 mb-6">
      <div className=" flex items-center justify-center">
        <Modal>
          <ModalTrigger className="bg-white/80 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn rounded-full">
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 text-gray-500">
              Map
            </span>
            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-gray-500 z-20">
              <Map />
            </div>
          </ModalTrigger>
          <ModalBody>
            <ModalContent>
              <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                Book your Room now!
              </h4>

              {/* Grid container for Image and Map Screenshot side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-start">
                {/* Hotel Image */}
                <div className="rounded-xl p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 overflow-hidden">
                  <motion.div
                    whileHover={{
                      scale: 1.5,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    whileTap={{
                      scale: 2,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={map}
                      alt="hotel image"
                      width="400"
                      height="200"
                      className="rounded-lg object-cover"
                    />
                  </motion.div>
                </div>

                {/* Map Screenshot */}
                <div className="rounded-xl p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 overflow-hidden">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    whileTap={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={mapNexus} // The map screenshot
                      alt="map screenshot"
                      width="400"
                      height="200"
                      className="rounded-lg object-cover"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Address and Pin Icon */}
              <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-center justify-start max-w-sm mx-auto">
                <MapPin className="text-red-600 w-6 h-6 mr-2" />{" "}
                {/* Pin icon */}
                <div className="flex flex-col items-start">
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm font-semibold">
                    Nexus Hotel Location
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Easily find us at the following address:
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    “100 Nexus Tower, Golden Bridge Street, Westminster, London,
                    SW1A 1ZZ, United Kingdom”
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <span className="text-neutral-500 dark:text-neutral-400 text-xs text-center">
                  The Nexus Hotel is located in the heart of Westminster, just a
                  few minutes walk from iconic landmarks such as Big Ben and the
                  London Eye.
                </span>
              </div>
            </ModalContent>
          </ModalBody>
        </Modal>
      </div>
      {/* <button className="p-2 rounded-full bg-white/80 hover:bg-white hover:cursor-pointer hover:scale-125 text-gray-500">
        <ChatBot />
      </button> */}
      <button className="p-2 rounded-full bg-white/80 hover:bg-white hover:cursor-pointer hover:scale-125 text-gray-500">
        <Link href="/sign-in">
          <LogIn />
        </Link>
      </button>
      <ChatBot />
    </nav>
  );
};

export default NavBarBottom;
