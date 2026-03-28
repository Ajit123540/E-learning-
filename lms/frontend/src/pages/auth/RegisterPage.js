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
  const [success, setSuccess] = useState('');
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
    if (formData.password !== formData.confirmPassword) return setError("Passwords don't match");
    if (!formData.agreeToTerms) return setError("You must agree to the terms and conditions");
    
    try {
      setError(''); setSuccess(''); setLoading(true);
      await register(formData);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create an account. Please try again.');
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
        background: '#0f172a',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
      }}
    >
      {/* Ambient Animated Gradients */}
      <Box 
        component={motion.div}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        sx={{ position: 'absolute', top: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }}
      />
      <Box 
        component={motion.div}
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        sx={{ position: 'absolute', bottom: '-5%', left: '-15%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(90px)', pointerEvents: 'none' }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
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
                component={motion.div} whileHover={{ scale: 1.05 }}
                sx={{ width: 76, height: 76, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, boxShadow: '0 10px 25px rgba(236, 72, 153, 0.4)' }}
              >
                <School sx={{ fontSize: '38px', color: 'white' }} />
              </Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, mb: 1, color: 'white', letterSpacing: '-0.5px', fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                Create an Account
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                Join us today and unlock a universe of knowledge
              </Typography>
            </Box>

            {success && <Alert severity="success" variant="filled" sx={{ mb: 4, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.9)' }}>{success}</Alert>}
            {error && <Alert severity="error" variant="filled" sx={{ mb: 4, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.9)' }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField name="name" label="Full Name" value={formData.name} onChange={handleChange} fullWidth required variant="outlined" InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }} sx={inputStyles} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} fullWidth required variant="outlined" InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment> }} sx={inputStyles} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="password" label="Password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} fullWidth required variant="outlined" InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: 'white' } }}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} sx={inputStyles} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField name="confirmPassword" label="Confirm Password" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} fullWidth required variant="outlined" InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'rgba(255,255,255,0.5)' }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: 'white' } }}>{showConfirmPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} sx={inputStyles} />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, mb: 4, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} sx={{ color: 'rgba(255,255,255,0.4)', '&.Mui-checked': { color: '#a855f7' } }} />}
                  label={
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      I agree to the <Link href="/terms" sx={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Link> and <Link href="/privacy" sx={{ color: '#a855f7', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Link>
                    </Typography>
                  }
                />
              </Box>

              <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ py: 1.8, fontSize: '1.05rem', fontWeight: 700, borderRadius: 3, background: 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)', boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)', '&:hover': { background: 'linear-gradient(135deg, #4338ca 0%, #9333ea 100%)', boxShadow: '0 12px 28px rgba(168, 85, 247, 0.5)', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" sx={{ fontWeight: 700, textDecoration: 'none', color: 'white', borderBottom: '2px solid #a855f7', pb: 0.5, '&:hover': { color: '#a855f7' }, transition: 'color 0.2s ease' }}>
                    Sign in here
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

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: 'white',
    transition: 'all 0.3s ease',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
    '&.Mui-focused': { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
    '&.Mui-focused fieldset': { borderColor: '#ec4899', borderWidth: 2 },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.5)',
    '&.Mui-focused': { color: '#ec4899' },
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #1e293b inset',
    WebkitTextFillColor: 'white',
    caretColor: 'white',
  }
};

export default RegisterPage;