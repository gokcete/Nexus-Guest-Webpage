import LoadingSpinner from "@/components/Loading";
import MainLayout from "./main-layout";
import dynamic from "next/dynamic";

const RoomView = dynamic(() => import("@/components/RoomView"), {
  loading: () => (
    <p>
      <LoadingSpinner />
    </p>
  ),
});

export default function Home() {
  return (
    <div className="relative bg-cover min-h-[88vh] flex flex-col justify-between">
      <MainLayout>
        <RoomView />
      </MainLayout>
    </div>
  );
}
