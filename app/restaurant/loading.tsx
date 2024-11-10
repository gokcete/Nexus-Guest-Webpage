import LoadingSpinner from "@/components/Loading";
import React from "react";

const loading = () => {
  return (
    <div className="grid justify-normal items-center w-full min-h-screen">
      <LoadingSpinner />
    </div>
  );
};

export default loading;
