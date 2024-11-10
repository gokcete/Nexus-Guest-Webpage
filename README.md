## Nexus Hotel Guest Webpage

This web application is part of the final project of DCI-Digital Career Institute Full-Stack Web Development Course, completed on October 29, 2024.

Project Team consists of Gökce Özak, Emanuel-Marius Rusu, Alaa Al Hafez and Anne Mwihaki.

Project is deployed at https://nexus-guest.vercel.app/

# Nexus Hotel Management System

## Project Overview

The Nexus Hotel Management System is a comprehensive web application designed to streamline hotel operations, enhance guest experiences, and provide efficient booking management. Built with modern web technologies, this system offers a user-friendly interface for both hotel staff and guests.

## Key Features

1. **User Authentication**: Secure sign-up and sign-in functionality using Clerk.
2. **Dashboard**: A centralized hub for managing bookings, rooms, and services.
3. **Booking System**: An intuitive interface for guests to book rooms and services.
4. **Room Management**: Detailed room information, including amenities and availability.
5. **Service Booking**: Additional services like spa treatments, transfers, and excursions.
6. **Responsive Design**: Fully responsive layout for seamless use across devices.

## Technology Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js (implied from the use of Next.js API routes)
- **Database**: MongoDB (inferred from the use of `clientPromise`)
- **Authentication**: Clerk
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Tailwind CSS, Shadcn UI components
- **Image Handling**: Next.js Image component
- **Routing**: Next.js App Router
- **Form Handling**: React Hook Form (implied)
- **Date Handling**: date-fns library

## Project Structure

The project follows a typical Next.js structure with some custom organization:

- `/app`: Contains the main application pages and layouts
- `/components`: Reusable React components
- `/utils`: Utility functions and helpers
- `/public`: Static assets
- `/lib`: Shared libraries and functions

## Workflow

1. **User Registration/Login**

   - Users sign up or log in using Clerk authentication
   - After authentication, users are redirected to the dashboard or booking confirmation page

2. **Dashboard**

   - Users can view available rooms, current bookings, and access various services
   - The sidebar provides navigation to different sections of the dashboard

3. **Booking Process**

   - Users select dates and guest count
   - Available rooms are displayed based on the selection
   - Users can view room details and make a booking

4. **Booking Confirmation**

   - After selecting a room, users fill out guest information
   - Booking details are saved and a confirmation is displayed

5. **Room Management**

   - Staff can view and manage room details, including amenities and availability

6. **Service Booking**

   - Users can book additional services like spa treatments or excursions
   - Service details are displayed in cards with booking options

7. **User Profile**
   - Users can manage their profile information and view past bookings

## Conclusion

The Nexus Hotel Management System provides a comprehensive solution for hotel operations and guest management. Its modular structure and use of modern web technologies make it scalable and maintainable. The system's focus on user experience, both for staff and guests, ensures efficient hotel management and improved customer satisfaction.
