import { getRoom } from "@/app/actions/actions";
import { CalendarDays, Users, BedDouble, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

interface BookingInfoProps {
  id: string;
  nights: number;
  from: string;
  to: string;
}

const getCachedRoom = unstable_cache(
  async (id: string) => getRoom(id),
  ["room"],
  { revalidate: 1 }
);

const BookingInfo = async ({ id, nights, from, to }: BookingInfoProps) => {
  const roomData = await getCachedRoom(id);

  if (!roomData) {
    return <ErrorCard message="Room not found." />;
  }

  const {
    room_number,
    room_type,
    room_capacity,
    price_per_night,
    description,
    pictures,
  } = roomData;
  const totalPrice = nights * price_per_night;

  return (
    <Card className="w-full max-w-md">
      <Suspense fallback={<Skeleton className="h-48 w-full" />}>
        <Image
          src={pictures[0] || "/placeholder.svg"}
          alt={`Room ${room_number}`}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
          priority
        />
      </Suspense>
      <CardHeader>
        <CardTitle className="text-2xl">
          {room_type === "presidentialSuite" ? "Presidential Suite" : room_type}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm"> up to {room_capacity} guest(s)</span>
          </div>
          <Badge variant="outline">${price_per_night}/night</Badge>
        </div>
        <Separator />
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Description</h4>
          <p className="text-sm text-muted-foreground">
            This {description.slice(19)}
          </p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <DateInfo icon={CalendarDays} label="Check-in" date={from} />
          <DateInfo icon={CalendarDays} label="Check-out" date={to} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BedDouble className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{nights} night(s)</span>
          </div>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold">Total Price</span>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold text-green-500">
              {totalPrice}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const DateInfo = ({ icon: Icon, label, date }) => (
  <div className="flex items-center space-x-2">
    <Icon className="h-4 w-4 text-muted-foreground" />
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  </div>
);

const ErrorCard = ({ message }) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-destructive">Error</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{message}</p>
    </CardContent>
  </Card>
);

export default BookingInfo;
