import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Gamification State
  const [userXP, setUserXP] = useState(parseInt(localStorage.getItem('userXP') || '850', 10));

  const addXP = (amount) => {
    const newXP = userXP + amount;
    setUserXP(newXP);
    localStorage.setItem('userXP', newXP.toString());
  };

  const getUserRank = () => {
    if (userXP < 500) return { title: 'Novice', color: '#94a3b8', max: 500, min: 0 };
    if (userXP < 2000) return { title: 'Scholar', color: '#10b981', max: 2000, min: 500 };
    if (userXP < 5000) return { title: 'Master', color: '#a855f7', max: 5000, min: 2000 };
    return { title: 'Grandmaster', color: '#f59e0b', max: 10000, min: 5000 };
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await authService.getCurrentUser();
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to load user', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (userData) => {
    const { data } = await authService.register(userData);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, userXP, addXP, getUserRank }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
