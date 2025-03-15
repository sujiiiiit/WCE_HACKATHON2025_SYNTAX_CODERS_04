// components/chat/findFiles.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@react-hook/media-query";
// import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {useLocation} from "@/hooks/useLocation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DrawerDialogDemo() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
 
  if (isDesktop) {
    return (
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger className="w-full">
              <AddLocation />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            Add location to the conversation
          </TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-[600px] p-0  h-[60dvh] max-h-[60dvh]">
          <DialogHeader className="hidden">
            <DialogTitle>Search Files</DialogTitle>
            <DialogDescription>
              Search the files from the project space or you have uploaded
              recently.
            </DialogDescription>
          </DialogHeader>
          <div className="flex border-b border-light h-12 items-center justify-between">
            <span className="p-4 rounded-none rounded-tr-2xl outline-0 text-color-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                className="h-5 w-5 shrink-0"
              >
                <path
                  d="M17.5 17.5L22 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <SearchInput />
            <DialogClose className="p-4 rounded-none rounded-tr-2xl outline-0 " />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <AddLocation />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-3">
          <DrawerTitle className="hidden">Search location</DrawerTitle>
          <DrawerDescription className="hidden">
            Search Location
          </DrawerDescription>
          <SearchInput className="h-auto bg-accent border rounded-full" />
        </DrawerHeader>
        <ScrollArea className="min-h-[35dvh] max-h-[55dvh] h-dvh px-4"></ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export function SearchInput({ className }: { className?: string }) {
  return (
    <>
      <Input
        placeholder="Search projects..."
        className={cn(
          "h-12 bg-transparent border-0 outline-0  px-4 border-x border-light rounded-none",
          className
        )}
      />
    </>
  );
}

export function AddLocation() {
  const { location, address, error, loading } = useLocation();
  const displayLocation = address
    ? // Take just the first part of the address (typically city/area)
      address.display_name.split(",")[0]
    : "Location";
    console.log(displayLocation);
  return (
    <label className="flex w-full h-9 min-w-8 items-center justify-start  rounded-full border p-2 pl-3 text-[13px] font-medium border-light cursor-pointer group hover:bg-accent text-color-secondary transition-all bg-transparent gap-[2px] outline-0 max-w-full text-start">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[18px] w-[18px] shrink-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"
          fill="currentColor"
        ></path>
      </svg>

      <p className="min-w-0  text-inherit items-center pl-1 pr-1 select-none w-full max-w-full truncate">
        {displayLocation}
      </p>
    </label>
  );
}
