import { Suspense } from "react";
import { TbAirConditioning, TbSmokingNo, TbWifi } from "react-icons/tb";
import { MdOutlineRoomService, MdOutlineShower } from "react-icons/md";
import { PiMonitor } from "react-icons/pi";
import MainLayout from "../main-layout";
import LoadingSpinner from "@/components/Loading";
import { FeatureCard } from "@/components/FeatureCard";
import { RoomList } from "@/components/RoomList";

export type Room = {
  _id: string;
  room_number: string;
  room_type: string;
  room_capacity: number;
  price_per_night: number;
  status: string;
  description: string;
  booked_on: string[];
  pictures: string[];
  createdAt: string;
  updatedAt: string;
};

export default async function Rooms() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-8">Our Rooms</h1>
        <p className="text-lg text-center mb-12 max-w-4xl mx-auto">
          At Nexus Hotel, futuristic luxury meets unparalleled comfort in every
          corner of the hotel&apos;s state-of-the-art rooms. Nestled high above
          the skyline, each room is an immersive experience, blending sleek
          design with cutting-edge technology. From intelligent climate control
          to panoramic smart windows, guests can tailor every detail to their
          liking.
        </p>
        <FeatureCards />
        <Suspense fallback={<LoadingSpinner />}>
          <RoomList />
        </Suspense>
      </div>
    </MainLayout>
  );
}

const FeatureCards = () => {
  const features = [
    { icon: TbAirConditioning, title: "Air Conditioning" },
    { icon: TbWifi, title: "High-Speed Wi-Fi" },
    { icon: MdOutlineRoomService, title: "24-Hour Room Service" },
    { icon: PiMonitor, title: "Smart TV" },
    { icon: MdOutlineShower, title: "Rain Shower" },
    { icon: TbSmokingNo, title: "No Smoking" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-12">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={<feature.icon />}
          title={feature.title}
        />
      ))}
    </div>
  );
};
