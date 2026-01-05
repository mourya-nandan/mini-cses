import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState(null);

  // Helper to get headers with CSRF token
  const getHeaders = (hasBody = true) => {
    const headers = {
      'CSRF-Token': csrfToken,
    };
    if (hasBody) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  };

  // 1. Initial Handshake: Get CSRF Token & Check Session
  useEffect(() => {
    const initAuth = async () => {
      try {
        // A. Fetch CSRF Token
        // CRITICAL: credentials: 'include' allows the browser to save the cookie from port 3000
        const csrfRes = await fetch(`${API_BASE_URL}/auth/csrf-token`, { 
            credentials: 'include' 
        });
        const csrfData = await csrfRes.json();
        setCsrfToken(csrfData.csrfToken);

        // B. Check if User is already logged in (Session Cookie)
        const meRes = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include' // Send the session cookie
        });
        
        if (meRes.ok) {
          const userData = await meRes.json();
          setUser(userData.user);
        }
      } catch (err) {
        console.error('Auth Initialization Failed:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 2. Login Action
  const login = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    setUser(data.user);
    return data;
  };

  // 3. Signup Action
  const signup = async (username, email, password, displayName) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, email, password, displayName }),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Signup failed');

    setUser(data.user);
    return data;
  };

  // 4. Logout Action
  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: getHeaders(false),
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, csrfToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);