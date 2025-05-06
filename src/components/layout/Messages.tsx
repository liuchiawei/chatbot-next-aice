'use client';

import { Message } from "ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "motion/react";
import SplitText from "@/components/common/SplitText";

export default function Messages({ messages, className, containerClassName }: { messages: Message[], className?: string, containerClassName?: string }) {
  const isMobile = useIsMobile();
  return (
    <div className={cn("flex flex-col gap-2 rounded-lg", containerClassName)}>
      {messages.map(message => (
        // message box
        <div key={message.id} className={cn("flex gap-2", message.role === 'user' ? 'self-end flex-row-reverse' : 'self-start')}>
          {/* Mobile: no avatar */}
          {!isMobile && (
            <Avatar className="row-span-2">
              { message.role === 'user' ? (
                // user avatar icon
                <AvatarImage src="https://github.com/shadcn.png" />
              ) : (
                // ai avatar icon
                <AvatarImage src="https://github.com/shadcn.png" />
              )}
              <AvatarFallback>
                {message.role === 'user' ? 'Me' : 'AI'}
              </AvatarFallback>
            </Avatar>
          )}
          {/* message container */}
          <div className={cn("flex flex-col gap-1 w-fit py-2 px-4 rounded-md shadow-sm dark:shadow-none *:whitespace-pre-wrap", className)}>
            {/* header: role */}
            <div className="text-xs text-zinc-300 dark:text-zinc-600">
              {message.role === 'user' ? 'Me' : 'AI'}
            </div>
            {/* body: content */}
            {message.parts?.map((part: any, i: number) => {
              switch (part.type) {
                case 'text':
                  return <p className="block" key={`${message.id}-${i}`}>{part.text}</p>;
                case 'tool-invocation':
                  return (
                    // image container
                    <div key={`${message.id}-${i}`} className="w-full max-w-lg flex flex-col justify-center items-center px-4 py-6 gap-4">
                      {/* Test Block */}
                      {/* <pre>
                        {JSON.stringify(part.toolInvocation, null, 2)}
                      </pre> */}
                      {(part.toolInvocation.state === "result")
                       /* eslint-disable-next-line @next/next/no-img-element */
                      ? <img src={part.toolInvocation.result.imagePath} alt={part.toolInvocation.prompt} className="object-cover" />
                      // TODO: image skeleton
                      : (
                        <>
                          <SplitText text="うーん...... ユーザーが画像をリクエストしたので、プロンプトに基づいて生成しています。" className="text-sm opacity-50" />
                          <motion.div className="w-full p-16 aspect-square flex items-center justify-center bg-zinc-300 dark:bg-zinc-700 animate-pulse">
                            <SplitText text="Generating..." />
                          </motion.div>
                        </>
                      )
                      }
                    </div>
                  );
              }
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
