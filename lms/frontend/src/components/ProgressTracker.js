import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  PlayArrow,
  Lock,
  Quiz,
  Assignment,
  Star,
  EmojiEvents,
  TrendingUp,
} from '@mui/icons-material';

const ProgressTracker = ({ 
  courseId, 
  userId, 
  onProgressUpdate,
  courseData 
}) => {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // Load progress from API or localStorage
    loadProgress();
  }, [courseId, userId]);

  const loadProgress = async () => {
    try {
      // Simulate API call
      const savedProgress = localStorage.getItem(`progress_${userId}_${courseId}`);
      if (savedProgress) {
        const data = JSON.parse(savedProgress);
        setProgress(data.progress || 0);
        setCompletedLessons(data.completedLessons || []);
        setCurrentLesson(data.currentLesson);
        setAchievements(data.achievements || []);
        setTimeSpent(data.timeSpent || 0);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = (newProgress) => {
    const progressData = {
      progress: newProgress,
      completedLessons,
      currentLesson,
      achievements,
      timeSpent,
      lastUpdated: new Date().toISOString(),
    };
    
    localStorage.setItem(`progress_${userId}_${courseId}`, JSON.stringify(progressData));
    
    if (onProgressUpdate) {
      onProgressUpdate(progressData);
    }
  };

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      
      const newProgress = (newCompleted.length / courseData.lessons.length) * 100;
      setProgress(newProgress);
      
      // Check for achievements
      checkAchievements(newCompleted.length);
      
      saveProgress(newProgress);
    }
  };

  const checkAchievements = (completedCount) => {
    const newAchievements = [];
    
    if (completedCount === 1) {
      newAchievements.push({
        id: 'first_lesson',
        title: 'First Steps',
        description: 'Completed your first lesson',
        icon: '🎯',
        unlocked: true,
      });
    }
    
    if (completedCount === courseData.lessons.length) {
      newAchievements.push({
        id: 'course_complete',
        title: 'Course Master',
        description: 'Completed the entire course',
        icon: '🏆',
        unlocked: true,
      });
    }
    
    if (completedCount % 5 === 0) {
      newAchievements.push({
        id: `milestone_${completedCount}`,
        title: `${completedCount} Lessons Complete!`,
        description: `You've completed ${completedCount} lessons`,
        icon: '⭐',
        unlocked: true,
      });
    }
    
    if (newAchievements.length > 0) {
      setAchievements([...achievements, ...newAchievements]);
    }
  };

  const getLessonStatus = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      return 'completed';
    }
    if (currentLesson === lessonId) {
      return 'current';
    }
    return 'locked';
  };

  const getLessonIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: '#10b981' }} />;
      case 'current':
        return <PlayArrow sx={{ color: '#3a86ff' }} />;
      default:
        return <Lock sx={{ color: '#9ca3af' }} />;
    }
  };

  return (
    <Box>
      {/* Overall Progress */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 700 }}>
            Your Progress
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                Course Completion
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #ff006e, #8338ec, #3a86ff)',
                },
              }}
            />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#3a86ff', fontWeight: 700 }}>
                  {completedLessons.length}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Lessons Completed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#ff006e', fontWeight: 700 }}>
                  {Math.floor(timeSpent / 60)}h {timeSpent % 60}m
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Time Spent
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#ffd700', fontWeight: 700 }}>
                  {achievements.length}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Achievements
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Lesson List */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#1a1a2e' }}>
            Course Content
          </Typography>
          
          <List>
            {courseData?.lessons?.map((lesson, index) => {
              const status = getLessonStatus(lesson.id);
              return (
                <React.Fragment key={lesson.id}>
                  <ListItem
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      bgcolor: status === 'current' ? 'rgba(58, 134, 255, 0.1)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'rgba(58, 134, 255, 0.05)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      {getLessonIcon(status)}
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {index + 1}. {lesson.title}
                          </Typography>
                          {lesson.type === 'video' && (
                            <Chip label="Video" size="small" sx={{ bgcolor: '#3a86ff', color: 'white' }} />
                          )}
                          {lesson.type === 'quiz' && (
                            <Chip label="Quiz" size="small" sx={{ bgcolor: '#ff006e', color: 'white' }} />
                          )}
                          {lesson.type === 'assignment' && (
                            <Chip label="Assignment" size="small" sx={{ bgcolor: '#10b981', color: 'white' }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            {lesson.duration} • {lesson.description}
                          </Typography>
                          {status === 'completed' && (
                            <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
                              Completed
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    
                    {status !== 'locked' && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setCurrentLesson(lesson.id)}
                        sx={{
                          borderColor: '#3a86ff',
                          color: '#3a86ff',
                          '&:hover': {
                            bgcolor: '#3a86ff',
                            color: 'white',
                          },
                        }}
                      >
                        {status === 'completed' ? 'Review' : 'Start'}
                      </Button>
                    )}
                  </ListItem>
                  
                  {index < courseData.lessons.length - 1 && (
                    <Divider sx={{ ml: 4, mr: 2 }} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>

      {/* Achievements */}
      {achievements.length > 0 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#1a1a2e' }}>
              Recent Achievements
            </Typography>
            
            <Grid container spacing={2}>
              {achievements.slice(-4).map((achievement) => (
                <Grid item xs={6} sm={3} key={achievement.id}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(131, 56, 236, 0.1))',
                      border: '1px solid rgba(131, 56, 236, 0.2)',
                    }}
                  >
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {achievement.icon}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a1a2e' }}>
                      {achievement.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {achievement.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ProgressTracker;
