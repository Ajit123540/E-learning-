import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Button,
  TextField,
  Grid,
  Chip,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Pagination,
} from '@mui/material';
import {
  Star,
  ThumbUp,
  ThumbDown,
  Reply,
  Edit,
  Delete,
  FilterList,
  Sort,
  Verified,
} from '@mui/icons-material';

const ReviewSystem = ({ 
  courseId, 
  userId, 
  onReviewSubmit,
  existingReviews = [] 
}) => {
  const [reviews, setReviews] = useState(existingReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [sortBy, setSortBy] = useState('most_recent');
  const [filterBy, setFilterBy] = useState('all');
  const [page, setPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  const reviewsPerPage = 5;

  useEffect(() => {
    loadReviews();
  }, [courseId]);

  const loadReviews = async () => {
    try {
      // Simulate API call
      const mockReviews = [
        {
          id: 1,
          userId: 'user1',
          userName: 'Sarah Johnson',
          userAvatar: 'SJ',
          rating: 5,
          comment: 'Excellent course! The instructor explains concepts very clearly and the hands-on projects were incredibly helpful.',
          date: '2024-01-15',
          helpful: 24,
          notHelpful: 2,
          verified: true,
          courseProgress: 100,
        },
        {
          id: 2,
          userId: 'user2',
          userName: 'Mike Chen',
          userAvatar: 'MC',
          rating: 4,
          comment: 'Great content and well-structured curriculum. Would love to see more advanced topics covered.',
          date: '2024-01-10',
          helpful: 18,
          notHelpful: 1,
          verified: true,
          courseProgress: 85,
        },
        {
          id: 3,
          userId: 'user3',
          userName: 'Emily Davis',
          userAvatar: 'ED',
          rating: 5,
          comment: 'This course exceeded my expectations! The video quality is excellent and the examples are practical.',
          date: '2024-01-05',
          helpful: 31,
          notHelpful: 3,
          verified: false,
          courseProgress: 92,
        },
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      return;
    }

    const review = {
      id: Date.now(),
      userId: userId,
      userName: 'Current User',
      userAvatar: 'CU',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      notHelpful: 0,
      verified: false,
      courseProgress: 0,
    };

    if (editingReview) {
      setReviews(reviews.map(r => r.id === editingReview.id ? { ...review, id: editingReview.id } : r));
      setEditingReview(null);
    } else {
      setReviews([review, ...reviews]);
    }

    setNewReview({ rating: 0, comment: '' });
    setShowReviewDialog(false);
    setSuccessMessage(editingReview ? 'Review updated successfully!' : 'Review submitted successfully!');
    
    setTimeout(() => setSuccessMessage(''), 3000);

    if (onReviewSubmit) {
      onReviewSubmit(review);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({ rating: review.rating, comment: review.comment });
    setShowReviewDialog(true);
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
    setSuccessMessage('Review deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleHelpfulVote = (reviewId, isHelpful) => {
    setReviews(reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          helpful: isHelpful ? r.helpful + 1 : r.helpful,
          notHelpful: !isHelpful ? r.notHelpful + 1 : r.notHelpful,
        };
      }
      return r;
    }));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = [...reviews];

    // Apply filters
    if (filterBy === 'verified') {
      filtered = filtered.filter(r => r.verified);
    } else if (filterBy === '5_star') {
      filtered = filtered.filter(r => r.rating === 5);
    }

    // Apply sorting
    if (sortBy === 'most_recent') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'highest_rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'most_helpful') {
      filtered.sort((a, b) => b.helpful - a.helpful);
    }

    return filtered;
  };

  const paginatedReviews = getFilteredAndSortedReviews().slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  const ratingDistribution = getRatingDistribution();
  const averageRating = getAverageRating();

  return (
    <Box>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Rating Summary */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ color: '#ffd700', fontWeight: 700 }}>
                  {averageRating}
                </Typography>
                <Rating value={parseFloat(averageRating)} precision={0.1} readOnly sx={{ color: '#ffd700' }} />
                <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
                  {reviews.length} Reviews
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Box key={rating} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: 'white', width: 60 }}>
                      {rating} star
                    </Typography>
                    <Box sx={{ flex: 1, mx: 2, height: 8, bgcolor: 'rgba(255, 255, 255, 0.2)', borderRadius: 4 }}>
                      <Box
                        sx={{
                          width: `${reviews.length > 0 ? (ratingDistribution[rating] / reviews.length) * 100 : 0}%`,
                          height: '100%',
                          bgcolor: '#ffd700',
                          borderRadius: 4,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'white', width: 40 }}>
                      {ratingDistribution[rating]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Add Review Button */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={() => setShowReviewDialog(true)}
          sx={{
            background: 'linear-gradient(45deg, #ff006e, #8338ec)',
            fontWeight: 600,
          }}
        >
          Write a Review
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip
            label="Sort: Most Recent"
            onClick={() => setSortBy('most_recent')}
            sx={{
              bgcolor: sortBy === 'most_recent' ? '#3a86ff' : 'transparent',
              color: sortBy === 'most_recent' ? 'white' : '#3a86ff',
              border: '1px solid #3a86ff',
            }}
          />
          <Chip
            label="Filter: All"
            onClick={() => setFilterBy('all')}
            sx={{
              bgcolor: filterBy === 'all' ? '#3a86ff' : 'transparent',
              color: filterBy === 'all' ? 'white' : '#3a86ff',
              border: '1px solid #3a86ff',
            }}
          />
        </Box>
      </Box>

      {/* Reviews List */}
      {paginatedReviews.map((review) => (
        <Card key={review.id} sx={{ mb: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#3a86ff' }}>
                  {review.userAvatar}
                </Avatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {review.userName}
                    </Typography>
                    {review.verified && (
                      <Verified sx={{ fontSize: '20px', color: '#10b981' }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={review.rating} readOnly size="small" sx={{ color: '#ffd700' }} />
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                    {review.courseProgress > 0 && (
                      <Chip
                        label={`${review.courseProgress}% completed`}
                        size="small"
                        sx={{ bgcolor: '#10b981', color: 'white' }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              {review.userId === userId && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleEditReview(review)} size="small">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteReview(review.id)} size="small">
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
              {review.comment}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Was this helpful?
              </Typography>
              <Button
                size="small"
                startIcon={<ThumbUp />}
                onClick={() => handleHelpfulVote(review.id, true)}
                sx={{ color: review.helpful > 0 ? '#10b981' : '#6b7280' }}
              >
                {review.helpful}
              </Button>
              <Button
                size="small"
                startIcon={<ThumbDown />}
                onClick={() => handleHelpfulVote(review.id, false)}
                sx={{ color: review.notHelpful > 0 ? '#ff006e' : '#6b7280' }}
              >
                {review.notHelpful}
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Pagination */}
      {getFilteredAndSortedReviews().length > reviewsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={Math.ceil(getFilteredAndSortedReviews().length / reviewsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#3a86ff',
                '&:hover': {
                  bgcolor: 'rgba(58, 134, 255, 0.1)',
                },
                '&.Mui-selected': {
                  bgcolor: '#3a86ff',
                  color: 'white',
                },
              },
            }}
          />
        </Box>
      )}

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onClose={() => setShowReviewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingReview ? 'Edit Your Review' : 'Write a Review'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              Rating
            </Typography>
            <Rating
              value={newReview.rating}
              onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
              size="large"
              sx={{ color: '#ffd700' }}
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Share your experience with this course..."
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReviewDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={newReview.rating === 0 || !newReview.comment.trim()}
            sx={{
              background: 'linear-gradient(45deg, #ff006e, #8338ec)',
            }}
          >
            {editingReview ? 'Update Review' : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewSystem;
