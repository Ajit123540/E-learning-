import React, { useState } from 'react';
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
  Dialog,
} from '@mui/material';
import VideoPlayer from '../../components/VideoPlayer';
import ProgressTracker from '../../components/ProgressTracker';
import ReviewSystem from '../../components/ReviewSystem';
import PaymentGateway from '../../components/PaymentGateway';
import CertificateGenerator from '../../components/CertificateGenerator';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [userProgress, setUserProgress] = useState(0);

  // Mock user data
  const currentUser = {
    id: 'user123',
    name: 'John Doe',
    email: 'john@example.com',
  };
  
  // Mock course data
  const courseData = {
    1: {
      id: 1,
      title: 'Web Development Bootcamp',
      instructor: 'Jane Smith',
      rating: 4.8,
      students: 1245,
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      category: 'Development',
      icon: '💻',
      description: 'Learn modern web development from scratch with this comprehensive bootcamp. Master HTML, CSS, JavaScript, React, Node.js and more.',
      duration: '42 hours',
      lectures: 156,
      level: 'Beginner',
      whatYouLearn: [
        'Build responsive websites with HTML5 and CSS3',
        'Master JavaScript ES6+ features',
        'Create interactive React applications',
        'Build RESTful APIs with Node.js',
        'Deploy applications to production',
        'Version control with Git'
      ],
      instructorBio: 'Jane Smith is a senior web developer with over 10 years of experience.',
      isPaid: true,
      certificateType: 'paid', // 'free', 'paid', 'premium'
      certificatePrice: 29.99,
    },
    2: {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'John Doe',
      rating: 4.7,
      students: 987,
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      category: 'Data Science',
      icon: '📊',
      description: 'Dive into the world of data science with this comprehensive course covering Python, statistics, machine learning, and data visualization.',
      duration: '56 hours',
      lectures: 203,
      level: 'Intermediate',
      whatYouLearn: [
        'Python programming for data science',
        'Statistical analysis and hypothesis testing',
        'Machine learning algorithms',
        'Data visualization with matplotlib and seaborn'
      ],
      instructorBio: 'John Doe is a data scientist with 8 years of experience.',
      isPaid: true,
      certificateType: 'premium',
      certificatePrice: 49.99,
      lessons: [
        { id: 'ds1', title: 'Introduction to Data Science', type: 'video', duration: '45 min', description: 'Overview of data science field' },
        { id: 'ds2', title: 'Python Basics', type: 'video', duration: '60 min', description: 'Python programming fundamentals' },
        { id: 'ds3', title: 'NumPy and Pandas', type: 'video', duration: '90 min', description: 'Data manipulation libraries' },
        { id: 'ds4', title: 'Data Visualization Quiz', type: 'quiz', duration: '30 min', description: 'Test your visualization skills' },
        { id: 'ds5', title: 'Final Project', type: 'assignment', duration: '3 hours', description: 'Complete data analysis project' },
      ]
    },
    3: {
      id: 3,
      title: 'Introduction to JavaScript',
      instructor: 'Mike Wilson',
      rating: 4.6,
      students: 2100,
      price: 0,
      image: 'https://images.unsplash.com/photo-1627398242455-2aedc1b31a43?w=800&h=400&fit=crop',
      category: 'Programming',
      icon: '📱',
      description: 'Start your programming journey with JavaScript. Learn the fundamentals and build interactive web applications.',
      duration: '24 hours',
      lectures: 89,
      level: 'Beginner',
      whatYouLearn: [
        'JavaScript syntax and fundamentals',
        'DOM manipulation and events',
        'Functions and scope',
        'Arrays and objects',
        'Basic ES6 features',
        'Debugging techniques'
      ],
      instructorBio: 'Mike Wilson is a JavaScript enthusiast with 8 years of teaching experience.',
      isPaid: false,
      certificateType: 'free',
      certificatePrice: 0,
    },
    4: {
      id: 4,
      title: 'Advanced JavaScript Programming',
      instructor: 'David Martinez',
      rating: 4.9,
      students: 1850,
      price: 89.99,
      image: '/images/advanced-javascript-book.jpg',
      category: 'Programming',
      icon: '⚡',
      description: 'Master advanced JavaScript concepts including async programming, design patterns, performance optimization, and modern frameworks.',
      duration: '36 hours',
      lectures: 142,
      level: 'Advanced',
      whatYouLearn: [
        'Advanced ES6+ features and syntax',
        'Asynchronous programming with Promises and Async/Await',
        'Design patterns and architectural concepts',
        'Performance optimization techniques',
        'Modern JavaScript frameworks (React, Vue, Angular)',
        'Testing and debugging advanced applications'
      ],
      instructorBio: 'David Martinez is a senior JavaScript architect with 12+ years of experience building scalable web applications.',
      isPaid: true,
      certificateType: 'premium',
      certificatePrice: 39.99,
      lessons: [
        { id: 'js1', title: 'Advanced ES6+ Features', type: 'video', duration: '45 min', description: 'Deep dive into modern JavaScript syntax' },
        { id: 'js2', title: 'Async Programming Mastery', type: 'video', duration: '60 min', description: 'Promises, Async/Await, and event loops' },
        { id: 'js3', title: 'Design Patterns', type: 'video', duration: '90 min', description: 'Common JavaScript design patterns' },
        { id: 'js4', title: 'Performance Optimization', type: 'video', duration: '75 min', description: 'Tips and tricks for fast JavaScript' },
        { id: 'js5', title: 'Framework Integration', type: 'video', duration: '120 min', description: 'Working with React, Vue, and Angular' },
        { id: 'js6', title: 'Testing JavaScript', type: 'video', duration: '60 min', description: 'Unit testing and integration testing' },
        { id: 'js7', title: 'Advanced Project', type: 'assignment', duration: '8 hours', description: 'Build a complete JavaScript application' },
        { id: 'js8', title: 'Final Assessment', type: 'quiz', duration: '90 min', description: 'Test your advanced JavaScript knowledge' },
      ]
    },
    5: {
      id: 5,
      title: 'UI/UX Design Basics',
      instructor: 'Sarah Lee',
      rating: 4.9,
      students: 1567,
      price: 0,
      image: 'https://images.unsplash.com/photo-1559028012-72e757e1e447?w=800&h=400&fit=crop',
      category: 'Design',
      icon: '🎨',
      description: 'Learn the principles of user interface and user experience design. Create beautiful and functional designs.',
      duration: '18 hours',
      lectures: 67,
      level: 'Beginner',
      whatYouLearn: [
        'Design principles and theory',
        'Color theory and typography',
        'Wireframing and prototyping',
        'User research methods',
        'Design tools and software',
        'Portfolio building'
      ],
      instructorBio: 'Sarah Lee is a professional designer with experience at top tech companies.',
      isPaid: false,
      certificateType: 'free',
      certificatePrice: 0,
    },
    6: {
      id: 6,
      title: 'Digital Marketing Mastery',
      instructor: 'Alex Johnson',
      rating: 4.5,
      students: 3200,
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      category: 'Marketing',
      icon: '📈',
      description: 'Master digital marketing strategies including SEO, social media, content marketing, and analytics.',
      duration: '35 hours',
      lectures: 145,
      level: 'Intermediate',
      whatYouLearn: [
        'SEO and SEM strategies',
        'Social media marketing',
        'Content creation and strategy',
        'Email marketing campaigns',
        'Google Analytics',
        'Marketing automation'
      ],
      instructorBio: 'Alex Johnson is a digital marketing expert with 10+ years of experience.',
      isPaid: true,
      certificateType: 'paid',
      certificatePrice: 19.99,
    },
    7: {
      id: 7,
      title: 'Python for Beginners',
      instructor: 'Dr. Emily Chen',
      rating: 4.8,
      students: 4500,
      price: 0,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
      category: 'Programming',
      icon: '🤖',
      description: 'Start your Python journey from scratch. Learn programming fundamentals with hands-on projects.',
      duration: '30 hours',
      lectures: 120,
      level: 'Beginner',
      whatYouLearn: [
        'Python syntax and basics',
        'Data types and variables',
        'Control flow and functions',
        'Object-oriented programming',
        'File handling and modules',
        'Error handling and debugging'
      ],
      instructorBio: 'Dr. Emily Chen is a computer science professor and Python expert.',
      isPaid: false,
      certificateType: 'free',
      certificatePrice: 0,
    },
    8: {
      id: 8,
      title: 'Photography Fundamentals',
      instructor: 'James Miller',
      rating: 4.7,
      students: 890,
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1542038784456-667383e48756?w=800&h=400&fit=crop',
      category: 'Creative',
      icon: '📸',
      description: 'Master the art of photography. Learn composition, lighting, and post-processing techniques.',
      duration: '22 hours',
      lectures: 95,
      level: 'Beginner',
      whatYouLearn: [
        'Camera basics and settings',
        'Composition and framing',
        'Lighting techniques',
        'Portrait photography',
        'Landscape photography',
        'Photo editing basics'
      ],
      instructorBio: 'James Miller is a professional photographer with 15+ years of experience.',
      isPaid: true,
      certificateType: 'paid',
      certificatePrice: 14.99,
    },
    9: {
      id: 9,
      title: 'Business Communication',
      instructor: 'Lisa Anderson',
      rating: 4.4,
      students: 2100,
      price: 0,
      image: 'https://images.unsplash.com/photo-1504384308090-c8940c2a9aab?w=800&h=400&fit=crop',
      category: 'Business',
      icon: '💼',
      description: 'Improve your professional communication skills. Learn to write emails, presentations, and communicate effectively.',
      duration: '15 hours',
      lectures: 58,
      level: 'Beginner',
      whatYouLearn: [
        'Professional email writing',
        'Presentation skills',
        'Meeting etiquette',
        'Business writing',
        'Public speaking basics',
        'Cross-cultural communication'
      ],
      instructorBio: 'Lisa Anderson is a corporate trainer with 12+ years of experience.',
      isPaid: false,
      certificateType: 'free',
      certificatePrice: 0,
    }
  };

  const course = courseData[courseId] || courseData[1];

  // Add lessons to course 1
  if (course.id === 1) {
    course.lessons = [
      { id: 'wd1', title: 'Introduction to Web Development', type: 'video', duration: '30 min', description: 'Overview of web technologies' },
      { id: 'wd2', title: 'HTML5 Fundamentals', type: 'video', duration: '45 min', description: 'Learn HTML structure and semantics' },
      { id: 'wd3', title: 'CSS3 Styling', type: 'video', duration: '60 min', description: 'Master CSS properties and layouts' },
      { id: 'wd4', title: 'JavaScript Basics', type: 'video', duration: '90 min', description: 'JavaScript programming fundamentals' },
      { id: 'wd5', title: 'React Components', type: 'video', duration: '120 min', description: 'Build React applications' },
      { id: 'wd6', title: 'Node.js Backend', type: 'video', duration: '100 min', description: 'Server-side JavaScript' },
      { id: 'wd7', title: 'Web Development Quiz', type: 'quiz', duration: '45 min', description: 'Test your knowledge' },
      { id: 'wd8', title: 'Final Project', type: 'assignment', duration: '4 hours', description: 'Build a full-stack application' },
    ];
  }

  const handleEnroll = () => {
    if (course.isPaid) {
      setShowPaymentDialog(true);
    } else {
      // Free course - enroll directly
      setIsEnrolled(true);
      setActiveTab(1); // Switch to content tab
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setIsEnrolled(true);
    setShowPaymentDialog(false);
    setActiveTab(1); // Switch to content tab
  };

  const handleCertificatePurchase = () => {
    if (course.certificateType === 'free') {
      setShowCertificateDialog(true);
    } else {
      // Show certificate purchase dialog
      setShowPaymentDialog(true);
    }
  };

  const handleProgressUpdate = (progressData) => {
    setUserProgress(progressData.progress);
    if (progressData.progress >= 100) {
      setShowCertificateDialog(true);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: 2, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        {/* Course Header */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 300,
            overflow: 'hidden',
            mb: 4,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
                color: 'white',
                fontWeight: 700,
                mb: 1,
              }}
            >
              {course.icon} {course.title}
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', mb: 1, opacity: 0.9 }}>
              {course.category} • ⭐ {course.rating} • {course.students.toLocaleString()} students
            </Typography>
          </Box>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Tabs for different content sections */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Overview" />
                <Tab label="Content" disabled={!isEnrolled} />
                <Tab label="Reviews" />
                <Tab label="Certificate" disabled={userProgress < 100} />
              </Tabs>
            </Box>


            {/* Overview Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
                  Course Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4, color: '#4b5563' }}>
                  {course.description}
                </Typography>

                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
                  What You'll Learn
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {course.whatYouLearn.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Typography sx={{ color: '#2563eb', mr: 1 }}>✓</Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#4b5563' }}>
                          {item}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Sample Video Preview */}
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#1a1a2e' }}>
                  Course Preview
                </Typography>
                <VideoPlayer
                  videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
                  title={`${course.title} - Preview`}
                />
              </Box>
            )}

            {/* Content Tab */}
            {activeTab === 1 && isEnrolled && (
              <ProgressTracker
                courseId={course.id}
                userId={currentUser.id}
                onProgressUpdate={handleProgressUpdate}
                courseData={course}
              />
            )}

            {/* Reviews Tab */}
            {activeTab === 2 && (
              <ReviewSystem
                courseId={course.id}
                userId={currentUser.id}
              />
            )}

            {/* Certificate Tab */}
            {activeTab === 3 && userProgress >= 100 && (
              <CertificateGenerator
                course={course}
                user={currentUser}
                completionDate={new Date().toLocaleDateString()}
                isVisible={true}
                onClose={() => setActiveTab(0)}
              />
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 24 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#2563eb', mb: 2 }}>
                  {course.isPaid ? `₹${course.price.toFixed(2)}` : 'FREE'}
                </Typography>
                
                {!isEnrolled ? (
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleEnroll}
                      sx={{
                        mb: 2,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                          boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                        },
                      }}
                    >
                      {course.isPaid ? 'Enroll Now' : 'Start Learning - Free'}
                    </Button>
                    
                    {course.isPaid && (
                      <Typography variant="body2" sx={{ color: '#6b7280', textAlign: 'center', mb: 2 }}>
                        💳 Secure payment • Instant access • 30-day refund
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label="Enrolled"
                      sx={{
                        bgcolor: '#10b981',
                        color: 'white',
                        fontWeight: 600,
                        mb: 2,
                        width: '100%',
                      }}
                    />
                    {userProgress > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Your Progress: {Math.round(userProgress)}%
                        </Typography>
                        <Box
                          sx={{
                            height: 8,
                            bgcolor: 'rgba(16, 185, 129, 0.2)',
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${userProgress}%`,
                              height: '100%',
                              bgcolor: '#10b981',
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/')}
                  sx={{
                    mb: 3,
                    py: 1.5,
                    borderColor: '#e5e7eb',
                    color: '#4b5563',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: '#2563eb',
                      color: '#2563eb',
                      backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    },
                  }}
                >
                  Back to Courses
                </Button>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Duration:</strong> {course.duration}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Lectures:</strong> {course.lectures}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Level:</strong> {course.level || 'Beginner'}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Certificate:</strong> {
                    course.certificateType === 'free' ? 'Free' :
                    course.certificateType === 'paid' ? `₹${course.certificatePrice}` :
                    `₹${course.certificatePrice} (Premium)`
                  }
                </Typography>

                {/* Certificate Purchase Button */}
                {isEnrolled && userProgress >= 100 && (
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={handleCertificatePurchase}
                    sx={{
                      mb: 2,
                      py: 1,
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                        boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                      },
                    }}
                  >
                    {course.certificateType === 'free' 
                      ? 'Get Free Certificate' 
                      : course.certificateType === 'paid'
                      ? `Get Certificate - ₹${course.certificatePrice}`
                      : `Get Premium Certificate - ₹${course.certificatePrice}`
                    }
                  </Button>
                )}

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Instructor
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  {course.instructor}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  {course.instructorBio}
                </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Payment Dialog */}
      <PaymentGateway
        course={course}
        isVisible={showPaymentDialog}
        onCancel={() => setShowPaymentDialog(false)}
        onPaymentSuccess={handlePaymentSuccess}
        amount={course.price}
      />

      {/* Certificate Dialog */}
      <CertificateGenerator
        course={course}
        user={currentUser}
        completionDate={new Date().toLocaleDateString()}
        isVisible={showCertificateDialog}
        onClose={() => setShowCertificateDialog(false)}
        onCertificateGenerated={(data) => console.log('Certificate generated:', data)}
      />
    </Box>
  );
};

export default CourseDetailPage;
