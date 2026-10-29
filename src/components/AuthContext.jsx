import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Load logged-in user session from localStorage on page refresh
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // 1. Register User
    async function register(name, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Check if user already exists
        const userExists = existingUsers.find(u => u.email === email);
        if (userExists) {
            alert("User with this email already exists!");
            return;
        }

        const newUser = { name, email, password };
        existingUsers.push(newUser);

        // Save updated user list and log in new user
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setUser(newUser);
        alert("Account registered successfully!");
    }

    // 2. Login User
    async function login(email, password) {
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        const foundUser = existingUsers.find(u => u.email === email && u.password === password);

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            setUser(foundUser);
        } else {
            alert("Invalid email or password!");
        }
    }

    // 3. Logout User
    async function logout() {
        localStorage.removeItem('currentUser');
        setUser(null);
        alert("Logged out successfully");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };