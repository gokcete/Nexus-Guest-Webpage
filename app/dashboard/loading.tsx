import LoadingSpinner from "@/components/Loading";
import React from "react";

const loading = () => {
  return (
    <div className="w-full min-h-screen fle justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};

export default loading;
