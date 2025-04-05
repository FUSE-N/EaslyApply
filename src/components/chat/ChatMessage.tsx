
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full gap-3 p-4 rounded-lg",
      isUser ? "bg-primary/5" : "bg-accent/50"
    )}>
      <div className="flex-shrink-0">
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          isUser ? "bg-primary/10" : "bg-primary/20"
        )}>
          {isUser ? (
            <User className="h-5 w-5 text-primary" />
          ) : (
            <Bot className="h-5 w-5 text-primary" />
          )}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {isUser ? "You" : "AI Assistant"}
          </span>
          {message.timestamp && (
            <span className="text-xs text-muted-foreground">
              {format(message.timestamp, "h:mm a")}
            </span>
          )}
        </div>
        <div className="text-sm whitespace-pre-line">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
