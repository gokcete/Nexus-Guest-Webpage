// import { notFound } from "next/navigation";
// import { cards } from "../page";
// import RoomPhotos from "@/components/RoomPhotos";
// import NavBarTop from "@/components/NavBarTop";
// import ScrollToDetailsButton from "@/components/ScrollToDetailsButton"; // Import the client-side ScrollToDetailsButton

// export default async function Page({
//   params,
//   searchParams,
// }: {
//   params: { id: string };
//   searchParams: { [key: string]: string | undefined };
// }) {
//   const room = cards.find((room) => room.id === Number(params.id));
//   if (!room) {
//     notFound();
//   }

//   // Check if "showDetails" is present in the URL query parameters
//   const initialShowDetails = searchParams.showDetails === "true";

//   return (
//     <>
//       <NavBarTop />

//       {/* Display room photos */}
//       <RoomPhotos photos={room.photos} roomDetails={room.description} />

//       {/* ScrollToDetailsButton to handle showing and scrolling */}
//       <ScrollToDetailsButton
//         initialShowDetails={initialShowDetails}
//         roomId={params.id}
//         room={room} // Pass room object to client component
//       />
//     </>
//   );
// }
