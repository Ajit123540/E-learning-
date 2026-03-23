import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const GlowingText = ({ 
  children, 
  variant = 'h4', 
  color = '#3a86ff',
  glowColor = '#3a86ff',
  intensity = 0.8,
  ...props 
}) => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        ...props.sx,
      }}
    >
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography
          variant={variant}
          sx={{
            fontWeight: 700,
            color: color,
            textShadow: `
              0 0 10px ${glowColor}${Math.floor(intensity * 255).toString(16).padStart(2, '0')},
              0 0 20px ${glowColor}${Math.floor(intensity * 200).toString(16).padStart(2, '0')},
              0 0 30px ${glowColor}${Math.floor(intensity * 150).toString(16).padStart(2, '0')},
              0 0 40px ${glowColor}${Math.floor(intensity * 100).toString(16).padStart(2, '0')}
            `,
            background: variant === 'h2' || variant === 'h1' 
              ? `linear-gradient(45deg, ${color}, ${glowColor}, #8338ec)`
              : 'none',
            WebkitBackgroundClip: variant === 'h2' || variant === 'h1' ? 'text' : 'none',
            WebkitTextFillColor: variant === 'h2' || variant === 'h1' ? 'transparent' : color,
            filter: 'brightness(1.2)',
            ...props.sx,
          }}
        >
          {children}
        </Typography>
      </motion.div>
      
      {/* Animated Glow Effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle, ${glowColor}${Math.floor(intensity * 100).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          filter: 'blur(20px)',
          zIndex: -1,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </Box>
  );
};

export default GlowingText;
