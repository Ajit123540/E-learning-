import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
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
    { id: 1, title: 'Web Development Bootcamp', instructor: 'Jane Smith', rating: 4.8, students: 1245, price: 99, image: '/images/courses/1.png', category: 'Development', icon: '💻', isPaid: true },
    { id: 2, title: 'Data Science Fundamentals', instructor: 'John Doe', rating: 4.7, students: 987, price: 129, image: '/images/courses/2.png', category: 'Data Science', icon: '📊', isPaid: true },
    { id: 3, title: 'Introduction to JavaScript', instructor: 'Mike Wilson', rating: 4.6, students: 2100, price: 0, image: '/images/courses/3.png', category: 'Programming', icon: '📱', isPaid: false },
    { id: 4, title: 'Advanced JavaScript Programming', instructor: 'David Martinez', rating: 4.9, students: 1850, price: 89, image: '/images/courses/4.png', category: 'Programming', icon: '⚡', isPaid: true },
    { id: 5, title: 'UI/UX Design Basics', instructor: 'Sarah Lee', rating: 4.9, students: 1567, price: 0, image: '/images/courses/5.png', category: 'Design', icon: '🎨', isPaid: false },
    { id: 6, title: 'Digital Marketing Mastery', instructor: 'Alex Johnson', rating: 4.5, students: 3200, price: 79, image: '/images/courses/6.png', category: 'Marketing', icon: '📈', isPaid: true },
    { id: 7, title: 'Python for Beginners', instructor: 'Dr. Emily Chen', rating: 4.8, students: 4500, price: 0, image: '/images/courses/7.png', category: 'Programming', icon: '🤖', isPaid: false },
    { id: 8, title: 'Photography Fundamentals', instructor: 'James Miller', rating: 4.7, students: 890, price: 49, image: '/images/courses/8.png', category: 'Creative', icon: '📸', isPaid: true },
    { id: 9, title: 'Business Communication', instructor: 'Lisa Anderson', rating: 4.4, students: 2100, price: 0, image: '/images/courses/9.png', category: 'Business', icon: '💼', isPaid: false },
  ];

  return (
    <Box sx={{ 
      overflow: 'hidden',
      background: '#0f172a', // Unified deep slate theme
      color: 'white',
      minHeight: '100vh',
    }}>
      
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 8, md: 10 },
          pb: { xs: 10, md: 16 },
          overflow: 'hidden',
        }}
      >
        {/* Intense Background Mesh Gradients */}
        <Box 
          component={motion.div}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          sx={{ position: 'absolute', top: '-10%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}
        />
        <Box 
          component={motion.div}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          sx={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Column - Text */}
            <Grid item xs={12} md={7} lg={7} sx={{ position: 'relative', zIndex: 10 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '650px', mx: { xs: 'auto', md: 0 } }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900, mb: 3,
                    fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                    lineHeight: 1.1, letterSpacing: '-1.5px',
                    background: 'linear-gradient(to right, #ffffff 40%, rgba(255,255,255,0.6) 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}
                >
                  Master Your <Box component="span" sx={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>Future</Box>
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 5, color: 'rgba(255,255,255,0.6)',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.7, fontWeight: 500
                  }}
                >
                  Elevate your career with elite courses taught by world-class industry experts. Learn faster, build smarter, and unlock your potential today.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink} to="/register" variant="contained" size="large"
                    sx={{
                      px: 4, py: 1.8, borderRadius: 3, fontWeight: 800, fontSize: '1.05rem',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                      color: 'white', boxShadow: '0 8px 25px rgba(236, 72, 153, 0.4)',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 30px rgba(236, 72, 153, 0.6)', background: 'linear-gradient(135deg, #6366f1 0%, #f472b6 100%)' },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start Learning Free
                  </Button>
                  <Button
                    component={RouterLink} to="/courses" variant="outlined" size="large"
                    sx={{
                      px: 4, py: 1.8, borderRadius: 3, fontWeight: 700, fontSize: '1.05rem',
                      border: '1px solid rgba(255, 255, 255, 0.2) !important',
                      color: 'white', background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.4)', transform: 'translateY(-2px)' },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Explore Catalog
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Floating UI */}
            <Grid item xs={12} md={5} lg={5} sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', zIndex: 5 }}>
              <Box sx={{ position: 'relative', height: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* Main Floating Card */}
                <Box
                  component={motion.div} animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  sx={{
                    position: 'absolute', top: '15%', right: '5%', width: '380px',
                    background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.6)', overflow: 'hidden', zIndex: 2,
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
                      <Box sx={{ width: 56, height: 56, borderRadius: 3, background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 4px 15px rgba(236, 72, 153, 0.5)' }}>🎨</Box>
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

                {/* Secondary Floating Card */}
                <Box
                  component={motion.div} animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
                  sx={{
                    position: 'absolute', bottom: '15%', left: '0%', width: '300px',
                    background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5,
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)', p: 4, zIndex: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '2.5rem' }}>4.9</Typography>
                    <Box sx={{ display: 'flex', color: '#fbbf24', fontSize: '1.2rem' }}>★★★★★</Box>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.5 }}>Average student rating across 100,000+ reviews globally.</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, position: 'relative' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'white', letterSpacing: '-0.5px' }}>
              Why Choose Us
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}>
              We provide the best learning experience with our comprehensive courses and expert instructors.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid 
                item xs={12} md={4} key={index}
                component={motion.div} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%', display: 'flex', flexDirection: 'column',
                    background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-6px)', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
                  }}
                >
                  <CardContent sx={{ p: 5, flexGrow: 1 }}>
                    <Box sx={{ width: 72, height: 72, borderRadius: 4, background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(236, 72, 153, 0.2))', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, fontSize: '32px' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'white', mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Popular Courses Section */}
      <Box sx={{ py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow */}
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '500px', background: 'radial-gradient(ellipse at center, rgba(79, 70, 229, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'white', letterSpacing: '-0.5px' }}>
              Popular Courses
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.5)', maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}>
              Browse our most highly rated courses and start learning today
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {courses.slice(0, 4).map((course, index) => (
              <Grid item xs={12} sm={6} md={6} lg={6} key={course.id} sx={{ width: '100%', maxWidth: '600px' }}>
                <EnhancedCourseCard course={course} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              variant="outlined" size="large" component={RouterLink} to="/courses"
              sx={{
                px: 5, py: 1.8, borderRadius: 3, fontWeight: 700, fontSize: '1.05rem',
                border: '1px solid rgba(255, 255, 255, 0.2) !important', color: 'white',
                '&:hover': { backgroundColor: 'white', color: '#0f172a', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease',
              }}
            >
              View Full Catalog
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Deep CTA Section */}
      <Box sx={{ py: { xs: 8, md: 16 }, position: 'relative' }}>
        <Container maxWidth="lg">
          <Box
            component={motion.div} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            sx={{
              textAlign: 'center', maxWidth: '800px', mx: 'auto', p: { xs: 4, md: 8 },
              background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 5,
              position: 'relative', overflow: 'hidden'
            }}
          >
            {/* CTA Inner Glow */}
            <Box sx={{ position: 'absolute', top: '0', left: '0', right: '0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5), transparent)' }} />
            
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', md: '3rem' }, letterSpacing: '-0.5px' }}>
              Start Your Journey Today
            </Typography>
            <Typography variant="h5" sx={{ mb: 5, color: 'rgba(255,255,255,0.6)', fontSize: { xs: '1.1rem', md: '1.25rem' }, lineHeight: 1.6, maxWidth: '600px', mx: 'auto' }}>
              Join thousands of forward-thinking students already learning with us. Unlock a universe of knowledge instantly.
            </Typography>
            <Button
              component={RouterLink} to="/register" variant="contained" size="large"
              sx={{
                px: 5, py: 1.8, borderRadius: 3, fontSize: '1.1rem', fontWeight: 800,
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', color: 'white',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.4)',
                '&:hover': { background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)', transform: 'translateY(-2px)', boxShadow: '0 12px 30px rgba(236, 72, 153, 0.6)' },
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