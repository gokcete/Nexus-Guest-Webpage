import { getData } from "@/app/actions/actions";
import lobby from "@/assets/hotel.png";
import Image from "next/image";
import MainLayout from "../main-layout";
import { Room as DateSelectorRoom, RoomType } from "@/components/DateSelector";

import dynamic from "next/dynamic";
import { Room } from "../actions/TypesAndValidators";
// Lazy load the client component
const DateSelector = dynamic(() => import("@/components/DateSelector"), {
  ssr: false,
});

// Define a type that represents the room data from getData()

export default async function Booking() {
  const rawRooms: Room[] = await getData();
  const rooms: DateSelectorRoom[] = rawRooms.map((room) => ({
    _id: room._id ? room._id.toString() : undefined,
    room_type: room.room_type as RoomType,
    room_capacity: room.room_capacity,
    price_per_night: room.price_per_night,
    description: room.description,
    booked_on: room.booked_on,
    pictures: room.pictures,
  }));

  return (
    <div className="relative min-h-screen">
      <MainLayout>
        <Image
          src={lobby}
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
          alt="Restaurant background"
        />

        <DateSelector rooms={rooms} />
      </MainLayout>
    </div>
  );
}
