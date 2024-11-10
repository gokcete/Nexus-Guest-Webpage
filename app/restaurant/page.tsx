import React from "react";
import MainLayout from "../main-layout";
import dynamic from "next/dynamic";

const RestaurantPage = dynamic(
  () => import("@/components/RestaurantAnimation"),
  {
    ssr: false,
  }
);
const Restaurant = () => {
  return (
    <div>
      <MainLayout>
        <RestaurantPage />
      </MainLayout>
    </div>
  );
};

export default Restaurant;
