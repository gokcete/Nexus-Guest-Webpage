import { getData } from "@/app/actions/actions";
import { Room } from "@/app/rooms/page";

import dynamic from "next/dynamic";

const roomTypes = [
  "single",
  "double",
  "suite",
  "pentHouse",
  "presidentialSuite",
] as const;
type RoomType = (typeof roomTypes)[number];

const RoomCard = dynamic(() => import("@/components/RoomCard"), {
  loading: () => <p>Loading room...</p>, // Optional loading component
  ssr: false, // Only load on the client side
});

async function getRoomByType(
  rooms: Room[],
  type: RoomType
): Promise<Room | undefined> {
  return rooms.find((room) => room.room_type === type);
}

export const RoomGrid = async () => {
  const rooms = await getData();
  const roomPromises = roomTypes.map((type) => getRoomByType(rooms, type));
  const cards = await Promise.all(roomPromises);

  if (cards.every((card) => card === undefined)) {
    return (
      <p className="text-center text-xl">
        No rooms available at the moment. Please check back later.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cards.map(
        (room) =>
          room && (
            <RoomCard key={room._id} room={room} destination="/dashboard" />
          )
      )}
    </div>
  );
};
