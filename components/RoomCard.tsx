import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/app/rooms/page";
import RoomPhotos from "./RoomPhotos";

const defaultAmenities = [
  "Free Wi-Fi",
  "Air conditioning",
  "Flat-screen TV",
  "Mini fridge",
  "Room service",
  "Coffee maker",
  "Hairdryer",
  "Safe",
];

const RoomCard = React.memo(
  ({ room, destination }: { room: Room; destination: string }) => {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={room.pictures[0] || "/placeholder.svg"}
              alt={room.room_number}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-2xl mb-2 capitalize">
            {room.room_type}
          </CardTitle>
          <CardDescription className="mb-4 capitalize">
            {room.room_type.toLowerCase()} room at{" "}
            {room.description.slice(13, 100)}...
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{room.room_capacity} Guests</Badge>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="capitalize">
                  {room.room_type}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <div className="">
                  <RoomPhotos photos={room.pictures} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="col-span-2">
                    {room.room_type[0].toUpperCase() + room.room_type.slice(1)}{" "}
                    room at {room.description.slice(13)}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <ul className="list-disc list-inside">
                      {defaultAmenities.map((amenity, index) => (
                        <li key={index} className="capitalize">
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <div>
                    <div className="grid grid-cols-2 gap-2">
                    {room?.pictures?.map((photo, index) => (
                      <div key={index} className="relative h-32">
                        <Image
                          src={photo}
                          alt={`${room.room_number} photo ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="rounded-md object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  </div> */}
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardFooter>
          <Link href={destination} passHref>
            <Button className="w-full">Book Now</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
);

RoomCard.displayName = "RoomCard";

export default RoomCard;
