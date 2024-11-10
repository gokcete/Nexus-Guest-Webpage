"use client";

import { SignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInComponent({ hasBookingData }) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      if (hasBookingData) {
        router.push("/dashboard/booking-confirmation");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isSignedIn, hasBookingData, router]);

  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      fallbackRedirectUrl={
        hasBookingData ? "/dashboard/booking-confirmation" : "/dashboard"
      }
      onSignInSuccess={() => setIsSignedIn(true)}
    />
  );
}
