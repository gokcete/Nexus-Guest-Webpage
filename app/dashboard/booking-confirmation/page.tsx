import { cookies } from "next/headers";
import { currentUser, auth } from "@clerk/nextjs/server";
import { getRoom } from "@/app/actions/actions";
import BookingForm from "@/components/BookingForm";
import BookingInfo from "@/components/BookingInfo";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BookingConfirmationPage() {
  const user = await currentUser();
  const { userId } = auth();
  const cookieStore = cookies();

  // Remove the timestamp from the cookie names
  const bookingDetails = cookieStore.get("bookingDetails");
  const dashboardBookingDetails = cookieStore.get("dashboardBookingDetails");
  console.log("Booking Details Cookie:", bookingDetails);
  console.log("Dashboard Booking Details Cookie:", dashboardBookingDetails);
  const parsedBookingDetails = bookingDetails?.value
    ? JSON.parse(bookingDetails.value)
    : null;

  const parsedDashboardBookingDetails = dashboardBookingDetails?.value
    ? JSON.parse(dashboardBookingDetails.value)
    : null;

  const bookingData = parsedBookingDetails || parsedDashboardBookingDetails;

  if (!bookingData) {
    redirect("/dashboard");
  }

  const { price, dateRange, id, capacity } = bookingData;

  const roomData = await getRoom(id);

  if (!roomData) {
    redirect("/dashboard");
  }

  const { room_number } = roomData;
  const fromDate = new Date(dateRange.from);
  const toDate = new Date(dateRange.to);
  const nights = Math.round(
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Confirm Your Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <BookingForm
            userId={userId ?? ""}
            userName={user?.firstName ?? "Guest"}
            roomId={id}
            roomNumber={room_number}
            checkInDate={dateRange.from}
            checkOutDate={dateRange.to}
            totalPrice={price.min}
            capacity={capacity}
            nights={nights}
          />
        </div>
        <div>
          <BookingInfo
            id={id}
            nights={nights}
            from={dateRange.from}
            to={dateRange.to}
          />
        </div>
      </div>
    </div>
  );
}
