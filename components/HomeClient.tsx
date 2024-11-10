"use client"; // This is a client component

import { useState } from "react";
import RoomView from "@/components/RoomView";

export default function HomeClient() {
  const [showRooms, setShowRooms] = useState(false); // State to control when rooms should be shown

  // Function to switch to RoomView
  const handleShowRooms = () => {
    setShowRooms(true);
  };

  // Function to go back to the home layout
  const handleBackToHome = () => {
    setShowRooms(false);
  };

  return (
    <div className="relative">
      {!showRooms ? (
        <div className="min-h-screen flex flex-col justify-center items-center">
          {/* Main Page Content */}
          <h1 className="text-5xl font-bold mb-8">Welcome to Nexus Hotel</h1>
          <button
            onClick={handleShowRooms}
            className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition-colors"
          >
            Start Exploring Rooms
          </button>
        </div>
      ) : (
        <RoomView onBackToHome={handleBackToHome} /> // Client component for room view
      )}
    </div>
  );
}
