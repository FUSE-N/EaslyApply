
import SidebarLayout from "@/components/layout/SidebarLayout";
import Chat from "@/components/chat/Chat";

const ChatPage = () => {
  return (
    <SidebarLayout>
      <div className="container mx-auto">
        <Chat />
      </div>
    </SidebarLayout>
  );
};

export default ChatPage;
