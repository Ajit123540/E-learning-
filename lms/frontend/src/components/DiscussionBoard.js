import React, { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, IconButton, Divider, Chip } from '@mui/material';
import { ThumbUp, ThumbUpOutlined, Reply, Send, VerifiedUser } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_DISCUSSIONS = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    isInstructor: false,
    timestamp: '2 hours ago',
    title: 'Stuck on the exact syntax for React Hooks inside loops',
    content: 'I know we aren\'t supposed to put hooks inside loops, but what is the best workaround if I have a dynamically generated list of items that each need their own state?',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 101,
        author: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?u=jane',
        isInstructor: true,
        timestamp: '1 hour ago',
        content: 'Great question Sarah! Instead of calling the hook inside the loop, break that list item out into its own separate child component. Then, you can call the hook safely at the top level of that child component!',
        likes: 24,
      }
    ]
  },
  {
    id: 2,
    author: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    isInstructor: false,
    timestamp: '1 day ago',
    title: 'Recommendation: VS Code Extensions for this course',
    content: 'Just wanted to share that downloading Prettier and ESLint extensions makes following along with Module 3 much easier!',
    likes: 45,
    isLiked: true,
    replies: []
  }
];

const DiscussionBoard = ({ courseId, currentUser }) => {
  const [threads, setThreads] = useState(MOCK_DISCUSSIONS);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handlePostQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;
    
    const newThread = {
      id: Date.now(),
      author: currentUser?.name || 'You',
      avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?u=you',
      isInstructor: false,
      timestamp: 'Just now',
      title: newQuestionTitle,
      content: newQuestionContent,
      likes: 0,
      isLiked: false,
      replies: []
    };
    
    setThreads([newThread, ...threads]);
    setNewQuestionTitle('');
    setNewQuestionContent('');
  };

  const handlePostReply = (threadId) => {
    if (!replyContent.trim()) return;

    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: [...thread.replies, {
            id: Date.now(),
            author: currentUser?.name || 'You',
            avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?u=you',
            isInstructor: false,
            timestamp: 'Just now',
            content: replyContent,
            likes: 0
          }]
        };
      }
      return thread;
    }));
    
    setReplyContent('');
    setReplyingTo(null);
  };

  const toggleLike = (threadId) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          isLiked: !thread.isLiked,
          likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1
        };
      }
      return thread;
    }));
  };

  return (
    <Box>
      {/* Post New Question */}
      <Box sx={{ bgcolor: '#f8fafc', p: 3, borderRadius: 3, mb: 4, border: '1px solid #e2e8f0' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
          Ask the Community
        </Typography>
        <TextField fullWidth placeholder="Question Title (e.g. Need help with Module 2)" value={newQuestionTitle} onChange={(e) => setNewQuestionTitle(e.target.value)} sx={{ mb: 2, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
        <TextField fullWidth multiline rows={3} placeholder="Details about your question..." value={newQuestionContent} onChange={(e) => setNewQuestionContent(e.target.value)} sx={{ mb: 2, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" disabled={!newQuestionTitle.trim() || !newQuestionContent.trim()} onClick={handlePostQuestion} sx={{ bgcolor: '#4f46e5', fontWeight: 700, borderRadius: 2, px: 3, '&:hover': { bgcolor: '#4338ca' } }}>
            Post Question
          </Button>
        </Box>
      </Box>

      {/* Threads */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <AnimatePresence>
          {threads.map((thread) => (
            <motion.div key={thread.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                
                {/* Voting Column */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IconButton onClick={() => toggleLike(thread.id)} sx={{ color: thread.isLiked ? '#4f46e5' : '#94a3b8', bgcolor: thread.isLiked ? 'rgba(79, 70, 229, 0.1)' : 'transparent' }}>
                    {thread.isLiked ? <ThumbUp fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: thread.isLiked ? '#4f46e5' : '#64748b' }}>
                    {thread.likes}
                  </Typography>
                </Box>

                {/* Content Column */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.3, mb: 1 }}>
                    {thread.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6 }}>
                    {thread.content}
                  </Typography>
                  
                  {/* Meta Footer */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={thread.avatar} sx={{ width: 24, height: 24 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155' }}>{thread.author}</Typography>
                      {thread.isInstructor && <Chip size="small" icon={<VerifiedUser sx={{ fontSize: '14px !important' }}/>} label="Instructor" sx={{ height: 20, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.65rem', fontWeight: 700 }} />}
                    </Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>• {thread.timestamp}</Typography>
                    <Button size="small" startIcon={<Reply fontSize="small"/>} onClick={() => setReplyingTo(replyingTo === thread.id ? null : thread.id)} sx={{ textTransform: 'none', color: '#64748b', fontWeight: 600, ml: 'auto' }}>
                      Reply
                    </Button>
                  </Box>

                  {/* Reply Input Box */}
                  <AnimatePresence>
                    {replyingTo === thread.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                          <TextField fullWidth size="small" placeholder="Write a reply..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} autoFocus />
                          <Button variant="contained" disabled={!replyContent.trim()} onClick={() => handlePostReply(thread.id)} sx={{ bgcolor: '#4f46e5' }}><Send fontSize="small" /></Button>
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Replies Map */}
                  {thread.replies.length > 0 && (
                    <Box sx={{ pl: 3, borderLeft: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {thread.replies.map(reply => (
                        <Box key={reply.id} sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Avatar src={reply.avatar} sx={{ width: 20, height: 20 }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, color: '#334155' }}>{reply.author}</Typography>
                            {reply.isInstructor && <Chip size="small" icon={<VerifiedUser sx={{ fontSize: '12px !important' }}/>} label="Instructor" sx={{ height: 18, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#059669', fontSize: '0.6rem', fontWeight: 700 }} />}
                            <Typography variant="caption" sx={{ color: '#94a3b8', ml: 1 }}>{reply.timestamp}</Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: '#475569' }}>{reply.content}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                  
                  <Divider sx={{ mt: 3 }} />
                </Box>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default DiscussionBoard;
