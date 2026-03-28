import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, IconButton, Typography, TextField, Avatar, Paper, Fade, CircularProgress, Backdrop
} from '@mui/material';
import { 
  AutoAwesome, Close, Send, SmartToy, Person 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const AITutorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your AI Course Assistant. I can help answer questions about the curriculum, explain complex topics, or guide you through your learning journey. What's on your mind?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Response Logic
    setTimeout(() => {
      let aiResponseText = "That's a great question! Based on the course materials, you can find more detailed explanations in Module 3. Would you like me to summarize it for you?";
      
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        aiResponseText = "Hello! How can I help you accelerate your learning today?";
      } else if (lowerInput.includes('certificate')) {
        aiResponseText = "You will automatically unlock your certificate once you complete 100% of the course modules. Keep going, you're doing great!";
      } else if (lowerInput.includes('exam')) {
        aiResponseText = "Exams are timed and require a 70% passing score. Don't worry, you can always review the study notes in your dashboard before starting.";
      }

      const aiMsg = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      <Box sx={{ position: 'fixed', bottom: { xs: 20, md: 40 }, right: { xs: 20, md: 40 }, zIndex: 9999 }}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton 
                onClick={() => setIsOpen(true)}
                sx={{ 
                  width: 64, height: 64, 
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', 
                  color: 'white', 
                  boxShadow: '0 10px 25px rgba(236, 72, 153, 0.4)',
                  '&:hover': { background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)' }
                }}
              >
                <AutoAwesome sx={{ fontSize: 32 }} />
              </IconButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: 80,
                right: 0,
                width: '380px',
                height: '600px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Paper 
                elevation={24}
                sx={{ 
                  width: '100%', height: '100%', display: 'flex', flexDirection: 'column', 
                  borderRadius: 4, overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.95)', 
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Header */}
                <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', width: 40, height: 40 }}>
                      <SmartToy sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'white', lineHeight: 1.2 }}>AI Tutor</Typography>
                      <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981' }} /> Online
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                    <Close />
                  </IconButton>
                </Box>

                {/* Message ListView */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2, '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                  {messages.map((msg) => (
                    <Box key={msg.id} sx={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 1 }}>
                      {msg.sender === 'ai' ? (
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}><SmartToy sx={{ fontSize: 16 }} /></Avatar>
                      ) : (
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}><Person sx={{ fontSize: 16 }} /></Avatar>
                      )}
                      
                      <Box sx={{ 
                        maxWidth: '75%', p: 2, 
                        bgcolor: msg.sender === 'user' ? '#a855f7' : 'rgba(255,255,255,0.05)',
                        color: 'white',
                        borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                      }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.5, fontSize: '0.95rem' }}>
                          {msg.text}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  
                  {isTyping && (
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 1 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}><SmartToy sx={{ fontSize: 16 }} /></Avatar>
                      <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '20px 20px 20px 4px', display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                      </Box>
                    </Box>
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3, p: '4px 8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <TextField 
                      fullWidth 
                      placeholder="Ask the AI Tutor..." 
                      variant="standard" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '0.95rem', py: 1, px: 1 } }}
                    />
                    <IconButton 
                      onClick={handleSend} 
                      disabled={!inputValue.trim() || isTyping}
                      sx={{ color: inputValue.trim() ? '#a855f7' : 'rgba(255,255,255,0.2)', transition: 'color 0.2s', '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.1)' } }}
                    >
                      <Send fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
};

export default AITutorChat;
