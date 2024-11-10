"use client";

import { useState } from "react";
import {
  CheckCircle,
  Calendar,
  CreditCard,
  Users,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "react-toastify";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export type BookingStatus = "all" | "pending" | "canceled" | "checked-in";

export type Booking = {
  _id: string;
  reservation_code: string;
  guest_info: {
    guest_name: string;
    guest_email: string;
    payment_method: string;
  };
  room_info: {
    room_number: string;
  };
  checkIn_date: string;
  checkOut_date: string;
  total_price: number;
  status: BookingStatus;
};

type ConfirmationBookingCardProps = {
  bookings: Booking[];
  userId: string;
};

export default function ConfirmationBookingCard({
  bookings,
}: ConfirmationBookingCardProps) {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );
  const [localBookings, setLocalBookings] = useState<Booking[]>(bookings);
  const [filter, setFilter] = useState<BookingStatus>("all");

  const toggleCard = (reservationCode: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [reservationCode]: !prev[reservationCode],
    }));
  };

  const handleCancelReservation = async (bookingId: string) => {
    try {
      const response = await fetch("/api/delete-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      });

      const result = await response.json();
      if (result.success) {
        // Update local state
        setLocalBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "canceled" }
              : booking
          )
        );

        // Show success message
        toast.success("Reservation Cancelled");

        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.success("Reservation Cancelled");

        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Error");
    }
  };

  const filteredBookings = localBookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const isWithin3Days = (checkInDate: string) => {
    const now = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  // check if the guest's stay is completed

  /* const isWithin1Day = (checkOutDate: string) => {
    const now = new Date();
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 1;
  }; */

  return (
    <div className="space-y-6 max-h-[77vh] overflow-y-auto p-4">
      <div className="flex flex-wrap gap-2 justify-center mb-4 sticky top-0 bg-background z-10 p-2">
        {(["all", "pending", "canceled", "checked-in"] as const).map(
          (status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          )
        )}
      </div>
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        filteredBookings.map((booking) => {
          const {
            _id,
            reservation_code,
            guest_info,

            checkIn_date,
            checkOut_date,
            total_price,
            status,
          } = booking;

          const isExpanded = expandedCards[reservation_code] || false;
          const isCancelDisabled =
            status === "canceled" || isWithin3Days(checkIn_date);

          /* const isStayComplete =
            status === "checked-in" && isWithin1Day(checkOut_date); */

          return (
            <Card key={reservation_code} className="w-full max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Reservation: {reservation_code}
                    </CardTitle>
                    <CardDescription>
                      {formatDate(checkIn_date)} - {formatDate(checkOut_date)}
                    </CardDescription>
                  </div>
                  <Badge variant={status === "pending" ? "outline" : "default"}>
                    {status === "checked-in"
                      ? status.charAt(0).toUpperCase() + status.slice(1, 7)
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </div>
                {/* {isStayComplete ? (
                  <CardDescription>
                    <p>Did you enjoy your stay? Write us a review!</p>
                    <Button className="w-full">Write Review</Button>
                  </CardDescription>
                ) : (
                  ""
                )} */}
              </CardHeader>
              <Collapsible
                open={isExpanded}
                onOpenChange={() => toggleCard(reservation_code)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex justify-between items-center"
                  >
                    {isExpanded ? "Hide Details" : "Show Details"}
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="text-gray-400" size={16} />
                        <p className="text-sm font-medium text-gray-500">
                          Guest Information
                        </p>
                      </div>
                      <p className="text-base">{guest_info.guest_name}</p>
                      <div className="flex items-center space-x-2">
                        <Mail className="text-gray-400" size={16} />
                        <p className="text-sm">{guest_info.guest_email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="text-gray-400" size={16} />
                        <p className="text-sm font-medium text-gray-500">
                          Payment Details
                        </p>
                      </div>
                      <p className="text-base">Total Price: ${total_price}</p>
                      <p className="text-sm">
                        Payment Method: {guest_info.payment_method}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      disabled={isCancelDisabled}
                      variant={isCancelDisabled ? "secondary" : "destructive"}
                      className="w-full"
                      onClick={() => handleCancelReservation(_id)}
                    >
                      {isCancelDisabled ? (
                        status === "canceled" ? (
                          <X className="mr-2 h-4 w-4" />
                        ) : (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        )
                      ) : (
                        <Calendar className="mr-2 h-4 w-4" />
                      )}
                      {status === "canceled"
                        ? "Canceled"
                        : isCancelDisabled
                          ? "Cannot Cancel"
                          : "Cancel Reservation"}
                    </Button>
                    {isCancelDisabled && status !== "canceled" && (
                      <p className="text-sm text-red-500 text-center">
                        Cancellation is not allowed within 3 days of check-in.
                      </p>
                    )}
                    <p className="text-sm text-gray-500 text-center">
                      If you need any assistance, please don&apos;t hesitate to
                      contact our support team.
                    </p>
                  </CardFooter>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })
      )}
    </div>
  );
}
