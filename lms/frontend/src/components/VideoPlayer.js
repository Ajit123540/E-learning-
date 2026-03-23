import React from 'react';
import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
}) => {
  
  // Helper to extract Youtube video ID and format into an embed URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isYoutube = embedUrl.includes('youtube.com/embed');

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 Aspect Ratio
        bgcolor: '#000',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 2,
      }}
    >
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {isYoutube ? (
          <iframe
            style={{ width: '100%', height: '100%', border: 'none' }}
            src={embedUrl}
            title={title || 'Course Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={videoUrl}
            controls
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </Box>

      {/* Fallback title overlay if NOT a youtube embed */}
      {!isYoutube && title && (
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default VideoPlayer;
