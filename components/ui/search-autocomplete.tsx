"use client";

import type React from "react";
import { ScrollArea } from "@/components/ui/scroll-area"

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SearchAutocomplete({
  className,
}: {
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data for suggestions
  const allSuggestions = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "Redux",
    "React Router",
    "Vercel",
    "Netlify",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "VS Code",
  ];

  // Filter suggestions based on input
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const filtered = allSuggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    // Arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    // Arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    // Enter
    else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        selectSuggestion(suggestions[selectedIndex]);
      }
    }

    // Escape
    else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Select a suggestion
  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn(" max-w-full", className)} ref={containerRef}>
      <div className="relative w-full">
        <div
          className={cn(
            "relative flex items-center h-12 w-full px-2 sm:px-4 py-2 shadow-lg bg-background border-2 border-b-0",
            isOpen && suggestions.length > 0
              ? "rounded-t-[24px] rounded-b-none"
              : "rounded-[24px]"
          )}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            className="toggle-sidebar shrink-0 hover:bg-transparent p-1 sm:p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              className="h-[18px] w-[18px] shrink-0"
            >
              <path
                d="M4 5L20 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12L20 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 19L20 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>

          <Input
            ref={inputRef}
            type="text"
            placeholder="Search places"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() =>
              query.trim() !== "" && suggestions.length > 0 && setIsOpen(true)
            }
            className="border-0 h-full p-0 w-full flex text-sm sm:text-base pl-1"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 shrink-0 rounded-full p-1 sm:p-2"
              onClick={() => setQuery("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                className="h-[18px] w-[18px] shrink-0"
              >
                <path
                  d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          )}
        </div>

        {isOpen && suggestions.length > 0 && (
          <div className="absolute w-full z-10">
            <ScrollArea 
              className="bg-background border-2 shadow-lg rounded-b-[24px] w-full"
              style={{ 
                maxHeight: `${Math.min(suggestions.length * 40 + 16, window.innerHeight * 0.4)}px`,
                minHeight: '40px',
              }}
            >
              <ul className="w-full py-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    ref={(el) => {
                      suggestionRefs.current[index] = el;
                    }}
                    className={cn(
                      "flex w-full items-center h-10 px-4 sm:px-12 justify-start text-xs sm:text-sm cursor-pointer hover:bg-muted truncate",
                      selectedIndex === index && "bg-muted"
                    )}
                    onClick={() => selectSuggestion(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <HighlightMatch text={suggestion} query={query} />
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}

// Component to highlight matching text
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span
            key={i}
            className="font-semibold bg-yellow-100 dark:bg-yellow-900/30"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}