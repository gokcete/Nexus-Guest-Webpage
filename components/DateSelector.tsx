"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { DayPicker } from "react-day-picker";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Search,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import "react-day-picker/dist/style.css";

export type RoomType =
  | "single"
  | "double"
  | "suite"
  | "pentHouse"
  | "presidentialSuite";

export interface Room {
  _id?: string;
  room_type: RoomType;
  room_capacity: number;
  price_per_night: number;
  description: string;
  booked_on?: string[];
  pictures: string[];
}

export interface RoomTypeDetails {
  rooms: Room[];
  minPrice: number | null;
  maxPrice: number | null;
}

type RoomTypes = Record<RoomType, RoomTypeDetails>;

const DateSelector = ({ rooms }: { rooms: Room[] }) => {
  const router = useRouter();
  const [selectedRange, setSelectedRange] = useState<{
    from: Date;
    to: Date;
  } | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState<
    Record<RoomType, number>
  >({
    single: 0,
    double: 0,
    suite: 0,
    pentHouse: 0,
    presidentialSuite: 0,
  });
  const [showRooms, setShowRooms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (range: { from: Date; to: Date } | undefined) =>
    setSelectedRange(range || null);
  const handleGuestChange = (value: number) => setGuestCount(value);

  const handleSearch = () => {
    if (selectedRange && guestCount) setShowRooms(true);
  };

  const isRoomAvailable = (room: Room) => {
    if (!selectedRange) return false;
    const rangeStart = selectedRange.from.getTime();
    const rangeEnd = selectedRange.to.getTime();
    return (
      room.booked_on?.every((date) => {
        const time = new Date(date).getTime();
        return time < rangeStart || time > rangeEnd;
      }) ?? true
    );
  };

  const groupRoomsByTypeWithPriceRange = (rooms: Room[]): RoomTypes => {
    const initialRoomTypes: RoomTypes = {
      single: { rooms: [], minPrice: null, maxPrice: null },
      double: { rooms: [], minPrice: null, maxPrice: null },
      suite: { rooms: [], minPrice: null, maxPrice: null },
      pentHouse: { rooms: [], minPrice: null, maxPrice: null },
      presidentialSuite: { rooms: [], minPrice: null, maxPrice: null },
    };

    rooms.forEach((room) => {
      if (isRoomAvailable(room) && room.room_capacity >= guestCount) {
        const typeDetails = initialRoomTypes[room.room_type];
        typeDetails.rooms.push(room);
        const prices = typeDetails.rooms.map((r) => r.price_per_night);
        typeDetails.minPrice = Math.min(...prices);
        typeDetails.maxPrice = Math.max(...prices);
      }
    });
    return initialRoomTypes;
  };

  const roomsGroupedByType = groupRoomsByTypeWithPriceRange(rooms);

  const handleImageSwitch = (type: RoomType, increment: number) => {
    const totalImages = roomsGroupedByType[type].rooms[0].pictures.length;
    setActiveImageIndex((prev) => ({
      ...prev,
      [type]: (prev[type] + increment + totalImages) % totalImages,
    }));
  };

  const formatDateRange = (range: { from: Date; to: Date } | null) =>
    range
      ? `${format(range.from, "PP")} - ${format(range.to, "PP")}`
      : "No dates selected";

  const saveBookingDetailsInCookies = (
    details: RoomTypeDetails,
    type: RoomType,
    selectedRange: { from: Date; to: Date },
    guestCount: number
  ) => {
    const roomDetails = {
      type,
      price: { min: details.minPrice, max: details.maxPrice },
      id: details.rooms[0]._id,
      capacity: details.rooms[0].room_capacity,
      description: details.rooms[0].description,
      dateRange: {
        from: format(selectedRange.from, "yyyy-MM-dd"),
        to: format(selectedRange.to, "yyyy-MM-dd"),
      },
      guestCount,
    };
    console.log(roomDetails);
    Cookies.set("bookingDetails", JSON.stringify(roomDetails), { expires: 1 });
    router.push("/dashboard/booking-confirmation");
  };

  return (
    <div className="container mx-auto p-4 space-y-8 relative">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 bg-gray-100/20 p-4 rounded-lg shadow-md z-50">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="transition duration-200 hover:scale-105"
            >
              <div className="flex flex-col items-center py-4">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Select Dates</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DayPicker
              disabled={{ before: new Date() }}
              mode="range"
              selected={selectedRange}
              onSelect={handleSelect}
              className="border rounded-md bg-white/20"
            />
            <Button
              className="mt-4 w-full"
              onClick={() => setIsModalOpen(false)}
            >
              Confirm Dates
            </Button>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="transition duration-200 hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <Users className="h-5 w-5" />
                <span className="text-sm">Guests</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white p-2 shadow-lg rounded-lg z-[60]">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <DropdownMenuItem
                key={num}
                onSelect={() => handleGuestChange(num)}
              >
                {num} Guest{num > 1 ? "s" : ""}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          className="bg-stone-100 hover:bg-stone-200 text-black px-4 py-2 rounded-lg transition duration-200 hover:scale-105 w-full md:w-auto"
          onClick={handleSearch}
        >
          <div className="flex flex-col items-center">
            <Search className="h-5 w-5" />
            <span className="text-sm">Search</span>
          </div>
        </Button>

        <Link href="/rooms">
          <Button
            variant="outline"
            className="w-full md:w-auto flex items-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span className="text-sm">Room Details</span>
          </Button>
        </Link>
      </div>

      <div className="flex justify-center space-x-8 mt-2">
        <h3 className="text-2xl font-bold">Room Types Available</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6" />
          <span className="text-gray-800 text-md font-bold">
            {formatDateRange(selectedRange)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <span className="text-gray-800 text-md font-bold">
            {guestCount} Guest{guestCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {showRooms && (
        <div className="space-y-2">
          {Object.entries(roomsGroupedByType).some(
            ([, type]) => type.rooms.length > 0
          ) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(roomsGroupedByType).map(([type, details]) =>
                details.rooms.length > 0 ? (
                  <Card key={type} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={
                          details.rooms[0].pictures[
                            activeImageIndex[type as RoomType]
                          ]
                        }
                        alt={`${type} room`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80"
                        onClick={() => handleImageSwitch(type as RoomType, -1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80"
                        onClick={() => handleImageSwitch(type as RoomType, 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle>{`${
                        type.charAt(0).toUpperCase() + type.slice(1)
                      } Room`}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Price per Night:{" "}
                        <span className="font-semibold text-gray-800">
                          ${details.minPrice} - ${details.maxPrice}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Capacity: Up to{" "}
                        <span className="font-semibold text-gray-800">
                          {details.rooms[0].room_capacity} guests
                        </span>
                      </p>
                    </CardContent>
                    <CardFooter className="bg-gray-50">
                      <Button
                        className="w-full"
                        onClick={() =>
                          saveBookingDetailsInCookies(
                            details,
                            type as RoomType,
                            selectedRange as { from: Date; to: Date },
                            guestCount
                          )
                        }
                      >
                        Book Now
                      </Button>
                    </CardFooter>
                  </Card>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No rooms available for the selected dates and guest count.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
