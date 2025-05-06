import Messages from "./Messages";
import InputBox from "./InputBox";
import { Message } from 'ai';

export default function ChatSection({ messages, input, handleInputChange, handleSubmit }: { messages: Message[], input: string, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="flex flex-col justify-between gap-4 w-full max-w-4xl h-full min-h-screen p-2 mx-auto stretch">
      {/* Chat History */}
      <Messages messages={messages} className="bg-zinc-100/80 dark:bg-zinc-900" containerClassName="mt-8 z-10" />
      {/* User Input Block */}
      <InputBox input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} className="bg-zinc-100 dark:bg-zinc-800 z-10" />
    </div>
  );
}
