import { Suspense } from "react";
import LoadingSpinner from "@/components/Loading";
import { RoomGrid } from "@/components/RoomGrid";

const RoomsPage = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Room</h1>
      <Suspense
        fallback={
          <div className="text-center">
            <LoadingSpinner />
          </div>
        }
      >
        <RoomGrid />
      </Suspense>
    </div>
  );
};

export default RoomsPage;
