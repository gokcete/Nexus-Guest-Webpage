import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function BookingConfirmationPage({
  params,
}: {
  params: { reservationCode: string };
}) {
  const { reservationCode } = params;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-8">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-xl text-gray-600">
          Thank you for choosing our hotel.
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Reservation Details
        </h2>
        <p className="text-gray-700">
          <span className="font-medium">Reservation Code:</span>{" "}
          {reservationCode}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          What&apos;s Next?
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Check your email for a detailed confirmation of your booking.</li>
          <li>Save your reservation code for future reference.</li>
          <li>
            If you need to modify your reservation, please contact our support
            team.
          </li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          We&apos;re looking forward to welcoming you!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          <Link href="/dashboard">Return to Dashboard</Link>
        </button>
      </div>
    </div>
  );
}
