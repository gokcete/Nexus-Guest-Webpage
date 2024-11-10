import Link from "next/link";
import { Home, MapPin, AlertCircle } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50">
      <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-md">
        <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
        <h1 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>

        <p className="text-lg text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4 mt-8">
          <Link
            href="/"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Link>
          <Link
            href="/rooms"
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <MapPin className="w-5 h-5 mr-2" />
            View Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
