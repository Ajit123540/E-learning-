import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  Lock, 
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../../store/AuthContext';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      const user = await login({ username, password });
      
      // Ensure only admins/instructors can proceed through this portal
      if (!user || (user.role !== 'admin' && user.role !== 'instructor')) {
        logout(); // Immediately remove token if not admin
        throw new Error('Access Denied: You do not have administration privileges.');
      }
      
      setSuccess('Admin authentication successful! Redirecting to Admin Dashboard...');
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
      
    } catch (err) {
      const errorMessage = err.message || err.response?.data?.message || 'Failed to authenticate.';
      setError(errorMessage);
      console.error('Admin Login error:', err);
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
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', // Darker theme for admin
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Paper 
            elevation={24} 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              borderRadius: 3,
              background: '#ffffff',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', // Red/Security theme
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
                }}
              >
                <AdminPanelSettings sx={{ fontSize: '42px', color: 'white' }} />
              </Box>
              
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  color: '#111827',
                  letterSpacing: '-0.5px'
                }}
              >
                Admin Portal
              </Typography>
              
              <Typography variant="body1" sx={{ color: '#4b5563' }}>
                Secure Access for Platform Management
              </Typography>
            </Box>

            {success && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {success}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Admin Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
                autoComplete="off"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                label="Security Key (Password)"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 4 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                    },
                  }}
                >
                  {loading ? 'Authenticating...' : 'Authorize Access'}
                </Button>
              </Box>
              
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button 
                  component={RouterLink} 
                  to="/login"
                  color="inherit" 
                  sx={{ textTransform: 'none', color: '#6b7280' }}
                >
                  Return to Student Portal
                </Button>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AdminLoginPage;
