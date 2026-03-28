import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayArrow, Star, People, AccessTime, MenuBook, WorkspacePremium, CheckCircle } from '@mui/icons-material';
import VideoPlayer from '../../components/VideoPlayer';
import ProgressTracker from '../../components/ProgressTracker';
import ReviewSystem from '../../components/ReviewSystem';
import PaymentGateway from '../../components/PaymentGateway';
import CertificateGenerator from '../../components/CertificateGenerator';
import DiscussionBoard from '../../components/DiscussionBoard';
import StudyWhiteboard from '../../components/StudyWhiteboard';

// Reusable animated gradient background for the Hero section
const AmbientBackground = () => (
  <>
    <Box 
      component={motion.div} animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.8) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}
    />
    <Box 
      component={motion.div} animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 60%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}
    />
  </>
);

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [userProgress, setUserProgress] = useState(0);

  // Mock user data
  const currentUser = { id: 'user123', name: 'John Doe', email: 'john@example.com' };
  
  // Generic fallback lessons to ensure the "Content" tab works for ANY course.
  const genericLessons = [
    { id: 'gen1', title: 'Course Introduction & Overview', type: 'video', duration: '15 min', description: 'Welcome to the course' },
    { id: 'gen2', title: 'Core Fundamentals', type: 'video', duration: '45 min', description: 'Deep dive into the core concepts' },
    { id: 'gen3', title: 'Practical Application', type: 'video', duration: '60 min', description: 'Applying what we have learned' },
    { id: 'gen4', title: 'Mid-term Quiz', type: 'quiz', duration: '30 min', description: 'Test your understanding' },
    { id: 'gen5', title: 'Advanced Techniques', type: 'video', duration: '90 min', description: 'Taking your skills to the next level' },
    { id: 'gen6', title: 'Final Project', type: 'assignment', duration: '3 hours', description: 'Comprehensive capstone project' },
  ];

  const courseData = {
    1: { id: 1, title: 'Web Development Bootcamp', instructor: 'Jane Smith', rating: 4.8, students: 1245, price: 99.99, category: 'Development', icon: '💻', description: 'Learn modern web development from scratch with this comprehensive bootcamp. Master HTML, CSS, JavaScript, React, Node.js and more.', duration: '42 hours', lectures: 156, level: 'Beginner', isPaid: true, certificateType: 'paid', certificatePrice: 29.99, whatYouLearn: ['Build responsive websites with HTML5 and CSS3', 'Master JavaScript ES6+ features', 'Create interactive React applications', 'Build RESTful APIs with Node.js', 'Deploy applications to production', 'Version control with Git'], instructorBio: 'Jane Smith is a senior web developer with over 10 years of experience.' },
    2: { id: 2, title: 'Data Science Fundamentals', instructor: 'John Doe', rating: 4.7, students: 987, price: 129.99, category: 'Data Science', icon: '📊', description: 'Dive into the world of data science with this comprehensive course covering Python, statistics, machine learning, and data visualization.', duration: '56 hours', lectures: 203, level: 'Intermediate', isPaid: true, certificateType: 'premium', certificatePrice: 49.99, whatYouLearn: ['Python programming for data science', 'Statistical analysis and hypothesis testing', 'Machine learning algorithms', 'Data visualization with matplotlib and seaborn'] },
    3: { id: 3, title: 'Introduction to JavaScript', instructor: 'Mike Wilson', price: 0, isPaid: false, category: 'Programming', icon: '📱' },
    4: { id: 4, title: 'Advanced JavaScript Programming', instructor: 'David Martinez', price: 89.99, isPaid: true, category: 'Programming', icon: '⚡' },
    5: { id: 5, title: 'UI/UX Design Basics', instructor: 'Sarah Lee', price: 0, isPaid: false, category: 'Design', icon: '🎨' },
    6: { id: 6, title: 'Digital Marketing Mastery', instructor: 'Alex Johnson', price: 79.99, isPaid: true, category: 'Marketing', icon: '📈' },
    7: { id: 7, title: 'Python for Beginners', instructor: 'Dr. Emily Chen', price: 0, isPaid: false, category: 'Programming', icon: '🤖' },
    8: { id: 8, title: 'Photography Fundamentals', instructor: 'James Miller', price: 49.99, isPaid: true, category: 'Creative', icon: '📸' },
    9: { id: 9, title: 'Business Communication', instructor: 'Lisa Anderson', price: 0, isPaid: false, category: 'Business', icon: '💼' }
  };

  const course = courseData[courseId] ? { ...courseData[1], ...courseData[courseId] } : { ...courseData[1], id: parseInt(courseId), title: 'Premium E-Learning Course' };
  
  // Ensure lessons exist so ProgressTracker doesn't crash
  if (!course.lessons) course.lessons = genericLessons;
  if (!course.whatYouLearn) course.whatYouLearn = ['Master industry best practices', 'Build a professional portfolio', 'Gain practical, real-world skills', 'Join our exclusive alumni network'];
  if (!course.instructorBio) course.instructorBio = 'A renowned industry expert passionate about changing lives through education.';

  const courseVideos = {
    1: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
    2: 'https://www.youtube.com/watch?v=-ETQ97mXXF0',
  };
  const videoUrl = courseVideos[course.id] || 'https://www.youtube.com/watch?v=W6NZfCO5SIk';

  // Smooth scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [courseId]);

  const handleEnroll = () => {
    if (course.isPaid) setShowPaymentDialog(true);
    else { setIsEnrolled(true); setActiveTab(1); }
  };

  const handlePaymentSuccess = () => {
    setIsEnrolled(true);
    setShowPaymentDialog(false);
    setActiveTab(1);
  };

  const handleCertificatePurchase = () => {
    if (course.certificateType === 'free') setShowCertificateDialog(true);
    else setShowPaymentDialog(true);
  };

  const handleProgressUpdate = (data) => {
    setUserProgress(data.progress);
    if (data.progress >= 100) setShowCertificateDialog(true);
  };

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', pb: { xs: 8, md: 12 } }}>
      
      {/* Hyper Premium Hero Section */}
      <Box sx={{ position: 'relative', bgcolor: '#0f172a', pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 }, overflow: 'hidden' }}>
        <AmbientBackground />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                  <Chip label={course.category} sx={{ bgcolor: 'rgba(79, 70, 229, 0.2)', color: '#818cf8', fontWeight: 700, borderRadius: 2 }} />
                  <Chip label={course.level || 'All Levels'} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: 'white', fontWeight: 600, borderRadius: 2 }} />
                </Box>
                
                <Typography variant="h2" sx={{ color: 'white', fontWeight: 900, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.2, letterSpacing: '-1px' }}>
                  {course.title}
                </Typography>
                
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, mb: 4, lineHeight: 1.6, maxWidth: '600px' }}>
                  {course.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 3, md: 5 }, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ color: '#fbbf24' }} />
                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{course.rating}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>(1.2k Reviews)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>{course.students.toLocaleString()} Students</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#4f46e5', fontSize: '14px', fontWeight: 700 }}>
                      {course.instructor.charAt(0)}
                    </Avatar>
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>By {course.instructor}</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content Layout */}
      <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -10 }, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={4}>
          
          {/* Left Column - Tabs and Data */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', mb: 4, overflow: 'hidden', border: 'none' }}>
              <Box sx={{ borderBottom: 1, borderColor: '#f3f4f6', bgcolor: 'white' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    px: 1,
                    '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0', background: 'linear-gradient(90deg, #4f46e5, #ec4899)' },
                    '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '1.05rem', minWidth: 120, py: 3, color: '#6b7280', '&.Mui-selected': { color: '#0f172a' } }
                  }}
                >
                  <Tab label="Overview" disableRipple />
                  <Tab label="Course Content" disabled={!isEnrolled} disableRipple />
                  <Tab label="Q&A & Reviews" disableRipple />
                  <Tab label="Scratchpad" disabled={!isEnrolled} disableRipple />
                  <Tab label="Certificate" disabled={userProgress < 100} disableRipple />
                </Tabs>
              </Box>

              <CardContent sx={{ p: { xs: 3, md: 5 }, bgcolor: 'white' }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    
                    {/* Overview Tab */}
                    {activeTab === 0 && (
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>What You'll Learn</Typography>
                        <Grid container spacing={2} sx={{ mb: 6 }}>
                          {course.whatYouLearn.map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 2, bgcolor: '#f9fafb', borderRadius: 3, height: '100%' }}>
                                <CheckCircle sx={{ color: '#10b981', mr: 2, mt: 0.2 }} />
                                <Typography variant="body1" sx={{ color: '#374151', fontWeight: 500 }}>{item}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>

                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>Course Preview</Typography>
                        <Box sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', mb: 6 }}>
                          <VideoPlayer videoUrl={videoUrl} title="Course Preview" />
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: '#0f172a' }}>Requirements</Typography>
                        <ul style={{ paddingLeft: '20px', color: '#4b5563', marginBottom: '40px', lineHeight: '1.8' }}>
                          <li>No prior experience required. We will teach you everything from scratch.</li>
                          <li>A computer (Windows/Mac/Linux) with an internet connection.</li>
                          <li>A willingness to learn and practice daily.</li>
                        </ul>
                      </Box>
                    )}

                    {/* Content Tab */}
                    {activeTab === 1 && isEnrolled && (
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>Course Content</Typography>
                        <ProgressTracker courseId={course.id} userId={currentUser.id} onProgressUpdate={handleProgressUpdate} courseData={course} />
                      </Box>
                    )}

                    {/* Community Tab (Q&A & Reviews) */}
                    {activeTab === 2 && (
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>Course Community</Typography>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>Ask questions, help peers, and read reviews.</Typography>
                        
                        <DiscussionBoard courseId={course.id} currentUser={currentUser} />
                        
                        <Divider sx={{ my: 6 }} />
                        
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>Student Reviews</Typography>
                        <ReviewSystem courseId={course.id} userId={currentUser.id} />
                      </Box>
                    )}

                    {/* Scratchpad Tab */}
                    {activeTab === 3 && isEnrolled && (
                      <Box>
                        <StudyWhiteboard />
                      </Box>
                    )}

                    {/* Certificate Tab */}
                    {activeTab === 4 && userProgress >= 100 && (
                      <Box>
                        <CertificateGenerator course={course} user={currentUser} completionDate={new Date().toLocaleDateString()} isVisible={true} onClose={() => setActiveTab(0)} />
                      </Box>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Premium Sticky Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 100, borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', border: 'none', overflow: 'hidden' }}>
              <Box sx={{ p: 4, bgcolor: 'white' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 3 }}>
                  {course.isPaid ? `₹${course.price.toFixed(2)}` : 'FREE'}
                </Typography>
                
                {!isEnrolled ? (
                  <Box>
                    <Button
                      fullWidth variant="contained" size="large" onClick={handleEnroll}
                      sx={{ py: 2, background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)', fontWeight: 800, fontSize: '1.1rem', borderRadius: 3, boxShadow: '0 10px 25px rgba(236, 72, 153, 0.4)', '&:hover': { background: 'linear-gradient(135deg, #4338ca 0%, #db2777 100%)', boxShadow: '0 15px 35px rgba(236, 72, 153, 0.5)', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease', mb: 2 }}
                    >
                      {course.isPaid ? 'Enroll Now' : 'Start Learning - Free'}
                    </Button>
                    <Typography variant="body2" sx={{ color: '#6b7280', textAlign: 'center', fontWeight: 500, mb: 4 }}>
                      Full Lifetime Access • 30-Day Money-Back Guarantee
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, p: 2, bgcolor: '#f0fdf4', borderRadius: 3, color: '#166534' }}>
                      <CheckCircle />
                      <Typography sx={{ fontWeight: 700 }}>You are enrolled in this course.</Typography>
                    </Box>
                    {userProgress > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#374151' }}>Course Progress</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: '#10b981' }}>{Math.round(userProgress)}%</Typography>
                        </Box>
                        <Box sx={{ height: 10, bgcolor: '#e5e7eb', borderRadius: 5, overflow: 'hidden' }}>
                          <Box sx={{ width: `${userProgress}%`, height: '100%', background: 'linear-gradient(90deg, #34d399, #10b981)', borderRadius: 5 }} />
                        </Box>
                      </Box>
                    )}
                    <Button fullWidth variant="outlined" size="large" onClick={() => setActiveTab(1)} sx={{ py: 1.5, borderColor: '#e5e7eb', color: '#374151', fontWeight: 700, borderRadius: 3, '&:hover': { borderColor: '#4f46e5', color: '#4f46e5', bgcolor: 'rgba(79, 70, 229, 0.05)' } }}>
                      Continue Learning
                    </Button>
                  </Box>
                )}

                <Divider sx={{ mb: 3 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>This course includes:</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#4b5563' }}><AccessTime sx={{ color: '#4f46e5' }} /> <Typography sx={{ fontWeight: 500 }}>{course.duration} on-demand video</Typography></Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#4b5563' }}><MenuBook sx={{ color: '#4f46e5' }} /> <Typography sx={{ fontWeight: 500 }}>{course.lectures} comprehensive lessons</Typography></Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#4b5563' }}><PlayArrow sx={{ color: '#4f46e5' }} /> <Typography sx={{ fontWeight: 500 }}>Full lifetime access</Typography></Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#4b5563' }}><WorkspacePremium sx={{ color: '#4f46e5' }} /> <Typography sx={{ fontWeight: 500 }}>Certificate of completion</Typography></Box>
                </Box>

                {isEnrolled && userProgress >= 100 && (
                  <Box sx={{ mt: 4 }}>
                    <Button fullWidth variant="contained" size="large" onClick={handleCertificatePurchase} sx={{ py: 1.5, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', fontWeight: 800, borderRadius: 3, boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)' }}>
                      Claim Your Certificate
                    </Button>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Modals */}
      <PaymentGateway course={course} isVisible={showPaymentDialog} onCancel={() => setShowPaymentDialog(false)} onPaymentSuccess={handlePaymentSuccess} amount={course.price} />
      <CertificateGenerator course={course} user={currentUser} completionDate={new Date().toLocaleDateString()} isVisible={showCertificateDialog} onClose={() => setShowCertificateDialog(false)} onCertificateGenerated={(data) => console.log('Certificate generated:', data)} />
    </Box>
  );
};

export default CourseDetailPage;
