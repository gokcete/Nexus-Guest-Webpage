"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CancellationOverlay() {
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    Cookies.remove("bookingDetails");
    Cookies.remove("dashboardBookingDetails");

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/dashboard");
      // Set a timeout to reload the page after navigation
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, [countdown, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Cancelling Booking</h2>
        <p className="mb-4">
          Redirecting to dashboard in {countdown} seconds...
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
