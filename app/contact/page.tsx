import Image from "next/image"; // Import Image component for the background
import backgroundImage from "@/assets/contact.png"; // Import your background image
import MainLayout from "../main-layout";
import { ContactForm } from "@/components/ui/contact-form";

export default function Contact() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      <MainLayout>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="NEXUS Hotel Background"
            fill
            sizes="(max-width: 400px)"
            style={{ objectFit: "cover" }}
            loading="lazy"
            placeholder="blur"
            className="opacity-70"
          />
        </div>

        {/* Contact Section */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12 ">
          <div className="w-full max-w-3xl  rounded-lg shadow-xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us!</h1>
            <p className="text-lg md:text-xl mb-8 ">
              Do you have a question or remark? Please fill in your contact
              details and we will contact you as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </MainLayout>
    </div>
  );
}
