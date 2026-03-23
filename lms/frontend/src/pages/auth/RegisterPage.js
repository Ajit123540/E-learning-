// RegisterPage.js - Professional Theme
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Paper, 
  Alert,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  Person,
  School,
} from '@mui/icons-material';
import { useAuth } from '../../store/AuthContext';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match");
    }
    
    if (!formData.agreeToTerms) {
      return setError("You must agree to the terms and conditions");
    }
    
    try {
      setError('');
      setLoading(true);
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account. Please try again.');
      console.error('Registration error:', err);
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 3,
              background: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                }}
              >
                <School sx={{ fontSize: '36px', color: 'white' }} />
              </Box>
              
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: '#1a1a2e',
                  fontSize: { xs: '1.75rem', md: '2rem' },
                }}
              >
                Create an Account
              </Typography>
              
              <Typography variant="body1" sx={{ color: '#6b7280' }}>
                Join us today and start your learning journey
              </Typography>
            </Box>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: '#9ca3af' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f9fafb',
                          '& fieldset': {
                            borderColor: '#e5e7eb',
                          },
                          '&:hover fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#6b7280',
                          '&.Mui-focused': {
                            color: '#2563eb',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#9ca3af' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f9fafb',
                          '& fieldset': {
                            borderColor: '#e5e7eb',
                          },
                          '&:hover fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#6b7280',
                          '&.Mui-focused': {
                            color: '#2563eb',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#9ca3af' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: '#9ca3af' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f9fafb',
                          '& fieldset': {
                            borderColor: '#e5e7eb',
                          },
                          '&:hover fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#6b7280',
                          '&.Mui-focused': {
                            color: '#2563eb',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#9ca3af' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              sx={{ color: '#9ca3af' }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f9fafb',
                          '& fieldset': {
                            borderColor: '#e5e7eb',
                          },
                          '&:hover fieldset': {
                            borderColor: '#d1d5db',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#6b7280',
                          '&.Mui-focused': {
                            color: '#2563eb',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      sx={{
                        '&.Mui-checked': {
                          color: '#2563eb',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: '#4b5563' }}>
                      I agree to the{' '}
                      <Link href="/terms" sx={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 500 }}>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" sx={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 500 }}>
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                  sx={{ mt: 2, mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                      boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                    },
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Already have an account?{' '}
                    <Link 
                      component={RouterLink} 
                      to="/login" 
                      sx={{ 
                        fontWeight: 600,
                        textDecoration: 'none',
                        color: '#2563eb',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
  );
};

export default RegisterPage;