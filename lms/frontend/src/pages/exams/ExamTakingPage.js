import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import api from '../../services/api';
import { motion } from 'framer-motion';

const ExamTakingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // { questionId: 'Selected Option Text' }
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await api.get('/exams');
        // Find the specific exam
        const targetExam = response.data.find(e => e.id === id);
        
        if (!targetExam) {
          setError('Exam not found or is no longer active.');
        } else {
          setExam(targetExam);
        }
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError('Failed to load exam details.');
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [id]);

  const handleOptionChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (exam && Object.keys(answers).length < exam.questions.length) {
      if (!window.confirm('You have unanswered questions. Are you sure you want to submit?')) {
        return;
      }
    }

    setSubmitting(true);
    try {
      const response = await api.post(`/exams/${id}/submit`, { answers });
      setResult(response.data);
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError(err.response?.data?.message || 'Failed to submit exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </Container>
    );
  }

  if (result) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Paper elevation={3} sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'success.main', fontWeight: 800 }}>
              Exam Submitted!
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
              You scored {result.score} out of {result.total}
            </Typography>
            
            <Box sx={{ p: 3, mb: 4, bgcolor: 'rgba(79, 70, 229, 0.05)', borderRadius: 2 }}>
              <Typography variant="body1">
                Your answers have been securely submitted to the instructor.
              </Typography>
            </Box>

            <Button size="large" variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </Paper>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 10 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
            {exam.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {exam.description}
          </Typography>
        </Box>
        <Paper elevation={1} sx={{ p: 2, borderRadius: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center', minWidth: 120 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {exam.duration}
          </Typography>
          <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            Mins Limit
          </Typography>
        </Paper>
      </Box>

      {/* Questions */}
      <Box>
        {exam.questions.map((question, index) => (
          <Paper key={question.id} elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              <Box component="span" sx={{ color: 'primary.main', mr: 2 }}>
                Q{index + 1}.
              </Box>
              {question.text}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={answers[question.id] || ''}
                onChange={(e) => handleOptionChange(question.id, e.target.value)}
              >
                {question.options.map((option, optIndex) => (
                  <FormControlLabel
                    key={optIndex}
                    value={option}
                    control={<Radio color="primary" />}
                    label={option}
                    sx={{
                      mb: 1,
                      pl: 1,
                      pr: 2,
                      py: 1,
                      backgroundColor: answers[question.id] === option ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: answers[question.id] === option ? 'primary.main' : 'transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                      }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Paper>
        ))}
      </Box>

      {/* Submit Action */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSubmit}
          disabled={submitting}
          sx={{
            py: 1.5,
            px: 6,
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: 3,
            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)',
            '&:hover': {
              boxShadow: '0 12px 20px rgba(16, 185, 129, 0.4)',
            }
          }}
        >
          {submitting ? <CircularProgress size={24} color="inherit" /> : 'Final Submit Exam'}
        </Button>
      </Box>
    </Container>
  );
};

export default ExamTakingPage;
