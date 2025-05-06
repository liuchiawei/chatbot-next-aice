import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function AiProfile({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Avatar className="size-32">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          AI
        </AvatarFallback>
      </Avatar>
      <h1 className="text-xl font-bold mt-4">Mr. AICE</h1>
      <h2 className="text-sm text-zinc-500">AICE株式会社</h2>
    </div>
  );
}
