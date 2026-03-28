import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Slider, Tooltip } from '@mui/material';
import { Edit, Delete, Undo, FormatColorFill, Brush } from '@mui/icons-material';
import { motion } from 'framer-motion';

const StudyWhiteboard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#a855f7');
  const [brushSize, setBrushSize] = useState(3);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set logical vs visual canvas size for sharp rendering
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Fill initial background
    context.fillStyle = 'rgba(255, 255, 255, 0.02)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial blank history state
    const initialState = canvas.toDataURL();
    setHistory([initialState]);
  }, []); // Only run once on mount

  // Sync color & size dynamically
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    
    // Save state to history for Undo functionality
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setHistory(prev => [...prev.slice(-10), dataUrl]); // keep last 10 strokes
    }
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop(); // Remove current state
    const previousState = newHistory[newHistory.length - 1];
    
    setHistory(newHistory);
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Fill background again
      context.fillStyle = 'rgba(255, 255, 255, 0.02)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(255, 255, 255, 0.02)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([canvas.toDataURL()]);
  };

  const colors = ['#f8fafc', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899'];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>Study Scratchpad</Typography>
      <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>Use this interactive whiteboard to draw diagrams or take formula notes while watching the course!</Typography>
      
      <Paper elevation={0} sx={{ p: 2, background: '#0f172a', borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        
        {/* Toolbar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, background: 'rgba(255,255,255,0.05)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {colors.map(c => (
              <Box 
                key={c} 
                onClick={() => setColor(c)}
                component={motion.div} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: c, cursor: 'pointer', border: color === c ? '3px solid white' : '1px solid rgba(255,255,255,0.2)', boxShadow: color === c ? `0 0 10px ${c}` : 'none' }} 
              />
            ))}
            <Box sx={{ width: 1, height: 24, bgcolor: 'rgba(255,255,255,0.2)', mx: 1 }} />
            <Brush sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 20 }} />
            <Slider 
              value={brushSize} min={1} max={20} onChange={(e, val) => setBrushSize(val)} 
              sx={{ width: 100, color: color, mx: 1 }} 
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Undo">
              <IconButton size="small" onClick={handleUndo} disabled={history.length <= 1} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}><Undo fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Clear Board">
              <IconButton size="small" onClick={handleClear} sx={{ color: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.1)', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' } }}><Delete fontSize="small" /></IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Canvas Area */}
        <Box sx={{ width: '100%', height: 400, borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', cursor: 'crosshair', background: '#1e293b' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default StudyWhiteboard;
