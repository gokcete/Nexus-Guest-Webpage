import { getData } from "@/app/actions/actions";
import { Room } from "@/app/rooms/page";
import RoomCard from "@/components/RoomCard";

export async function RoomList() {
  const rooms = await getData();

  const roomTypes = [
    "single",
    "double",
    "suite",
    "pentHouse",
    "presidentialSuite",
  ] as const;

  const cards = roomTypes.reduce((acc, type) => {
    const room = rooms.find((r) => r.room_type === type);
    if (room) acc.push(room);
    return acc;
  }, [] as Room[]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cards.map((room) => (
        <RoomCard key={room._id} room={room} destination="/booking" />
      ))}
    </div>
  );
}
