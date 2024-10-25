import React, { useState } from 'react';
import { Menu, MessageSquare, Settings, Users, PlusCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "Hi! I have a question about...", sender: "user" },
    { id: 3, text: "Sure, I'd be happy to help with that.", sender: "bot" }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user"
      }]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
        <div className="p-4 flex items-center justify-between">
          {!isSidebarCollapsed && <h1 className="text-xl font-bold">Chat App</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-white hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-4">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'
              }`}
          >
            <MessageSquare className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Messages</span>}
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'
              }`}
          >
            <Users className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Contacts</span>}
          </Button>

          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'
              }`}
          >
            <Settings className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Settings</span>}
          </Button>
        </nav>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              A
            </div>
            <div>
              <h2 className="font-semibold">AI Assistant</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                    }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="border-t bg-white p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
