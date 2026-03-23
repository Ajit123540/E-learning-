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
  useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const theme = useTheme();

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

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: '#ffffff',
      backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.04) 1.5px, transparent 1.5px)',
      backgroundSize: '28px 28px',
    }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          color: theme.palette.text.primary,
          zIndex: theme.zIndex.drawer + 1
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
                fontWeight: 800,
                background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}
            >
              EduNova
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button component={RouterLink} to="/courses" color="inherit">
                Courses
              </Button>
              
              {user ? (
                <>
                  <Button 
                    onClick={handleMenuOpen}
                    color="inherit"
                    startIcon={
                      <Avatar 
                        alt={user.name} 
                        src={user.avatar} 
                        sx={{ width: 32, height: 32 }}
                      />
                    }
                  >
                    {user.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={RouterLink} to="/dashboard" onClick={handleMenuClose}>
                      Dashboard
                    </MenuItem>
                    {user.role === 'instructor' && (
                      <MenuItem component={RouterLink} to="/instructor/courses" onClick={handleMenuClose}>
                        My Courses
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button component={RouterLink} to="/login" color="inherit">
                    Login
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/register" 
                    variant="outlined" 
                    color="inherit"
                    sx={{ ml: 1 }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Container 
        component="main" 
        maxWidth="xl" 
        sx={{ 
          pt: 4, 
          pb: 8, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
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
      
      <Box 
        component="footer" 
        sx={{ 
          py: 4, 
          bgcolor: 'white', 
          color: 'text.secondary', 
          textAlign: 'center',
          mt: 'auto',
          borderTop: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            © {new Date().getFullYear()} EduNova Platform. All rights reserved.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: 'primary.main' } }}>About</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: 'primary.main' } }}>Contact</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: 'primary.main' } }}>Privacy Policy</Link>
            <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 500, '&:hover': { color: 'primary.main' } }}>Terms of Service</Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
