import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Favorite,
  Share,
  Bookmark,
  People,
} from '@mui/icons-material';

const EnhancedCourseCard = ({ course }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleCardClick = (e) => {
    e.preventDefault();
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
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2), 0 10px 20px rgba(236, 72, 153, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
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
          backgroundColor: '#0f172a',
        }}
      >
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85,
            transition: 'opacity 0.3s ease',
          }}
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/course-${course.id}/400/225.jpg`;
          }}
        />
        
        {/* Deep Gradient Overlay to blend image into the dark card */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
          }}
        />

        {/* Category Badge */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
          <Chip
            label={course.category}
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.75rem',
              px: 1,
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            }}
          />
        </Box>
      </Box>

      {/* Course Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ p: 3, flexGrow: 1, color: 'white' }}>
          {/* Icon and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(236, 72, 153, 0.2))',
                border: '1px solid rgba(255,255,255,0.1)',
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
                fontWeight: 800,
                fontSize: '1.15rem',
                lineHeight: 1.3,
                color: 'white',
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
                sx={{ '& .MuiRating-icon': { color: '#fbbf24' } }}
              />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 600 }}>
                {course.rating}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <People sx={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                {course.students}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              mb: 2,
              fontSize: '0.9rem',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            Learn from industry experts and master new skills with this comprehensive course.
          </Typography>

          {/* Instructor */}
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
            By <Box component="span" sx={{ color: 'rgba(255,255,255,0.8)' }}>{course.instructor}</Box>
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
          background: 'rgba(0,0,0,0.2)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {course.isPaid ? (
            <Typography variant="h6" sx={{ color: '#c084fc', fontWeight: 800, fontSize: '1.25rem' }}>
              ₹{course.price}
              <Box component="span" sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', ml: 0.5 }}>.99</Box>
            </Typography>
          ) : (
            <Chip
              label="FREE"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
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
              sx={{ color: isFavorited ? '#ef4444' : 'rgba(255,255,255,0.4)', '&:hover': { color: isFavorited ? '#ef4444' : 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <Favorite sx={{ fontSize: '18px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bookmark">
            <IconButton
              size="small"
              onClick={handleBookmark}
              sx={{ color: isBookmarked ? '#a855f7' : 'rgba(255,255,255,0.4)', '&:hover': { color: isBookmarked ? '#a855f7' : 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <Bookmark sx={{ fontSize: '18px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton
              size="small"
              onClick={handleShare}
              sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
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
