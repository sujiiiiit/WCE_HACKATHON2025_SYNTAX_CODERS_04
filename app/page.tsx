"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Maps from "@/maps/app";
import MessageContainer from "@/components/chat/messageContainer";
import { APIProvider } from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import New from "@/app/new";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const tabLabels = ["Explore", "Analyze"];

const tabContents = [
  <Maps key="explore" />,
  <div
    key="Analyze"
    className="w-full h-full bg-gray-100 flex items-center justify-center"
  >
    <h2 className="text-2xl font-semibold">Analyze Content</h2>
  </div>,
];

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
};

const MapComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);
  const [inputText, setInputText] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<
    { role: 'user' | 'gemini'; content: string }[]
  >([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (index: number): void => {
    if (index === activeTab) return;
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const handleMessageChange = (text: string) => {
    setInputText(text);
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const callGeminiAPI = async (text: string) => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setStreamError("GEMINI_API_KEY environment variable is not set.");
      return;
    }

    setIsStreaming(true);
    setStreamError(null);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-thinking-exp-01-21",
    });

    const generationConfig = {
      temperature: 0.7,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 65536,
      responseMimeType: "text/plain",
    };

    const chat = model.startChat({
      generationConfig,
      history: [],
    });

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: 'user', content: text },
    ]);
    setInputText('');

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: 'gemini', content: "" }
    ]);

    try {
      const streamingResp = await chat.sendMessageStream(text);

      let fullResponse = "";

      for await (const chunk of streamingResp.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;

        setChatHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          const lastMessageIndex = updatedHistory.length - 1;
          updatedHistory[lastMessageIndex].content = fullResponse;
          return updatedHistory;
        });
      }
    } catch (e: any) {
      console.error("Error streaming Gemini response:", e);
      setStreamError("Failed to get streaming response from Gemini.");

      setChatHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        const lastMessageIndex = updatedHistory.length - 1;
        updatedHistory[lastMessageIndex].content = "Error fetching response.";
        return updatedHistory;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      callGeminiAPI(inputText);
    }
  };

  return (
    <>

    <main className="relative flex h-dvh w-dvw overflow-hidden">
      {/* Floating Tabs */}
      <div className="absolute top-4 left-4 z-30 flex items-center bg-white/80 backdrop-blur-md rounded-full shadow-md px-1 py-1">
        {tabLabels.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 mx-1 ${
              activeTab === index
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handleTabChange(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Container */}
      <div className="w-full h-full relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <APIProvider
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              region="IN"
            >
              {tabContents[activeTab]}
            </APIProvider>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Message Container */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-transparent z-30 data-[state=open]:relative w-full sm:max-w-md flex flex-col h-96 sm:h-full"
        data-state="open"
      >
        <div
          ref={chatHistoryRef}
          className="data-[state=open]:flex-1 flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800"
          data-state="open"
        >
          {chatHistory.map((message, index) => (
            <div
              key={`${index}-${message.content.length}`}
              className={cn(
                "mb-2 p-2  px-4 break-words",
                message.role === 'user'
                  ? "bg-blue-100 rounded-[24px] text-blue-800 ml-auto w-fit max-w-[80%]"
                  : " mr-auto w-full "
              )}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
          {isStreaming && (
            <div className="italic text-gray-500">Streaming response...</div>
          )}
          {streamError && (
            <p className="text-red-500">Error: {streamError}</p>
          )}
        </div>
        <MessageContainer
          className=""
          onMessageChange={handleMessageChange}
          onSendMessage={handleSendMessage}
        />
      </div>
    </main>
    <New/>
    </>
  );
};

export default MapComponent;
