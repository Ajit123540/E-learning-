import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Rating,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Favorite,
  Share,
  Bookmark,
  PlayArrow,
  Star,
  TrendingUp,
  AccessTime,
  People,
  Visibility,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const EnhancedCourseCard = ({ course }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCardClick = (e) => {
    e.preventDefault();
    // Navigate to course detail page
    window.location.href = `/courses/${course.id}`;
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement share functionality
    console.log('Share course:', course.title);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      }}
      onClick={handleCardClick}
    >
      {/* Course Image with Overlay */}
      <Box
        sx={{
          position: 'relative',
          height: 200,
          overflow: 'hidden',
          backgroundColor: '#f3f4f6',
        }}
      >
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            // Use a simple fallback image
            e.target.src = `https://picsum.photos/seed/course-${course.id}/400/225.jpg`;
          }}
        />
        
        {/* Category Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
          }}
        >
          <Chip
            label={course.category}
            size="small"
            sx={{
              background: '#2563eb',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              px: 1,
            }}
          />
        </Box>
      </Box>

      {/* Course Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ p: 3, flexGrow: 1, color: '#1a1a2e' }}>
          {/* Icon and Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'rgba(37, 99, 235, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              {course.icon}
            </Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                lineHeight: 1.3,
                mb: 1,
                color: '#1a1a2e',
              }}
            >
              {course.title}
            </Typography>
          </Box>

          {/* Rating and Students */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating
                value={course.rating}
                precision={0.5}
                size="small"
                readOnly
                sx={{
                  '& .MuiRating-icon': {
                    color: '#ffd700',
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {course.rating}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <People sx={{ fontSize: '16px', color: '#9ca3af' }} />
              <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                {course.students}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              mb: 2,
              fontSize: '0.9rem',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            Learn from industry experts and master new skills with this comprehensive course.
          </Typography>

          {/* Instructor */}
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              mb: 1,
            }}
          >
            By {course.instructor}
          </Typography>
        </CardContent>
      </Box>

      {/* Card Actions */}
      <CardActions
        sx={{
          p: 2,
          gap: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
        }}
      >
        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {course.isPaid ? (
            <>
              <Typography
                variant="h6"
                sx={{
                  color: '#2563eb',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                }}
              >
                ${course.price}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                99
              </Typography>
            </>
          ) : (
            <Chip
              label="FREE"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                fontWeight: 600,
              }}
            />
          )}
        </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Add to Favorites">
          <IconButton
            size="small"
            onClick={handleFavorite}
            sx={{
              color: isFavorited ? '#ef4444' : '#9ca3af',
              '&:hover': {
                color: isFavorited ? '#ef4444' : '#4b5563',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <Favorite sx={{ fontSize: '18px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bookmark">
          <IconButton
            size="small"
            onClick={handleBookmark}
            sx={{
              color: isBookmarked ? '#2563eb' : '#9ca3af',
              '&:hover': {
                color: isBookmarked ? '#2563eb' : '#4b5563',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <Bookmark sx={{ fontSize: '18px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton
            size="small"
            onClick={handleShare}
            sx={{
              color: '#9ca3af',
              '&:hover': {
                color: '#4b5563',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <Share sx={{ fontSize: '18px' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </CardActions>
    </Card>
  );
};

export default EnhancedCourseCard;
