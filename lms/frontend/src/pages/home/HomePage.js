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
import { motion } from 'framer-motion';
import { useAuth } from '../../store/AuthContext';
import EnhancedCourseCard from '../../components/EnhancedCourseCard';
import AIAssistant from '../../components/AIAssistant';

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
      image: '/images/courses/1.png',
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
      image: '/images/courses/2.png',
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
      image: '/images/courses/3.png',
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
      image: '/images/courses/4.png',
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
      image: '/images/courses/5.png',
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
      image: '/images/courses/6.png',
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
      image: '/images/courses/7.png',
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
      image: '/images/courses/8.png',
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
      image: '/images/courses/9.png',
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
          background: 'linear-gradient(135deg, #0f172a 0%, #171717 100%)', // Sleek dark aesthetic
          color: 'white',
          pt: { xs: 12, md: 24 },
          pb: { xs: 10, md: 20 },
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Background Mesh Gradients */}
        <Box 
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Column - Text */}
            <Grid item xs={12} md={6}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  maxWidth: '650px',
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '3rem', md: '4.5rem', lg: '5rem' },
                    lineHeight: 1.1,
                    letterSpacing: '-1.5px',
                    background: 'linear-gradient(to right, #ffffff 30%, rgba(255,255,255,0.7) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Master Your <Box component="span" sx={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Future</Box>
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 5, 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.7,
                    fontWeight: 500
                  }}
                >
                  Elevate your career with elite courses taught by world-class industry experts. Learn faster, build smarter, and unlock your potential today.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.8,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                      color: 'white',
                      boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 28px rgba(79, 70, 229, 0.6)',
                        background: 'linear-gradient(135deg, #6366f1 0%, #f472b6 100%)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start Learning Free
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/courses"
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.8,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      borderWidth: '2px !important',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Explore Catalog
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Floating UI */}
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '500px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Floating Card 1 - Main Course */}
                <Box
                  component={motion.div}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  sx={{
                    position: 'absolute',
                    top: '15%',
                    right: '15%',
                    width: '340px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                      <Box sx={{ width: 56, height: 56, borderRadius: 3, background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🎨</Box>
                      <Box>
                        <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>UI/UX Masterclass</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500 }}>By Sarah Lee</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ height: 6, width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 4, mb: 1.5 }}>
                      <Box sx={{ height: '100%', width: '70%', background: 'linear-gradient(90deg, #a855f7, #ec4899)', borderRadius: 4, boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)' }} />
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textAlign: 'right', fontWeight: 600 }}>70% Complete</Typography>
                  </Box>
                </Box>

                {/* Floating Card 2 - Stats */}
                <Box
                  component={motion.div}
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
                  sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '280px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                    p: 4,
                    zIndex: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '2rem' }}>4.9</Typography>
                    <Box sx={{ display: 'flex', color: '#fbbf24', fontSize: '1.2rem' }}>★★★★★</Box>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.5 }}>Average student rating across 100,000+ reviews globally.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
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
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index}
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
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
                          width: 72,
                          height: 72,
                          borderRadius: '20px',
                          bgcolor: alpha('#4f46e5', 0.1),
                          color: '#4f46e5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          boxShadow: 'inset 0 0 0 1px rgba(79, 70, 229, 0.2)',
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

            <Grid container spacing={4} direction="column" alignItems="center">
              {courses.map((course, index) => (
                <Grid item xs={12} sm={6} md={8} lg={6} key={course.id} sx={{ width: '100%', maxWidth: '600px' }}>
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
        py: { xs: 8, md: 14 },
        background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
        color: 'white',
      }}>
        <Container maxWidth="lg">
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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

      {/* Floating AI Assistant */}
      <AIAssistant />
    </Box>
  );
};

export default HomePage;