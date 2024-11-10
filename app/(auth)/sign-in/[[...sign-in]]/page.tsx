import Image from "next/image";
import { cookies } from "next/headers";
import lobby from "@/assets/hotel.png";
import SignInComponent from "@/components/SignInComponent";

export default function Page() {
  const cookieStore = cookies();
  const bookingDetails = cookieStore.get("bookingDetails");
  const dashboardBookingDetails = cookieStore.get("dashboardBookingDetails");

  const parsedBookingDetails = bookingDetails?.value
    ? JSON.parse(bookingDetails.value)
    : null;

  const parsedDashboardBookingDetails = dashboardBookingDetails?.value
    ? JSON.parse(dashboardBookingDetails.value)
    : null;

  const hasBookingData = !!(
    parsedBookingDetails || parsedDashboardBookingDetails
  );

  return (
    <div className="min-h-screen w-full flex justify-center items-center relative">
      <Image
        src={lobby}
        fill
        style={{ objectFit: "cover" }}
        className="absolute inset-0"
        alt="Restaurant background"
      />
      <SignInComponent hasBookingData={hasBookingData} />
    </div>
  );
}
