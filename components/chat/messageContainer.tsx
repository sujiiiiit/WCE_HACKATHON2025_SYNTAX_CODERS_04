import FindLocation from "@/components/chat/find-location";
import { useContentEditable } from "@/hooks/useContentEditable";
import { useAppDispatch } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { WordRotate } from "../magicui/word-rotate";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface MessageContainerProps {
  className?: string;
  onMessageChange?: (text: string) => void;
  onSendMessage?: () => void; // New prop to trigger send message
}

const MessageContainer = ({
  className,
  onMessageChange,
  onSendMessage,
}: MessageContainerProps) => {
  const { contentEditableRef, hasContent } = useContentEditable();
  const dispatch = useAppDispatch();
  const [sanitizedText, setSanitizedText] = useState("");

  const sanitizeAndValidateText = () => {
    if (contentEditableRef.current) {
      const rawText = contentEditableRef.current.textContent || "";
      const sanitized = DOMPurify.sanitize(rawText, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      });
      const validatedText = sanitized.trim().substring(0, 1000);
      setSanitizedText(validatedText);
      if (onMessageChange) {
        onMessageChange(validatedText);
      }
    }
  };

  useEffect(() => {
    const currentRef = contentEditableRef.current;

    if (currentRef) {
      const handleInput = () => {
        sanitizeAndValidateText();
      };

      currentRef.addEventListener('input', handleInput);

      return () => {
        currentRef.removeEventListener('input', handleInput);
      };
    }
  }, [contentEditableRef, onMessageChange]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sanitizedText.trim() !== "") {
      if (onSendMessage) {
        onSendMessage(); // Trigger send message function in parent
      }

      if (contentEditableRef.current) {
        contentEditableRef.current.textContent = "";
        sanitizeAndValidateText();
      }
    }
  };

  return (
    <>
      <div className={cn("message-container w-full", className)}>
        <form className="w-full" onSubmit={handleSubmit}>
          {/* ... rest of your MessageContainer JSX ... */}
          <div className="relative z-[1] flex h-full max-w-full flex-1 flex-col">
            <div className="group relative z-[1] flex w-full items-center">
              <div className="w-full p-3">
                <div
                  id="composer-background"
                  className="flex w-full max-w-3xl cursor-text flex-col rounded-3xl px-3 py-1 duration-150 ease-in-out contain-inline-size motion-safe:transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] dark:shadow-none shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] has-[:focus]:shadow-[0_2px_12px_0px_rgba(0,0,0,0.04),_0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] bg-background transition-all border border-light dark:border-0 m-auto"
                >
                  <div className="flex flex-col justify-start">
                    <div className="flex min-h-[44px] items-start pl-1">
                      <div className="min-w-0 max-w-full flex-1">
                        <div className="relative flex max-h-52 overflow-y-auto">
                          <textarea className="hidden"></textarea>
                          <div
                            contentEditable="true"
                            translate="no"
                            className="w-full p-[0.5rem_0] overflow-auto resize-none border-none outline-none text-base transition-all duration-200 ease-in-out relative"
                            id="prompt-textarea"
                            data-virtualkeyboard="true"
                            ref={contentEditableRef}
                          ></div>

                          <span
                            className="text-color-secondary block pointer-events-none absolute opacity-0 max-w-full p-2 pl-0 left-0 z-1 whitespace-nowrap overflow-ellipsis overflow-hidden transition-all data-[state=empty]:opacity-100 duration-150 ease-in-out transform data-[state=empty]:translate-x-0 data-[state=empty]:translate-y-0 translate-x-[calc(1rem_*_1)] translate-y-0"
                            data-state={hasContent ? "full" : "empty"}
                          >
                            <WordRotate
                              words={[
                                "Ask anything",
                                "Give me temperature of past week",
                                "What is the weather today?",
                              ]}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="w-[32px] pt-1">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none invisible fixed left-0 top-0 block"
                        >
                          O
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 mt-1 flex items-center justify-between gap-x-1.5">
                    <div className="flex w-full gap-x-1.5">
                      <FindLocation />
                    </div>
                    <div className="flex gap-4">
                      <div className="min-w-9">
                        <span className="" data-state="closed">
                          <button
                            type="submit"
                            className="relative flex h-9 items-center justify-center rounded-full bg-black text-white transition-all focus-visible:outline-none focus-visible:outline-black disabled:text-gray-50 disabled:opacity-30 can-hover:hover:opacity-70 dark:bg-white dark:text-black w-9"
                            disabled={!hasContent}
                          >
                            <div className="flex items-center justify-center">
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon-2xl"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </button>
                        </span>
                        <span className="hidden" data-state="closed">
                          <button className="relative flex h-9 items-center justify-center rounded-full bg-black text-white transition-colors focus-visible:outline-none focus-visible:outline-black disabled:text-gray-50 disabled:opacity-30 can-hover:hover:opacity-70 dark:bg-white dark:text-black w-9">
                            <div className="flex items-center justify-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon-lg"
                              >
                                <rect
                                  x="7"
                                  y="7"
                                  width="10"
                                  height="10"
                                  rx="1.25"
                                  fill="currentColor"
                                ></rect>
                              </svg>
                            </div>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageContainer;