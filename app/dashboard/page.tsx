import { cookies } from "next/headers";
import { currentUser, auth } from "@clerk/nextjs/server";
import { getData, getOneBooking } from "@/app/actions/actions";
import RedirectToBooking from "@/components/RedirectToBooking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking, BookingStatus } from "@/components/ConfirmationBookingCard";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/Loading";
import ConfirmationBookingCard from "@/components/ConfirmationBookingCard";
import { RoomType, Room as DateSelectorRoom } from "@/components/DateSelector";

// Lazy load components
const DashboardDateSelector = dynamic(
  () => import("@/components/DashboardDateSelector"),
  { ssr: false }
);
const DateSelector = dynamic(() => import("@/components/DateSelector"), {
  ssr: false,
});

export const revalidate = 0;

export default async function DashboardPage() {
  const user = await currentUser();
  const { userId } = auth();
  const cookieStore = cookies();

  // Fetch and transform room data to match DateSelectorRoom type
  const rooms: DateSelectorRoom[] = (await getData()).map((room) => ({
    _id: room._id?.toString() || "",
    room_type: room.room_type as RoomType,
    room_capacity: room.room_capacity,
    price_per_night: room.price_per_night,
    description: room.description,
    booked_on: room.booked_on,
    pictures: room.pictures,
  }));

  // Fetch user bookings if userId is available
  const bookings: Booking[] = userId
    ? (await getOneBooking(userId)).map((booking) => ({
        ...booking,
        _id: booking._id ? booking._id.toString() : "",
        status: booking.status as BookingStatus,
      }))
    : [];

  const bookingDetails = cookieStore.get("bookingDetails");
  const dashboardBookingDetails = cookieStore.get("dashboardBookingDetails");

  const parsedBookingDetails = bookingDetails?.value
    ? JSON.parse(bookingDetails.value)
    : null;

  const parsedDashboardBookingDetails = dashboardBookingDetails?.value
    ? JSON.parse(dashboardBookingDetails.value)
    : null;

  const bookingData = parsedBookingDetails || parsedDashboardBookingDetails;
  return (
    <div className="container mx-auto md:px-4 py-8 max-w-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3 lg:col-span-2 max-w-full">
          <CardHeader>
            <CardTitle>Room Selection</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <DashboardDateSelector rooms={rooms} />
            ) : (
              <DateSelector rooms={rooms} />
            )}
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-3 lg:col-span-1 max-w-full">
          <Card>
            <CardHeader>
              <CardTitle>Your Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSpinner />}>
                <ConfirmationBookingCard
                  bookings={bookings}
                  userId={userId || ""}
                />
              </Suspense>
            </CardContent>
          </Card>

          {bookingData && (
            <Card>
              <CardContent className="pt-6">
                <RedirectToBooking />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
