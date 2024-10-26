import React, { useState } from 'react';
import { Menu, MessageSquare, Settings, Users, PlusCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "Hi! I have a question about...", sender: "user" },
    { id: 3, text: "Sure, I'd be happy to help with that.", sender: "bot" }
  ]);

  const API_URL = "http://localhost:7000"; // API endpoint
  // const API_URL = "http://10.1.133.239:7000"; // API endpoint

  const [inputMessage, setInputMessage] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
      };
      setMessages([...messages, userMessage]);
      setInputMessage("");

      try {
        const response = await fetch(`${API_URL}/get_response/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputMessage, project_name: "default_project" }),
        });

        const data = await response.json();
        const botMessage = {
          id: messages.length + 2,
          text: data.response.explanation || "I'm sorry, I couldn't process your request.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: messages.length + 2, text: "Error processing your request.", sender: "bot" },
        ]);
      }
    }
  };


  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (inputMessage.trim()) {
  //     setMessages([...messages, {
  //       id: messages.length + 1,
  //       text: inputMessage,
  //       sender: "user"
  //     }]);
  //     setInputMessage("");
  //   }
  // };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
        <div className="p-4 flex items-center justify-between">
          {!isSidebarCollapsed && <h1 className="text-xl font-bold">CRM</h1>}
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
            {!isSidebarCollapsed && <span>Chatbot</span>}
          </Button>

          <Link to="/recommend"><Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'
              }`}
          >
            <Users className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Recommendation</span>}
          </Button></Link>

          <Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'
              }`}
          >
            <Settings className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Settings</span>}
          </Button>
          <Link to="/graph"><Button
            variant="ghost"
            className={`w-full justify-start gap-2 text-white hover:bg-gray-800 ${isSidebarCollapsed ? 'px-4' : 'px-6'
              }`}
          >
            <Users className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Graph</span>}
          </Button></Link>
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
