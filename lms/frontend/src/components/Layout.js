import React from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button,
  Link,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  IconButton
} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/AuthContext';
import AITutorChat from './AITutorChat';

const Layout = () => {
  const { user, logout, userXP, getUserRank } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const theme = useTheme();
  
  const [isLightMode, setIsLightMode] = React.useState(false);

  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    if (nextMode) {
      document.body.style.filter = 'invert(1) hue-rotate(180deg)';
      document.body.style.backgroundColor = 'white';
      if (!document.getElementById('light-mode-style')) {
        const style = document.createElement('style');
        style.id = 'light-mode-style';
        style.innerHTML = `img, video, iframe, .MuiAvatar-root, .MuiChip-root { filter: invert(1) hue-rotate(180deg); }`;
        document.head.appendChild(style);
      }
    } else {
      document.body.style.filter = 'none';
      document.body.style.backgroundColor = '';
      const style = document.getElementById('light-mode-style');
      if (style) style.remove();
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const isHome = location.pathname === '/';

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: isHome ? '#0f172a' : '#ffffff',
      backgroundImage: isHome ? 'none' : 'radial-gradient(rgba(0, 0, 0, 0.04) 1.5px, transparent 1.5px)',
      backgroundSize: '28px 28px',
      transition: 'background-color 0.3s ease',
    }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: isHome ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: isHome ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
          color: isHome ? '#ffffff' : theme.palette.text.primary,
          zIndex: theme.zIndex.drawer + 1,
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: '70px !important' }}>
            <Typography 
              variant="h5" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                flexGrow: 1,
                textDecoration: 'none',
                fontWeight: 900,
                background: isHome ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' : 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}
            >
              EduNova
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton onClick={toggleTheme} sx={{ color: isHome ? 'white' : 'inherit' }}>
                {isLightMode ? <DarkMode /> : <LightMode />}
              </IconButton>
              <Button component={RouterLink} to="/courses" color="inherit" sx={{ fontWeight: 600 }}>
                Courses
              </Button>
              
              {user ? (
                <>
                  {user.role === 'student' && getUserRank && (
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', mr: 2, mt: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: getUserRank().color, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                          {getUserRank().title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: isHome ? 'rgba(255,255,255,0.5)' : 'text.secondary', fontWeight: 600 }}>
                          {userXP} XP
                        </Typography>
                      </Box>
                      <Box sx={{ width: 120, height: 6, bgcolor: isHome ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: 3, overflow: 'hidden', mt: 0.5 }}>
                        <Box sx={{ 
                          width: `${((userXP - getUserRank().min) / (getUserRank().max - getUserRank().min)) * 100}%`, 
                          height: '100%', 
                          bgcolor: getUserRank().color, 
                          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: `0 0 10px ${getUserRank().color}` 
                        }} />
                      </Box>
                    </Box>
                  )}
                  <Button 
                    onClick={handleMenuOpen}
                    color="inherit"
                    startIcon={
                      <Avatar 
                        alt={user.name} 
                        src={user.avatar} 
                        sx={{ 
                          width: 38, height: 38, 
                          border: user.role === 'student' && getUserRank ? `2px solid ${getUserRank().color}` : (isHome ? '2px solid rgba(255,255,255,0.2)' : 'none'),
                          boxShadow: user.role === 'student' && getUserRank ? `0 0 15px ${getUserRank().color}40` : 'none'
                        }}
                      />
                    }
                    sx={{ fontWeight: 600, pl: { xs: 1, md: 0 } }}
                  >
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{user.name}</Box>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 4,
                      sx: { borderRadius: 3, mt: 1, border: '1px solid rgba(0,0,0,0.05)' }
                    }}
                  >
                    <MenuItem component={RouterLink} to="/dashboard" onClick={handleMenuClose}>
                      Dashboard
                    </MenuItem>
                    {(user.role === 'admin' || user.role === 'instructor') && (
                      <MenuItem component={RouterLink} to="/admin" onClick={handleMenuClose}>
                        Admin Dashboard
                      </MenuItem>
                    )}
                    {user.role === 'instructor' && (
                      <MenuItem component={RouterLink} to="/instructor/courses" onClick={handleMenuClose}>
                        My Courses
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button component={RouterLink} to="/login" color="inherit" sx={{ fontWeight: 600 }}>
                    Login
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/register" 
                    variant={isHome ? "contained" : "outlined"} 
                    sx={{ 
                      ml: 1, 
                      fontWeight: 700,
                      background: isHome ? 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)' : 'transparent',
                      color: isHome ? 'white' : 'inherit',
                      border: isHome ? 'none' : '2px solid rgba(0,0,0,0.1)',
                      '&:hover': {
                        border: isHome ? 'none' : '2px solid rgba(0,0,0,0.3)',
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {isHome ? (
        // Full width for HomePage
        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      ) : (
        // Contained width for standard pages
        <Container 
          component="main" 
          maxWidth="xl" 
          sx={{ pt: 4, pb: 8, flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Container>
      )}
      
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          bgcolor: isHome ? '#0f172a' : 'white', 
          color: isHome ? 'rgba(255,255,255,0.6)' : 'text.secondary', 
          textAlign: 'center',
          mt: 'auto',
          borderTop: isHome ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            © {new Date().getFullYear()} EduNova Platform. All rights reserved.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: isHome ? 'white' : 'primary.main' } }}>About</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: isHome ? 'white' : 'primary.main' } }}>Contact</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: isHome ? 'white' : 'primary.main' } }}>Privacy Policy</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: isHome ? 'white' : 'primary.main' } }}>Terms of Service</Link>
          </Box>
        </Container>
      </Box>
      <AITutorChat />
    </Box>
  );
};

export default Layout;
