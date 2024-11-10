import { z } from "zod";
import { ObjectId } from "mongodb";

export interface Booking {
  _id?: ObjectId;
  created_by: {
    staff_name: string;
    staff_id: string;
  };
  room_info: {
    room_number: string;
    room_id: string;
  };
  guest_info: {
    guest_name: string;
    guest_email: string;
    guest_card_number: string;
    payment_method: "credit_card" | "paypal" | "bank_transfer" | "cash";
  };
  guests_quantity: number;
  checkIn_date: string;
  checkOut_date: string;
  total_price: number;
  status: "pending" | "confirmed" | "canceled";
  reservation_code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const bookingSchema = z.object({
  guest_name: z.string().min(1, "Full name is required"),
  guest_email: z.string().email("Invalid email address"),
  guest_card_number: z.string().min(16, "Invalid card number"),
  payment_method: z.enum(["credit_card", "paypal", "bank_transfer", "cash"]),
  guests_quantity: z.coerce.number().int().positive(), // Coerce to number
  checkIn_date: z.string(),
  checkOut_date: z.string(),
  room_number: z.string(),
  room_id: z.string(),
  total_price: z.coerce.number().positive(), // Coerce to number
  staff_name: z.string(),
  staff_id: z.string(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export interface Room {
  _id?: string | ObjectId | undefined;
  room_number: string;
  room_type: string;
  room_capacity: number;
  price_per_night: number;
  status: "available" | "occupied" | "maintenance";
  description: string;
  booked_on: string[];
  pictures: string[];
  createdAt: string;
  updatedAt: Date;
  __v: number;
}

/* export interface Review {
  _id?: string | ObjectId | undefined;
  booking_ref: Booking;
  rating: 1 | 2 | 3 | 4 | 5;
  post: string;
  approved: Boolean;
}

export const reviewSchema = z.object({
  booking_ref: bookingSchema,
  rating: z.number().int().min(1).max(5),
  post: z.string(),
  approved: z.boolean(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>; */
