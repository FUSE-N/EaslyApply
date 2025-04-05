
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import ChatMessage from "./ChatMessage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "system",
      content: "You are a helpful career assistant. You help users with job search, resume writing, interview preparation, and other career-related topics.",
      timestamp: new Date(),
    },
    {
      role: "assistant",
      content: "Hello! I'm your AI career assistant. I can help with resumes, interview prep, job searches, and career advice. What questions do you have today?",
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    // Add user message to the chat
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Format messages for the API (excluding timestamps)
      const apiMessages = messages
        .concat(userMessage)
        .map(({ role, content }) => ({ role, content }));

      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: apiMessages },
      });

      if (error) throw new Error(error.message);

      // Add the AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error calling AI:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-[calc(100vh-7rem)] flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <CardTitle className="text-lg flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary" />
          AI Career Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-4">
            {messages
              .filter(m => m.role !== 'system')
              .map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            
            {isLoading && (
              <div className="flex items-center gap-2 py-2 px-4 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></div>
                AI is thinking...
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me about your career, resume, or job search..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
