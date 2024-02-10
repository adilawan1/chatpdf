"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { BotIcon, Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import { Message } from "ai";
import axios from "axios";
type Props = { chatId: number };

const MyChatComponent = ({ chatId }: Props) => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["chat", chatId],
  //   queryFn: async () => {
  //     const response = await axios.post<Message[]>("/api/get-messages", {
  //       chatId,
  //     });
  //     return response.data;
  //   },
  // });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/my-chat",
    body: {
      chatId,
    },
    initialMessages: [],
  });

  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  return (
    <div
      className="relative max-h-screen w-full overflow-y-scroll"
      id="message-container"
    >
      {/* Header */}
      <div className="flex justify-center w-fit sticky top-0 inset-x-0 p-2 h-fit backdrop-blur-lg">
        <h3 className="text-7xl font-bold">My Chat</h3> <BotIcon />
      </div>
      {/* Message List */}
      <MessageList messages={messages} isLoading={false} />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 h-full"
      >
        <div className="flex ">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Who is Ahmed Adil?"
            className="w-full text-2xl"
          />
          <Button className="bg-blue-800 ml-2">
            <Send className="h8 w-8" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyChatComponent;
