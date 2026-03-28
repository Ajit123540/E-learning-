import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Avatar } from '@mui/material';
import { TrendingUp, AttachMoney, People, MenuBook, Star, ArrowUpward } from '@mui/icons-material';
import { motion } from 'framer-motion';

const AdminAnalytics = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹14,25,000', increase: '+12.5%', icon: <AttachMoney />, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { title: 'Active Students', value: '4,521', increase: '+5.2%', icon: <People />, color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { title: 'Total Enrollments', value: '12,845', increase: '+18.1%', icon: <MenuBook />, color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)' },
    { title: 'Avg Course Rating', value: '4.8/5', increase: '+0.2', icon: <Star />, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
  ];

  const revenueData = [
    { month: 'Jan', value: 40 }, { month: 'Feb', value: 55 }, { month: 'Mar', value: 45 },
    { month: 'Apr', value: 70 }, { month: 'May', value: 65 }, { month: 'Jun', value: 85 },
    { month: 'Jul', value: 80 }, { month: 'Aug', value: 95 }, { month: 'Sep', value: 100 },
  ];

  const enrollmentData = [
    { name: 'Web Dev Bootcamp', students: 1245, color: '#ec4899' },
    { name: 'Data Science Fundamentals', students: 987, color: '#3b82f6' },
    { name: 'Advanced JavaScript', students: 856, color: '#f59e0b' },
    { name: 'UI/UX Design Basics', students: 742, color: '#10b981' },
    { name: 'Python for Beginners', students: 689, color: '#a855f7' },
  ];

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  };

  return (
    <Box sx={{ bgcolor: '#0f172a', p: { xs: 2, md: 4 }, borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient light */}
      <Box sx={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 1 }}>Platform Analytics</Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>Live financial and enrollment insights overview.</Typography>

        {/* Top Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card sx={{ ...glassStyle, '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(255,255,255,0.1)' }, transition: 'all 0.3s ease' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar sx={{ background: stat.gradient, width: 48, height: 48, boxShadow: `0 4px 15px ${stat.color}40` }}>
                      {stat.icon}
                    </Avatar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', px: 1, py: 0.5, borderRadius: 2 }}>
                      <TrendingUp sx={{ fontSize: 14 }} />
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>{stat.increase}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{stat.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Revenue Chart (Custom Animated CSS Chart) */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ ...glassStyle, height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney sx={{ color: '#10b981' }} /> Monthly Revenue Growth
                </Typography>
                
                <Box sx={{ height: 250, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: { xs: 1, md: 2 }, mt: 4, position: 'relative' }}>
                  {/* Grid Lines */}
                  <Box sx={{ position: 'absolute', top: 0, w: '100%', borderTop: '1px dashed rgba(255,255,255,0.1)', right: 0, left: 0 }} />
                  <Box sx={{ position: 'absolute', top: '50%', w: '100%', borderTop: '1px dashed rgba(255,255,255,0.1)', right: 0, left: 0 }} />
                  
                  {revenueData.map((data, idx) => (
                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
                      <Box 
                        component={motion.div} initial={{ height: 0 }} animate={{ height: `${data.value}%` }} transition={{ duration: 1, delay: idx * 0.1, type: 'spring' }}
                        sx={{ 
                          width: '100%', 
                          maxWidth: 40,
                          background: 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.2) 100%)', 
                          borderRadius: '6px 6px 0 0',
                          position: 'relative',
                          '&:hover .tooltip': { opacity: 1, transform: 'translateY(-10px)' }
                        }}
                      >
                        {/* Hover Tooltip */}
                        <Box className="tooltip" sx={{ opacity: 0, transition: 'all 0.2s', position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)', bgcolor: 'white', color: '#0f172a', px: 1, py: 0.5, borderRadius: 1, fontWeight: 800, fontSize: '0.75rem', pointerEvents: 'none' }}>
                          ₹{data.value * 12}k
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ mt: 2, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{data.month}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Courses Progress List */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ ...glassStyle, height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ color: '#f59e0b' }} /> Top Performing Courses
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                  {enrollmentData.map((course, idx) => {
                    const maxStudents = 1500;
                    const percentage = (course.students / maxStudents) * 100;
                    
                    return (
                      <Box key={idx} component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (idx * 0.1) }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{course.name}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: course.color }}>{course.students.toLocaleString()} enrolled</Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: 8, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                          <Box component={motion.div} initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: 0.8 }} sx={{ height: '100%', bgcolor: course.color, borderRadius: 4 }} />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminAnalytics;
