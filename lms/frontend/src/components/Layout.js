import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
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
  Divider
} from '@mui/material';
import { useAuth } from '../store/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold'
              }}
            >
              E-Learning Platform
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
          mt: 4, 
          mb: 4, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Outlet />
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: 'primary.main', 
          color: 'white', 
          textAlign: 'center',
          mt: 'auto'
        }}
      >
        <Container maxWidth="xl">
          <Typography>
            © {new Date().getFullYear()} E-Learning Platform. All rights reserved.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>About</Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Contact</Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Privacy Policy</Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>Terms of Service</Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
