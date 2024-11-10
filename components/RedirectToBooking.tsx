import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RedirectToBooking = () => {
  return (
    <Alert
      variant="default"
      className="w-full max-w-md mx-auto bg-amber-50 border-amber-200"
    >
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertDescription className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-amber-800">
          Unfinished booking
        </span>
        <Link href="/dashboard/booking-confirmation" passHref>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-100 group"
          >
            <span className="mr-2">Complete</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default RedirectToBooking;
