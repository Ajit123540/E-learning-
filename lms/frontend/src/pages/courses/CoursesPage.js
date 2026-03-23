import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Pagination,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { motion } from 'framer-motion';
import EnhancedCourseCard from '../../components/EnhancedCourseCard';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(1);
  const coursesPerPage = 6;

  // Same mock data as HomePage for consistency
  const allCourses = [
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

  const categories = ['All', 'Development', 'Data Science', 'Programming', 'Design', 'Marketing', 'Creative', 'Business'];

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const pageCount = Math.ceil(filteredCourses.length / coursesPerPage);
  
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedCourses = filteredCourses.slice((page - 1) * coursesPerPage, page * coursesPerPage);

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, background: '#f9fafb', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 6, textAlign: 'center' }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ 
              fontWeight: 800, 
              mb: 2, 
              background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Explore Courses
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: '#6b7280', maxWidth: '700px', mx: 'auto', fontSize: '1.1rem' }}
          >
            Find the perfect course to advance your career and learn new skills.
          </Typography>
        </Box>

        {/* Filters Section */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ mb: 8, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}
        >
          <TextField
            variant="outlined"
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            sx={{ flex: '1 1 300px', maxWidth: '500px', bgcolor: '#fff', borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 200, bgcolor: '#fff', borderRadius: 1 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              value={categoryFilter}
              label="Category"
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <>
            <Grid container spacing={4} alignItems="stretch">
              {displayedCourses.map((course, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={course.id}
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                >
                  <EnhancedCourseCard course={course} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 8, p: 4, bgcolor: '#fff', borderRadius: 2, border: '1px solid #e5e7eb' }}>
            <Typography variant="h5" sx={{ color: '#1a1a2e', mb: 1 }}>
              No courses found
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280' }}>
              Try adjusting your search criteria or changing the category filter.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CoursesPage;
