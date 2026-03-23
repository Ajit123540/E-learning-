import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  Settings,
  Speed,
  Subtitles,
} from '@mui/icons-material';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
  onProgress, 
  onComplete,
  subtitles = [],
  playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2] 
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [selectedSubtitle, setSelectedSubtitle] = useState('off');

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
      
      // Report progress to parent
      if (onProgress) {
        onProgress(current / total);
      }
      
      // Mark as complete if 90% watched
      if (current / total > 0.9 && onComplete) {
        onComplete();
      }
    }
  };

  const handleSeek = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.volume = newValue;
      setVolume(newValue);
      setIsMuted(newValue === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
    setSettingsAnchor(null);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        bgcolor: '#000',
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover': {
          '& .video-controls': {
            opacity: 1,
          },
        },
      }}
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onClick={handlePlayPause}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '500px',
        }}
      />

      {/* Video Controls */}
      <Box
        className="video-controls"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          p: 2,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        {/* Progress Bar */}
        <Box sx={{ mb: 1 }}>
          <Slider
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            sx={{
              color: '#ff006e',
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            
            <IconButton sx={{ color: 'white' }}>
              <SkipPrevious />
            </IconButton>
            
            <IconButton sx={{ color: 'white' }}>
              <SkipNext />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <IconButton onClick={handleMuteToggle} sx={{ color: 'white' }}>
                {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
              </IconButton>
              
              <Box sx={{ width: 80 }}>
                <Slider
                  value={isMuted ? 0 : volume}
                  max={1}
                  step={0.1}
                  onChange={handleVolumeChange}
                  size="small"
                  sx={{ color: '#ff006e' }}
                />
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'white', ml: 2 }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>

          {/* Right Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'white' }}>
              <Subtitles />
            </IconButton>

            <IconButton
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              sx={{ color: 'white' }}
            >
              <Settings />
            </IconButton>

            <Tooltip title="Fullscreen">
              <IconButton onClick={handleFullscreen} sx={{ color: 'white' }}>
                <Fullscreen />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
      >
        <MenuItem>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Playback Speed
          </Typography>
        </MenuItem>
        {playbackSpeeds.map((speed) => (
          <MenuItem
            key={speed}
            onClick={() => handleSpeedChange(speed)}
            selected={speed === playbackSpeed}
          >
            {speed}x
          </MenuItem>
        ))}
      </Menu>

      {/* Video Title */}
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default VideoPlayer;
