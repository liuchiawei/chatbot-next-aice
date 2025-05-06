import { Button } from "../ui/button";
import { Globe, Image, File, Mic } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function InputOption() {
  return (
    <div className="flex gap-2 *:size-8 *:cursor-pointer *:rounded-full **:hover:bg-zinc-200 dark:**:hover:bg-zinc-700">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Globe />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Image />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <File />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload File</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <Mic />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Voice</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
