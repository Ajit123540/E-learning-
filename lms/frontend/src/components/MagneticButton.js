import React from 'react';
import { motion } from 'framer-motion';
import { Button, Box } from '@mui/material';

const MagneticButton = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 17
          }
        }}
        whileTap={{
          scale: 0.95,
          transition: {
            type: "spring",
            stiffness: 600,
            damping: 15
          }
        }}
      >
        <Button
          {...props}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background: props.variant === 'contained' 
              ? 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)'
              : 'transparent',
            border: props.variant === 'outlined' 
              ? '2px solid transparent'
              : 'none',
            borderImage: props.variant === 'outlined'
              ? 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff) 1'
              : 'none',
            color: props.variant === 'contained' ? 'white' : '#3a86ff',
            fontWeight: 600,
            px: 3,
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 8px 32px rgba(58, 134, 255, 0.3)',
            transition: 'all 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: -100,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              transition: 'left 0.5s ease',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(58, 134, 255, 0.4)',
              '&::before': {
                left: '100%',
              },
            },
            '&:active': {
              transform: 'translateY(0)',
              boxShadow: '0 4px 20px rgba(58, 134, 255, 0.3)',
            },
            ...props.sx,
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {children}
          </Box>
        </Button>
      </motion.div>
    </Box>
  );
};

export default MagneticButton;
