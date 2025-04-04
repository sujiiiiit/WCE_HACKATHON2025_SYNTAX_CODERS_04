import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";

const SidebarToggle = ({ className }: { className: string }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size={"icon"}
          className={cn("relative toggle-sidebar rounded-lg", className)}
          data-state={isSidebarOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
          >
            <path
              d="M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M9.5 3L9.5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M5 7H6M5 10H6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isSidebarOpen ? "Close Sidebar" : "Open sidebar"}
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarToggle;
