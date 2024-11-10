// "use client";

// import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";

export const UserImage = () => {
  // const { user } = useUser();

  // if (!user) {
  //   return (
  //     <button className="p-2 rounded-full   hover:cursor-pointer hover:scale-125 ">
  //       <Link href="/sign-in">
  //         <User className="text-zinc-400" />
  //       </Link>
  //     </button>
  //   );
  // }

  return (
    <button className="p-2 rounded-full   hover:cursor-pointer hover:scale-125 ">
      <Link href="/sign-in">
        <User className="text-zinc-400" />
      </Link>
    </button>
    // <button className=" rounded-full overflow-hidden bg-black  hover:cursor-pointer hover:scale-125 ">
    //   <Link href="/sign-in">
    //     <Image
    //       src={user?.imageUrl}
    //       alt="Profile Picture"
    //       width={30}
    //       height={30}
    //     />
    //   </Link>
    // </button>
  );
};
