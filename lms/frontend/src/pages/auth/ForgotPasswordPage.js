import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Email, ArrowBack, School } from '@mui/icons-material';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: email
      });

      setMessage(response.data.message);
      setResetToken(response.data.resetToken);
      setShowToken(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <School sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a2e', mb: 1 }}>
              Forgot Password
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Enter your email address and we'll send you a password reset link
            </Typography>
          </Box>

          {/* Alert Messages */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {message && !showToken && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}

          {/* Reset Token Display (Development Only) */}
          {showToken && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {message}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Reset Token: {resetToken}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                (In production, this would be sent via email)
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => navigate('/reset-password', { state: { token: resetToken } })}
              >
                Go to Reset Password
              </Button>
            </Alert>
          )}

          {/* Form */}
          {!showToken && (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#e5e7eb',
                    },
                    '&:hover fieldset': {
                      borderColor: '#2563eb',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2563eb',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Email sx={{ color: '#9ca3af', mr: 1 }} />
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
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
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
              </Button>
            </Box>
          )}

          {/* Back to Login */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              component={RouterLink}
              to="/login"
              startIcon={<ArrowBack />}
              sx={{
                color: '#2563eb',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.05)',
                },
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
