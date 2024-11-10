import { BubbleChat } from "flowise-embed-react";
import { CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Bot } from "lucide-react";
import logo from "@/assets/logo.png";

export default function ChatBot() {
  return (
    <CardContent
      className="fixed bottom-4 right-8 z-50" // Adjusted position
      style={{
        maxWidth: "500px",
      }}
    >
      <BubbleChat
        chatflowid="d756ebaa-0526-40bb-be9e-e591bb5cf852"
        apiHost="https://flowise-0bzr.onrender.com"
        theme={{
          button: {
            backgroundColor: "hsl(var(--primary)/0.1)",
            right: 40, // Button position from right edge
            bottom: 45, // Button position from bottom edge
            size: 60, // Adjust button size
            iconColor: "hsl(var(--primary-foreground))",
            customIconSrc: logo.src,
          },
          chatWindow: {
            showTitle: true,
            title: "Nexus Assistant",
            titleAvatarSrc: logo.src,
            welcomeMessage: "Welcome to Nexus! How can I assist you today?",
            backgroundColor: "hsla(var(--background) / 0.4)",
            height: 450, // Adjusted chat window height
            width: 400, // Adjusted chat window width
            fontSize: 14,
            poweredByTextColor: "hsl(var(--muted-foreground))",
            botMessage: {
              backgroundColor: "hsla(var(--muted) / 0.8)",
              textColor: "hsl(var(--foreground))",
              showAvatar: true,
              avatarSrc: logo.src,
            },
            userMessage: {
              backgroundColor: "hsla(var(--primary) / 0.8)",
              textColor: "hsl(var(--primary-foreground))",
              showAvatar: true,
              avatarSrc: Bot.src,
            },
            textInput: {
              placeholder: "Type your message...",
              backgroundColor: "hsla(var(--background) / 0.8)",
              textColor: "hsl(var(--foreground))",
              sendButtonColor: "hsl(var(--primary))",
              fontSize: 14,
              padding: "12px",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
            },
            footer: {
              textColor: "#303235",
              text: "Powered by",
              company: "Rusu Emanuel",
              companyLink: "https://portofolio-ruby-tau.vercel.app/",
            },
          },
        }}
        apiConfig={{
          assistantTypingIconComponent: () => (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">
                Nexus is typing...
              </span>
            </div>
          ),
        }}
      />
    </CardContent>
  );
}
