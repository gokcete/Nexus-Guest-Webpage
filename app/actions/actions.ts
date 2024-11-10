"use server";
import { cache } from "react";

import randomString from "random-string-gen";
import {
  BookingFormData,
  bookingSchema,
  //reviewSchema,
  //ReviewFormData,
} from "./TypesAndValidators";
import clientPromise from "@/utils/database";
import { ObjectId, UpdateFilter, Filter } from "mongodb";
import { revalidatePath } from "next/cache";
import {
  Booking,
  Room,
  //Review
} from "./TypesAndValidators";

export async function getData(): Promise<Room[]> {
  try {
    const client = await clientPromise;
    const db = client.db("Nexus02");

    const data = await db.collection<Room>("rooms").find({}).toArray();

    return data.map((room) => ({
      ...room,
      _id: room._id.toString(), // Convert ObjectId to string
    }));
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch data");
  }
}
export const getRoom = cache(async (id: string): Promise<Room | null> => {
  try {
    const client = await clientPromise;
    const db = client.db("Nexus02");

    const data = await db
      .collection("rooms")
      .findOne({ _id: new ObjectId(id) });

    return data ? JSON.parse(JSON.stringify(data)) : null;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch data");
  }
});
export async function getOneBooking(id: string): Promise<Booking[]> {
  try {
    const client = await clientPromise;
    const db = client.db("Nexus02");

    const data = await db
      .collection("bookings")
      .find({ "created_by.staff_id": id })
      .toArray();
    console.log("thsiis data comming from getRoom(id)", data);

    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch data");
  }
}

export async function getBookings(): Promise<Booking[]> {
  try {
    const client = await clientPromise;
    const db = client.db("Nexus02");

    const data = await db.collection("bookings").find({}).toArray();

    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch data");
  }
}

function generateDateRange(
  checkInDate: string,
  checkOutDate: string
): string[] {
  const dates = [];
  const currentDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // Format as "YYYY-MM-DD"
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
export async function createBooking(
  bookingData: BookingFormData
): Promise<string> {
  try {
    const validatedData = bookingSchema.parse(bookingData);

    const code1 = randomString({
      capitalization: "uppercase",
      length: 3,
      type: "numeric",
    });
    const code2 = randomString({
      capitalization: "uppercase",
      length: 5,
      type: "alphabetic",
    });
    const reservationCode = `${code1}-${code2}`;

    const booking: Booking = {
      created_by: {
        staff_name: validatedData.staff_name,
        staff_id: validatedData.staff_id,
      },
      room_info: {
        room_number: validatedData.room_number,
        room_id: validatedData.room_id,
      },
      guest_info: {
        guest_name: validatedData.guest_name,
        guest_email: validatedData.guest_email,
        guest_card_number: validatedData.guest_card_number,
        payment_method: validatedData.payment_method,
      },
      guests_quantity: validatedData.guests_quantity,
      checkIn_date: validatedData.checkIn_date,
      checkOut_date: validatedData.checkOut_date,
      total_price: validatedData.total_price,
      status: "pending",
      reservation_code: reservationCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("Nexus02");

    const bookedDates = generateDateRange(
      booking.checkIn_date,
      booking.checkOut_date
    );

    const updateFilter: UpdateFilter<Room> = {
      $addToSet: { booked_on: { $each: bookedDates } },
    };

    const filter: Filter<Room> = {
      _id: new ObjectId(booking.room_info.room_id),
    };

    const roomUpdateResult = await db
      .collection<Room>("rooms")
      .updateOne(filter, updateFilter);

    if (!roomUpdateResult.modifiedCount) {
      throw new Error("Failed to update room availability.");
    }

    const bookingResult = await db
      .collection<Booking>("bookings")
      .insertOne(booking);

    if (bookingResult.insertedId) {
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/booking-confirmation");
      return reservationCode;
    } else {
      throw new Error("Failed to insert booking.");
    }
  } catch (error) {
    console.error("Booking creation error:", error);
    throw new Error(
      "An error occurred while creating the booking. Please try again."
    );
  }
}

export async function deleteBooking(bookingId: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db("Nexus02");

  const booking = await db
    .collection<Booking>("bookings")
    .findOne({ _id: new ObjectId(bookingId) });

  if (!booking) {
    throw new Error("Booking not found");
  }

  await db
    .collection<Booking>("bookings")
    .updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: "canceled" } }
    );

  const {
    room_info: { room_id },
    checkIn_date,
    checkOut_date,
  } = booking;
  const datesToRemove = generateDateRange(checkIn_date, checkOut_date);

  const updateFilter: UpdateFilter<Room> = {
    $pull: { booked_on: { $in: datesToRemove } },
  };

  const filter: Filter<Room> = { _id: new ObjectId(room_id) };

  await db.collection<Room>("rooms").updateOne(filter, updateFilter);
}

/* export async function createReview(
  reviewData: ReviewFormData
): Promise<string> {
  try {
    const validatedData = reviewSchema.parse(reviewData);

    const newReview: Review = {
      booking_ref: validatedData.booking_ref,
      rating: validatedData.rating,
      post: validatedData.post,
      approved: false,
    };

    const client = await clientPromise;
    const db = client.db("Nexus02");

    const reviewResult = await db
      .collection<Review>("reviews")
      .insertOne(newReview);

    if (reviewResult.insertedId) {
      revalidatePath("/dashboard");

      return "new review created";
    } else {
      throw new Error("Failed to insert review.");
    }
  } catch (error) {
    console.error("Review creation error:", error);
    throw new Error(
      "An error occurred while creating the review. Please try again."
    );
  }
} */
