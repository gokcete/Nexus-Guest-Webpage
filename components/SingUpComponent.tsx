"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpComponent({ hasBookingData }) {
  const router = useRouter();
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    if (isSignedUp) {
      if (hasBookingData) {
        router.push("/dashboard/booking-confirmation");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isSignedUp, hasBookingData, router]);

  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      afterSignInUrl={
        hasBookingData ? "/dashboard/booking-confirmation" : "/dashboard"
      }
      afterSignUpUrl="/onboarding"
      onSignUpSuccess={() => setIsSignedUp(true)}
    />
  );
}
