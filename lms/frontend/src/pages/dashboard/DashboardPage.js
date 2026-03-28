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
  Assignment,
  LibraryBooks,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../store/AuthContext';
import api, { courseService } from '../../services/api';

const Dashboard = () => {
  const { user, userXP, getUserRank } = useAuth();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await courseService.getAllCourses();
        if (user && user.enrolledCourses) {
          const userCourses = data.filter(course => user.enrolledCourses.includes(course.id || course._id));
          setCourses(userCourses);
        } else {
          setCourses([]);
        }
        
        // Fetch resources
        const resResponse = await api.get('/resources');
        setResources(resResponse.data);

        // Fetch active exams
        const examResponse = await api.get('/exams');
        setExams(examResponse.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = {
    coursesEnrolled: courses.length,
    coursesCompleted: 0,
    totalHours: courses.length * 5,
    certificates: 0,
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress sx={{ color: '#a855f7' }} size={60} thickness={4} />
      </Box>
    );
  }

  // Common glassmorphic card style
  const glassCardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', py: { xs: 6, md: 8 }, color: 'white', position: 'relative', overflow: 'hidden' }}>
      
      {/* Ambient background glows */}
      <Box component={motion.div} animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <Box component={motion.div} animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }} sx={{ position: 'absolute', bottom: '10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(90px)', pointerEvents: 'none' }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        
        {/* Gamified Profile Section */}
        <Box component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} sx={{ mb: 6, display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)', p: 4, borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
          {user?.role === 'student' && getUserRank && <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: `radial-gradient(circle, ${getUserRank().color}30 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />}
          
          <Box sx={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
            {user?.role === 'student' && getUserRank && (
              <Box sx={{ position: 'relative', mr: { xs: 3, md: 4 } }}>
                <Avatar src={user?.avatar} sx={{ width: 100, height: 100, border: `3px solid ${getUserRank().color}`, boxShadow: `0 0 30px ${getUserRank().color}40` }} />
                <Box sx={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', bgcolor: getUserRank().color, color: 'white', px: '12px', py: '4px', borderRadius: 3, fontSize: '0.75rem', fontWeight: 900, boxShadow: '0 4px 15px rgba(0,0,0,0.5)', letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  Lv. {Math.floor(userXP / 200) + 1}
                </Box>
              </Box>
            )}
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-1px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                Welcome back, <Box component="span" sx={{ color: 'white' }}>{user?.name || 'Student'}</Box> 👋
              </Typography>
              {user?.role === 'student' && getUserRank ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5 }}>
                  <Chip label={getUserRank().title} sx={{ bgcolor: `${getUserRank().color}20`, color: getUserRank().color, fontWeight: 800, border: `1px solid ${getUserRank().color}40`, textTransform: 'uppercase' }} />
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    {userXP} <span style={{ color: 'rgba(255,255,255,0.3)' }}>/ {getUserRank().max} XP</span>
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  Continue your learning journey and track your progress.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {[
            { icon: <School />, value: stats.coursesEnrolled, label: 'Courses Enrolled', color1: '#4f46e5', color2: '#ec4899' },
            { icon: <TrendingUp />, value: stats.coursesCompleted, label: 'Courses Completed', color1: '#10b981', color2: '#059669' },
            { icon: <AccessTime />, value: stats.totalHours, label: 'Learning Hours', color1: '#f59e0b', color2: '#d97706' },
            { icon: <Star />, value: stats.certificates, label: 'Certificates Earned', color1: '#8b5cf6', color2: '#7c3aed' }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} component={motion.div} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card sx={{ ...glassCardStyle, p: 3, position: 'relative', overflow: 'hidden', '&:hover': { transform: 'translateY(-5px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: `0 15px 35px rgba(0,0,0,0.4)` } }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${stat.color1}, ${stat.color2})` }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5, color: 'white' }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: `rgba(255,255,255,0.05)`, color: stat.color1, width: 60, height: 60, border: `1px solid rgba(255,255,255,0.1)` }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 32 } })}
                  </Avatar>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Content Grids */}
        <Grid container spacing={6}>
          
          {/* Main Column - Courses and Exams */}
          <Grid item xs={12} lg={8}>
            
            {/* Continue Learning */}
            <Box sx={{ mb: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <PlayArrow sx={{ color: '#ec4899', fontSize: 32 }} /> Continue Learning
              </Typography>

              {courses.length === 0 ? (
                <Card sx={{ ...glassCardStyle, p: 5, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>You are not enrolled in any courses yet.</Typography>
                  <Button variant="contained" onClick={() => navigate('/courses')} sx={{ py: 1.5, px: 4, borderRadius: 3, fontWeight: 700, background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)', '&:hover': { background: 'linear-gradient(135deg, #4338ca 0%, #db2777 100%)' } }}>
                    Browse Courses
                  </Button>
                </Card>
              ) : (
                <Grid container spacing={3}>
                  {courses.map((course, index) => (
                    <Grid item xs={12} sm={6} key={course.id || course._id} component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 * index }}>
                      <Card sx={{ ...glassCardStyle, display: 'flex', flexDirection: 'column', height: '100%', '&:hover': { transform: 'translateY(-6px)', borderColor: 'rgba(255,255,255,0.2)' } }}>
                        <Box sx={{ height: 160, background: `url(${course.imageUrl || `/images/courses/${course.id || 1}.png`})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, transparent 100%)' }} />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 3, pt: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}>{course.title}</Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>By {course.instructor?.name || course.instructor || 'Instructor'}</Typography>
                          
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Overall Progress</Typography>
                              <Typography variant="caption" sx={{ fontWeight: 800, color: '#10b981' }}>0%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={0} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: 3 } }} />
                          </Box>

                          <Button fullWidth variant="contained" onClick={() => navigate(`/courses/${course.id || course._id}`)} sx={{ py: 1.2, fontWeight: 700, borderRadius: 2, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', '&:hover': { background: '#4f46e5', borderColor: '#4f46e5' } }}>
                            Resume Course
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>

            {/* Active Exams */}
            <Box sx={{ mb: 8 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Assignment sx={{ color: '#f59e0b', fontSize: 32 }} /> Active Exams
              </Typography>

              {exams.length === 0 ? (
                <Card sx={{ ...glassCardStyle, p: 5, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>No active exams scheduled at this time.</Typography>
                </Card>
              ) : (
                <Grid container spacing={3}>
                  {exams.map((exam, index) => {
                    const hasSubmitted = exam.submissions?.some(s => s.userId === user?.id);
                    return (
                      <Grid item xs={12} sm={6} key={exam.id} component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 * index }}>
                        <Card sx={{ ...glassCardStyle, display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #f59e0b', '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#f59e0b' } }}>
                          <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.3 }}>{exam.title}</Typography>
                              <Chip label={hasSubmitted ? "Completed" : "Active"} size="small" sx={{ fontWeight: 700, bgcolor: hasSubmitted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', color: hasSubmitted ? '#34d399' : '#fbbf24' }} />
                            </Box>
                            
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, flexGrow: 1 }}>{exam.description || 'Test your knowledge limits.'}</Typography>
                            
                            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                              <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>Duration</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{exam.duration} Mins</Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', display: 'block' }}>Questions</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{exam.questions?.length || 0}</Typography>
                              </Box>
                            </Box>

                            <Button
                              fullWidth variant="contained"
                              disabled={hasSubmitted}
                              onClick={() => navigate(`/exams/${exam.id}`)}
                              sx={{
                                py: 1.2, fontWeight: 700, borderRadius: 2,
                                background: hasSubmitted ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: hasSubmitted ? 'rgba(255,255,255,0.4)' : 'white',
                                '&:hover': { background: hasSubmitted ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)' },
                              }}
                            >
                              {hasSubmitted ? 'Already Taken' : 'Start Exam Now'}
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Box>
          </Grid>

          {/* Right Sidebar - Study Resources */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <LibraryBooks sx={{ color: '#a855f7', fontSize: 32 }} /> Study Resources
              </Typography>

              {resources.length === 0 ? (
                <Card sx={{ ...glassCardStyle, p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>No study materials available yet.</Typography>
                </Card>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {resources.map((resource, index) => (
                    <Card key={resource.id} component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 * index }} sx={{ ...glassCardStyle, borderLeft: `4px solid ${resource.type === 'note' ? '#4f46e5' : '#ec4899'}`, '&:hover': { transform: 'translateX(-4px)', borderColor: 'rgba(255,255,255,0.2)', borderLeftColor: resource.type === 'note' ? '#4f46e5' : '#ec4899' } }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>{resource.title}</Typography>
                          <Chip label={resource.type} size="small" sx={{ textTransform: 'capitalize', fontWeight: 700, fontSize: '0.7rem', bgcolor: resource.type === 'note' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(236, 72, 153, 0.2)', color: resource.type === 'note' ? '#818cf8' : '#f472b6' }} />
                        </Box>
                        
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>{resource.description || 'No description provided.'}</Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>{new Date(resource.createdAt).toLocaleDateString()}</Typography>
                          <Button
                            variant="outlined" size="small" component="a" href={`http://localhost:5000${resource.fileUrl}`} target="_blank" rel="noopener noreferrer"
                            sx={{ fontWeight: 700, borderRadius: 2, borderColor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' } }}
                          >
                            Download
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
