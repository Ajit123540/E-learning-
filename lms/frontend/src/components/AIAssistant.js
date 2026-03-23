import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Fab, 
  Paper, 
  Typography, 
  IconButton, 
  TextField, 
  InputAdornment,
  Avatar
} from '@mui/material';
import { Chat as ChatIcon, Close, Send, SmartToy, Person } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm EduNova AI 👋 How can I help you find the perfect course today?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');

    // Simulate thinking delay and AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          text: "I'm a demo AI assistant for EduNova! Right now I'm just a layout mockup, but soon I'll be able to recommend courses, answer technical questions, and guide your learning journey directly.", 
          sender: 'ai' 
        }
      ]);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Box
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        sx={{
          position: 'fixed',
          bottom: { xs: 24, md: 32 },
          right: { xs: 24, md: 32 },
          zIndex: 1000,
        }}
      >
        <Fab 
          color="primary" 
          aria-label="chat" 
          onClick={toggleChat}
          sx={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: '0 8px 16px rgba(79, 70, 229, 0.4)',
            '&:hover': {
              boxShadow: '0 12px 24px rgba(79, 70, 229, 0.6)',
            },
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {isOpen ? <Close fontSize="large" /> : <ChatIcon fontSize="large" />}
        </Fab>
      </Box>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            elevation={24}
            sx={{
              position: 'fixed',
              bottom: { xs: 100, md: 110 },
              right: { xs: 24, md: 32 },
              width: { xs: 'calc(100vw - 48px)', sm: 360 },
              height: 500,
              maxHeight: 'calc(100vh - 140px)',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              overflow: 'hidden',
              zIndex: 999,
              bgcolor: 'background.paper',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 40, height: 40 }}>
                <SmartToy />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  EduNova AI
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Online • Ready to help
                </Typography>
              </Box>
            </Box>

            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                bgcolor: '#f9fafb',
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  sx={{
                    display: 'flex',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                    gap: 1.5,
                    alignItems: 'flex-end',
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 28, height: 28, 
                      bgcolor: message.sender === 'user' ? '#111827' : '#ec4899'
                    }}
                  >
                    {message.sender === 'user' ? <Person sx={{ fontSize: 18 }} /> : <SmartToy sx={{ fontSize: 18 }} />}
                  </Avatar>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.5,
                      maxWidth: '75%',
                      bgcolor: message.sender === 'user' ? '#111827' : 'white',
                      color: message.sender === 'user' ? 'white' : '#111827',
                      borderRadius: 3,
                      borderBottomRightRadius: message.sender === 'user' ? 4 : 24,
                      borderBottomLeftRadius: message.sender === 'ai' ? 4 : 24,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                      {message.text}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #f3f4f6' }}>
              <TextField
                fullWidth
                placeholder="Ask me anything..."
                variant="outlined"
                size="small"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  sx: { borderRadius: 3, bgcolor: '#f9fafb' },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        color="primary" 
                        onClick={handleSend}
                        disabled={!inputMessage.trim()}
                        sx={{ color: inputMessage.trim() ? '#4f46e5' : 'action.disabled' }}
                      >
                        <Send fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Paper>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
