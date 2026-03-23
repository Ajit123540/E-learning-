import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  alpha,
  Card,
  CardContent,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import EnhancedCourseCard from '../../components/EnhancedCourseCard';

const HomePage = () => {
  useAuth();

  const features = [
    {
      title: 'Learn Anything',
      description: 'Choose from over 100,000 online video courses with new additions published every month.',
      icon: '🎓',
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from industry experts who are passionate about teaching.',
      icon: '👨‍🏫',
    },
    {
      title: 'Lifetime Access',
      description: 'Get lifetime access to the courses you purchase and learn at your own pace.',
      icon: '⏱️',
    },
  ];

  const courses = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      instructor: 'Jane Smith',
      rating: 4.8,
      students: 1245,
      price: 99.99,
      image: 'https://picsum.photos/seed/webdev/400/225.jpg',
      category: 'Development',
      icon: '💻',
      isPaid: true,
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'John Doe',
      rating: 4.7,
      students: 987,
      price: 129.99,
      image: 'https://picsum.photos/seed/datascience/400/225.jpg',
      category: 'Data Science',
      icon: '📊',
      isPaid: true,
    },
    {
      id: 3,
      title: 'Introduction to JavaScript',
      instructor: 'Mike Wilson',
      rating: 4.6,
      students: 2100,
      price: 0,
      image: 'https://picsum.photos/seed/javascript/400/225.jpg',
      category: 'Programming',
      icon: '📱',
      isPaid: false,
    },
    {
      id: 4,
      title: 'Advanced JavaScript Programming',
      instructor: 'David Martinez',
      rating: 4.9,
      students: 1850,
      price: 89.99,
      image: '/images/advanced-javascript-book.jpg',
      category: 'Programming',
      icon: '⚡',
      isPaid: true,
    },
    {
      id: 5,
      title: 'UI/UX Design Basics',
      instructor: 'Sarah Lee',
      rating: 4.9,
      students: 1567,
      price: 0,
      image: 'https://picsum.photos/seed/uidesign/400/225.jpg',
      category: 'Design',
      icon: '🎨',
      isPaid: false,
    },
    {
      id: 6,
      title: 'Digital Marketing Mastery',
      instructor: 'Alex Johnson',
      rating: 4.5,
      students: 3200,
      price: 79.99,
      image: 'https://picsum.photos/seed/marketing/400/225.jpg',
      category: 'Marketing',
      icon: '📈',
      isPaid: true,
    },
    {
      id: 7,
      title: 'Python for Beginners',
      instructor: 'Dr. Emily Chen',
      rating: 4.8,
      students: 4500,
      price: 0,
      image: 'https://picsum.photos/seed/python/400/225.jpg',
      category: 'Programming',
      icon: '🤖',
      isPaid: false,
    },
    {
      id: 8,
      title: 'Photography Fundamentals',
      instructor: 'James Miller',
      rating: 4.7,
      students: 890,
      price: 49.99,
      image: 'https://picsum.photos/seed/photography/400/225.jpg',
      category: 'Creative',
      icon: '📸',
      isPaid: true,
    },
    {
      id: 9,
      title: 'Business Communication',
      instructor: 'Lisa Anderson',
      rating: 4.4,
      students: 2100,
      price: 0,
      image: 'https://picsum.photos/seed/business/400/225.jpg',
      category: 'Business',
      icon: '💼',
      isPaid: false,
    },
  ];

  return (
    <Box sx={{ 
      overflow: 'hidden',
      background: '#ffffff',
      minHeight: '100vh',
    }}>
      
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: 'white',
          pt: { xs: 10, md: 16 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.2rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              Learn New Skills Online
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                lineHeight: 1.5
              }}
            >
              Discover thousands of courses taught by industry experts
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: '#ffffff',
                  color: '#2563eb',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    background: '#f3f4f6',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/courses"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Browse Courses
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
        <Box>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: '#1a1a2e',
              }}
            >
              Why Choose Us
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ 
                color: '#6b7280', 
                maxWidth: '700px', 
                mx: 'auto',
                fontSize: '1.1rem'
              }}
            >
              We provide the best learning experience with our comprehensive courses and expert instructors.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      background: '#ffffff',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, flexGrow: 1 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          bgcolor: alpha('#2563eb', 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          '& > *': {
                            fontSize: '28px',
                          },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 700,
                          color: '#1a1a2e',
                          mb: 2
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#6b7280',
                          lineHeight: 1.7,
                          fontSize: '1.05rem'
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Popular Courses Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        background: '#f9fafb',
      }}>
        <Container maxWidth="lg">
          <Box>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  color: '#1a1a2e',
                }}
              >
                Popular Courses
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#6b7280',
                  maxWidth: '700px', 
                  mx: 'auto',
                  fontSize: '1.1rem'
                }}
              >
                Browse our most popular courses and start learning today
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {courses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                  <EnhancedCourseCard course={course} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/courses"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  borderWidth: 2,
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View All Courses
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
      }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                lineHeight: 1.3,
              }}
            >
              Start Your Learning Journey Today
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Join thousands of students already learning with us. Start your learning journey today!
            </Typography>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                background: '#ffffff',
                color: '#2563eb',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  background: '#f3f4f6',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started for Free
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;