// LoginPage.js - Professional Theme
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
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  Lock, 
  School,
} from '@mui/icons-material';
import { useAuth } from '../../store/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await login({ username, password });
      setSuccess('Login successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to log in. Please check your credentials.';
      setError(errorMessage);
      console.error('Login error:', err);
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
      <Container maxWidth="sm">
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
                  background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
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
                Welcome Back
              </Typography>
              
              <Typography variant="body1" sx={{ color: '#6b7280', mb: 0 }}>
                Sign in to continue your learning journey
              </Typography>
            </Box>

            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {success}
              </Alert>
            )}

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
              <TextField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
                autoComplete="username"
                autoFocus
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
                      borderColor: '#4f46e5',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    '&.Mui-focused': {
                      color: '#4f46e5',
                    },
                  },
                }}
              />
              
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                autoComplete="current-password"
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
                      borderColor: '#4f46e5',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    '&.Mui-focused': {
                      color: '#4f46e5',
                    },
                  },
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      color="primary"
                      sx={{
                        '&.Mui-checked': {
                          color: '#4f46e5',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: '#4b5563' }}>
                      Remember me
                    </Typography>
                  }
                />
                <Box sx={{ textAlign: 'right' }}>
                  <Link 
                    component={RouterLink}
                    to="/forgot-password"
                    sx={{ 
                      color: '#4f46e5',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

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
                  background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3730a3 0%, #be185d 100%)',
                    boxShadow: '0 6px 16px rgba(79, 70, 229, 0.4)',
                  },
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

              <Divider sx={{ my: 3, borderColor: '#e5e7eb' }}>
                <Typography variant="body2" sx={{ color: '#9ca3af', px: 2 }}>
                  OR
                </Typography>
              </Divider>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Don't have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/register" 
                    sx={{ 
                      fontWeight: 600,
                      textDecoration: 'none',
                      color: '#4f46e5',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign up
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

export default LoginPage;