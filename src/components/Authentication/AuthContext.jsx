import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app and provide auth state and methods
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem('auth') === 'true'
    );

    const login = (email, password) => {
        if (email === 'smteam@dlithe.com' && password === 'smteam123') {
            setIsAuthenticated(true);
            localStorage.setItem('auth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('auth');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume auth context
export const useAuth = () => useContext(AuthContext);
