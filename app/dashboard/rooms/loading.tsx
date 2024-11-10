import LoadingSpinner from "@/components/Loading";
import React from "react";

const loading = () => {
  return (
    <div className="w-full min-h-screen gird justify-center items-center">
      <LoadingSpinner />
      <p className="text-xl text-gray-900">Loading rooms data...</p>
    </div>
  );
};

export default loading;
