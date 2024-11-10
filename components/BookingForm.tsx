"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { createBooking } from "@/app/actions/actions";
import CancellationOverlay from "./CancellationOverlay";

interface BookingFormProps {
  userId: string;
  userName: string;
  roomId: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  capacity: number;
  nights: number;
}

export default function BookingForm({
  userId,
  userName,
  roomId,
  roomNumber,
  checkInDate,
  checkOutDate,
  totalPrice,
  capacity,
  nights,
}: BookingFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const bookingData = {
      staff_name: userName,
      staff_id: userId,
      room_number: roomNumber,
      room_id: roomId,
      guest_name: formData.get("guest_name") as string,
      guest_email: formData.get("guest_email") as string,
      guest_card_number: formData.get("guest_card_number") as string,
      payment_method: formData.get("payment_method") as string,
      guests_quantity: Number(formData.get("guests_quantity")),
      checkIn_date: checkInDate,
      checkOut_date: checkOutDate,
      total_price: totalPrice * nights,
    };

    try {
      const reservationCode = await createBooking(bookingData);
      Cookies.remove("bookingDetails");
      Cookies.remove("dashboardBookingDetails");
      toast.success(
        `Booking created successfully! Reservation Code: ${reservationCode}`
      );
      router.push(`/dashboard/booking-confirmation/${reservationCode}`);
    } catch (error) {
      console.error("Booking creation error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  const cancelBooking = () => {
    setIsCancelling(true);
  };

  return (
    <>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="guest_name">Full Name</Label>
          <Input id="guest_name" name="guest_name" required />
        </div>

        <div>
          <Label htmlFor="guest_email">Email</Label>
          <Input id="guest_email" name="guest_email" type="email" required />
        </div>

        <div>
          <Label htmlFor="guest_card_number">Card Number</Label>
          <Input
            id="guest_card_number"
            name="guest_card_number"
            minLength={16}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests_quantity">Number of Guests</Label>
          <Select name="guests_quantity" required>
            <SelectTrigger className="w-full" id="guests_quantity">
              <SelectValue placeholder="Select number of guests" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: capacity }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment_method">Payment Method</Label>
          <Select name="payment_method" required>
            <SelectTrigger className="w-full" id="payment_method">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between">
          <Button className="w-40" type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Booking"}
          </Button>
          <Button
            type="button"
            onClick={cancelBooking}
            className="bg-red-500 w-40 hover:bg-red-600"
          >
            Cancel
          </Button>
        </div>
      </form>
      {isCancelling && <CancellationOverlay />}
    </>
  );
}
