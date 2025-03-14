'use client'
import Maps from "@/components/map";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import MessageContainer from "@/components/chat/messageContainer";
const MapComponent = () => {
  return (
    <>
      <main className="relative flex h-dvh w-dvw overflow-hidden">
        <Maps />
        {/* <div className=" absolute z-30 sm:bottom-11 bottom-8 h-12  max-w-lg shadow-lg bg-background border-2 border-light backdrop-blur-md left-2 right-2 rounded-[24px] flex items-center">
          <span className="absolute left-2 w-full max-w-8 h-8 flex items-center justify-center ">
            <Image
              src="/gemini.svg"
              width={40}
              height={40}
              alt="search"
              className=""
            />
          </span>
          <Input className="w-full h-12 rounded-[24px] border-0 px-10" />
        </div> */}

        <div className="absolute bottom-0 left-0 right-0 bg-transparent z-30">
        <MessageContainer className=""/>

        </div>

      </main>
    </>
  );
};

export default MapComponent;
