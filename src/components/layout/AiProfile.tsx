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
      <h1 className="text-xl font-bold mt-4">Evil Morty</h1>
      <h2 className="text-sm text-zinc-500">79⊢⊇V</h2>
    </div>
  );
}
