"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import logo from "@/assets/logo.png";
const FullPageChat = dynamic(
  () => import("flowise-embed-react").then((mod) => mod.FullPageChat),
  {
    ssr: false,
  }
);

export default function VirtualAssistant() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className="w-full h-full">
      <FullPageChat
       chatflowid="d756ebaa-0526-40bb-be9e-e591bb5cf852"
        apiHost="https://flowise-0bzr.onrender.com"
        theme={{
          chatWindow: {
            showTitle: true,
            title: "Virtual Assistant",
            titleAvatarSrc: logo.src,
            showAgentMessages: true,
            welcomeMessage: "Hello! How can I assist you today?",
            errorMessage: "Oops! Something went wrong. Please try again.",
            backgroundColor: "#ffffff",
            height: "100%",
            width: "100%",
            fontSize: 16,
            starterPromptFontSize: 15,
            clearChatOnReload: false,
            botMessage: {
              backgroundColor: "#f0f4f8",
              textColor: "#1a202c",
              showAvatar: true,
              avatarSrc: logo.src,
            },
            userMessage: {
              backgroundColor: "#1234",
              textColor: "#ffffff",
              showAvatar: true,
              avatarSrc:
                "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
            },
            textInput: {
              placeholder: "Type your question...",
              backgroundColor: "#f0f4f8",
              textColor: "#1a202c",
              sendButtonColor: "#3992F6",
              maxChars: 200,
              maxCharsWarningMessage:
                "You've reached the character limit. Please shorten your message.",
              autoFocus: true,
              sendMessageSound: true,
              receiveMessageSound: true,
            },
            feedback: {
              color: "#1a202c",
            },
            footer: {
              textColor: "#1a202c",
              text: "Powered Rusu Emanuel",
              company: "Emanuel",
              companyLink: "https://portofolio-ruby-tau.vercel.app/",
            },
          },
        }}
      />
    </div>
  );
}
