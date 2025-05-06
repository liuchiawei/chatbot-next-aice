import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputOption from "@/components/common/InputOption";
import ScrollDownAndSend from "@/components/common/ScrollDownAndSend";

export default function InputBox({ input, handleInputChange, handleSubmit, className }: { input: string, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, className?: string }) {
  
  return (
    <form onSubmit={handleSubmit} className={cn("grid grid-cols-[1fr_auto] gap-2 w-full p-2 mb-8 border rounded-lg shadow-xl", className)}>
        <Input
          type="text"
          className="p-2 shadow-none border-none"
          value={input}
          placeholder="質問を入力してください"
          onChange={handleInputChange}
        />
        <ScrollDownAndSend />
        <InputOption />
      </form>
  );
}
