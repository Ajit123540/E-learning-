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
        position: 'relative',
        background: '#0f172a', // Deep slate background
        overflow: 'hidden',
        py: 4,
      }}
    >
      {/* Ambient Animated Gradients */}
      <Box 
        component={motion.div}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <Box 
        component={motion.div}
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Glassmorphism Paper */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <Box textAlign="center" mb={5}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 10px 25px rgba(236, 72, 153, 0.4)',
                }}
              >
                <School sx={{ fontSize: '38px', color: 'white' }} />
              </Box>
              
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  color: 'white',
                  letterSpacing: '-0.5px',
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                Sign in to continue your learning journey
              </Typography>
            </Box>

            {success && (
              <Alert 
                severity="success" 
                variant="filled"
                sx={{ mb: 4, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.9)' }}
              >
                {success}
              </Alert>
            )}

            {error && (
              <Alert 
                severity="error" 
                variant="filled"
                sx={{ mb: 4, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.9)' }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Username"
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
                      <Person sx={{ color: 'rgba(255,255,255,0.5)' }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
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
                      <Lock sx={{ color: 'rgba(255,255,255,0.5)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: 'white' } }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      sx={{
                        color: 'rgba(255,255,255,0.4)',
                        '&.Mui-checked': {
                          color: '#ec4899',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      Remember me
                    </Typography>
                  }
                />
                <Link 
                  component={RouterLink}
                  to="/forgot-password"
                  sx={{ 
                    color: '#a855f7',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    '&:hover': { textDecoration: 'underline', color: '#c084fc' },
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
                  py: 1.8,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                  boxShadow: '0 8px 20px rgba(236, 72, 153, 0.3)',
                 '&:hover': {
                    background: 'linear-gradient(135deg, #4338ca 0%, #db2777 100%)',
                    boxShadow: '0 12px 28px rgba(236, 72, 153, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>

              <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', px: 2, fontWeight: 600 }}>
                  OR
                </Typography>
              </Divider>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2 }}>
                  Don't have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/register" 
                    sx={{ 
                      fontWeight: 700,
                      textDecoration: 'none',
                      color: 'white',
                      borderBottom: '2px solid #ec4899',
                      pb: 0.5,
                      '&:hover': { color: '#ec4899' },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>

                <Link 
                  component={RouterLink} 
                  to="/admin-login" 
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: '#ef4444',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 3,
                    opacity: 0.7,
                    '&:hover': {
                      textDecoration: 'underline',
                      opacity: 1,
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Switch to Admin Portal
                </Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

// Reusable styling for premium dark textfields
const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#a855f7',
      borderWidth: 2,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.5)',
    '&.Mui-focused': {
      color: '#a855f7',
    },
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
    WebkitTextFillColor: 'white',
    caretColor: 'white',
  }
};

export default LoginPage;