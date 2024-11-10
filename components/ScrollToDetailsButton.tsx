"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import RoomDetails from "@/components/RoomDetails"; // Import RoomDetails to handle rendering

export default function ScrollToDetailsButton({
  initialShowDetails,
  roomId,
  room,
}) {
  const [showDetails, setShowDetails] = useState(initialShowDetails);
  const detailsRef = useRef(null);

  const handleScrollToDetails = () => {
    setShowDetails((prev) => !prev); // Toggle the state
    if (!showDetails && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align to the top of the section
      });
    }
  };

  useEffect(() => {
    if (showDetails && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showDetails]);

  return (
    <>
      {/* Button to toggle details */}
      <div className="text-center bg-black/50 py-4">
        <button
          className="text-white font-semibold text-lg hover:text-amber-400 transition-colors"
          onClick={handleScrollToDetails}
        >
          {showDetails ? "Close Details" : "See Details"}
        </button>
      </div>

      {/* Placeholder for Room Details */}
      <div ref={detailsRef}></div>

      {/* Room Details Section */}
      {showDetails && <RoomDetails room={room} />}

      {/* Update URL with query */}
      <Link
        href={{
          pathname: `/rooms/${roomId}`,
          query: { showDetails: showDetails ? "true" : "false" },
        }}
        scroll={false}
      />
    </>
  );
}
