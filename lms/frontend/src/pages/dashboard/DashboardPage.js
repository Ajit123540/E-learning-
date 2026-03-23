import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import {
  School,
  TrendingUp,
  AccessTime,
  Star,
  PlayArrow,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../store/AuthContext';
import { courseService } from '../../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await courseService.getAllCourses();
        if (user && user.enrolledCourses) {
          const userCourses = data.filter(course => user.enrolledCourses.includes(course.id || course._id));
          setCourses(userCourses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error('Failed to fetch user courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const stats = {
    coursesEnrolled: courses.length,
    coursesCompleted: 0, // Mock for now
    totalHours: courses.length * 5, // Mock estimate
    certificates: 0,
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa', py: 4 }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 4 }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: '#1a1a2e',
            }}
          >
            Welcome back, {user?.name || 'Student'}! 👋
          </Typography>
          <Typography variant="h6" sx={{ color: '#6b7280' }}>
            Continue your learning journey and track your progress
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid 
            item xs={12} sm={6} md={3}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                color: 'white',
                borderRadius: 5,
                boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 56,
                  height: 56,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <School />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {stats.coursesEnrolled}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>Courses Enrolled</Typography>
            </Card>
          </Grid>

          <Grid 
            item xs={12} sm={6} md={3}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                borderRadius: 5,
                boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 56,
                  height: 56,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <TrendingUp />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {stats.coursesCompleted}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>Courses Completed</Typography>
            </Card>
          </Grid>

          <Grid 
            item xs={12} sm={6} md={3}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                borderRadius: 5,
                boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.3)',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 56,
                  height: 56,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <AccessTime />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {stats.totalHours}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>Learning Hours</Typography>
            </Card>
          </Grid>

          <Grid 
            item xs={12} sm={6} md={3}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card
              sx={{
                p: 3,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                borderRadius: 5,
                boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 56,
                  height: 56,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Star />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                {stats.certificates}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>Certificates Earned</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Courses */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: '#1a1a2e',
            }}
          >
            Continue Learning
          </Typography>

          {courses.length === 0 ? (
            <Box 
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{ textAlign: 'center', p: 4, bgcolor: 'white', borderRadius: 4, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
            >
              <Typography variant="body1" sx={{ color: '#6b7280', mb: 2 }}>You are not enrolled in any courses yet.</Typography>
              <Button variant="contained" onClick={() => navigate('/courses')}>
                Browse Courses
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {courses.map((course, index) => (
                <Grid 
                  item xs={12} sm={6} md={4} key={course.id || course._id}
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 140,
                        background: `url(${course.imageUrl || `/images/courses/${course.id || 1}.png`})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                    >
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: '#1a1a2e',
                          lineHeight: 1.3,
                        }}
                      >
                        {course.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: '#6b7280', mb: 2 }}
                      >
                        By {course.instructor?.name || 'Instructor'} • Course
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Progress
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {0}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(79, 70, 229, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(90deg, #4f46e5 0%, #ec4899 100%)',
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={() => navigate(`/courses/${course.id || course._id}`)}
                        sx={{
                          py: 1.2,
                          background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #3730a3 0%, #be185d 100%)',
                            boxShadow: '0 8px 16px rgba(79, 70, 229, 0.3)',
                          },
                        }}
                      >
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Quick Actions */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/courses')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              borderWidth: 2,
              borderColor: '#2563eb',
              color: '#2563eb',
              '&:hover': {
                borderWidth: 2,
                backgroundColor: '#2563eb',
                color: '#ffffff',
              },
            }}
          >
            Explore More Courses
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
