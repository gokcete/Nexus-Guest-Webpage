// "use client";
// import Image, { StaticImageData } from "next/image";
// import React, { useState } from "react";
// import { cn } from "@/lib/utils";

// import { MdOutlineKingBed } from "react-icons/md";
// import { SlSizeActual } from "react-icons/sl";
// import { BsPeople } from "react-icons/bs";
// import Link from "next/link";

// export const Card = React.memo(
//   ({
//     card,
//     index,
//     hovered,
//     setHovered,
//   }: {
//     card: any;
//     index: number;
//     hovered: number | null;
//     setHovered: React.Dispatch<React.SetStateAction<number | null>>;
//   }) => (
//     <div>
//       <Link href={`rooms/${card.id}`}>
//         <div
//           onMouseEnter={() => setHovered(index)}
//           onMouseLeave={() => setHovered(null)}
//           className={cn(
//             "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
//             hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
//           )}
//         >
//           <Image
//             src={card.src}
//             alt={card.title}
//             fill
//             className="object-cover absolute inset-0"
//           />
//           <div
//             className={cn(
//               "flex flex-col absolute inset-0 bg-black/50  items-center justify-around py-8 px-4 transition-opacity duration-300",
//               hovered === index ? "opacity-100" : "opacity-0"
//             )}
//           >
//             <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
//               {card.title}
//             </div>

//             <button className="px-4 py-2 rounded-md border border-neutral-200 bg-transparent text-neutral-200 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
//               See Details
//             </button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   )
// );

// const CardInformation = React.memo(
//   ({
//     card,
//     index,
//     hovered,
//   }: {
//     card: any;
//     index: number;
//     hovered: number | null;
//   }) => (
//     <div
//       className={cn(
//         "flex flex-col gap-2 mt-8 ",
//         hovered === index ? "opacity-100" : "opacity-0"
//       )}
//     >
//       <div className="text-center grid grid-cols-5 items-center  text-neutral-700">
//         <MdOutlineKingBed className="text-3xl" />

//         <p className="text-small col-span-3">{card.bed}</p>
//       </div>
//       <div className="text-center grid grid-cols-5 items-center  text-neutral-700">
//         <SlSizeActual className="text-3xl" />

//         <p className="text-small col-span-3">{card.size}</p>
//       </div>
//       <div className="text-center grid grid-cols-5 items-center  text-neutral-700">
//         <BsPeople className="text-3xl" />

//         <p className="text-small col-span-3">{card.occupancy}</p>
//       </div>
//     </div>
//   )
// );

// Card.displayName = "Card";
// CardInformation.displayName = "CardInformation";

// type Card = {
//   title: string;
//   src: StaticImageData;
// };

// export function FocusCards({ cards }: { cards: Card[] }) {
//   const [hovered, setHovered] = useState<number | null>(null);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full mb-40">
//       {cards.map((card, index) => (
//         <div key={card.title}>
//           <Card
//             key={card.title}
//             card={card}
//             index={index}
//             hovered={hovered}
//             setHovered={setHovered}
//           />
//           <CardInformation card={card} index={index} hovered={hovered} />
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { MdOutlineKingBed } from "react-icons/md";
import { SlSizeActual } from "react-icons/sl";
import { BsPeople } from "react-icons/bs";
import Link from "next/link";

interface CardData {
  id: string;
  title: string;
  src: StaticImageData;
  bed: string;
  size: string;
  occupancy: string;
}

interface CardProps {
  card: CardData;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Card = React.memo(
  ({ card, index, hovered, setHovered }: CardProps) => (
    <div>
      <Link href={`rooms/${card.id}`}>
        <div
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
          )}
        >
          <Image
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute inset-0"
          />
          <div
            className={cn(
              "flex flex-col absolute inset-0 bg-black/50 items-center justify-around py-8 px-4 transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
              {card.title}
            </div>
            <button className="px-4 py-2 rounded-md border border-neutral-200 bg-transparent text-neutral-200 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
              See Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
);

interface CardInformationProps {
  card: CardData;
  index: number;
  hovered: number | null;
}

const CardInformation = React.memo(
  ({ card, index, hovered }: CardInformationProps) => (
    <div
      className={cn(
        "flex flex-col gap-2 mt-8",
        hovered === index ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-center grid grid-cols-5 items-center text-neutral-700">
        <MdOutlineKingBed className="text-3xl" />
        <p className="text-small col-span-3">{card.bed}</p>
      </div>
      <div className="text-center grid grid-cols-5 items-center text-neutral-700">
        <SlSizeActual className="text-3xl" />
        <p className="text-small col-span-3">{card.size}</p>
      </div>
      <div className="text-center grid grid-cols-5 items-center text-neutral-700">
        <BsPeople className="text-3xl" />
        <p className="text-small col-span-3">{card.occupancy}</p>
      </div>
    </div>
  )
);

Card.displayName = "Card";
CardInformation.displayName = "CardInformation";

interface FocusCardsProps {
  cards: CardData[];
}

export function FocusCards({ cards }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full mb-40">
      {cards.map((card, index) => (
        <div key={card.id}>
          <Card
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
          <CardInformation card={card} index={index} hovered={hovered} />
        </div>
      ))}
    </div>
  );
}
