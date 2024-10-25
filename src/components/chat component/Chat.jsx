import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import { Send as SendIcon, SmartToy as BotIcon } from '@mui/icons-material';



const Chat = () => {


    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isBot: true },
      ]);
      const [newMessage, setNewMessage] = useState('');
    
      const handleSend = () => {
        if (newMessage.trim()) {
          // Add user message
          setMessages([...messages, { text: newMessage, isBot: false }]);
          
          // Simulate bot response (replace this with your actual chatbot logic)
          setTimeout(() => {
            setMessages(prev => [...prev, {
              text: "Thanks for your message! I'm a demo chatbot.",
              isBot: true
            }]);
          }, 1000);
          
          setNewMessage('');
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };


  

  return (
    <>
   
   <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ p: 2 }}>
        ChatBot
      </Typography>
      
      {/* Messages Area */}
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1,
          mb: 2,
          overflow: 'auto',
        //   maxHeight: 'calc(100vh - 300px)',
          backgroundColor: '#f5f5f5',
          
        }}
        
      >
        <List>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                  padding: 2
                }}
              >
                {message.isBot && (
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: '#1976d2' }}>
                      <BotIcon />
                    </Avatar>
                  </ListItemAvatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    padding: 2,
                    maxWidth: '80%',
                    backgroundColor: message.isBot ? 'white' : '#1976d2',
                    color: message.isBot ? 'inherit' : 'white'
                  }}
                >
                  <Typography>{message.text}</Typography>
                </Paper>
                {!message.isBot && (
                  <ListItemAvatar sx={{ ml: 2 }}>
                    <Avatar>{message.isBot ? <BotIcon /> : 'U'}</Avatar>
                  </ListItemAvatar>
                )}
              </ListItem>
              {index < messages.length - 1 && <Divider variant="fullWidth" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: 'white',
          position: 'sticky',
          bottom: 0
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  

    </>
  )
}

export default Chat