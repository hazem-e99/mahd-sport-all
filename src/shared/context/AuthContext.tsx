import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { MOCK_ACCOUNTS } from '@shared/mockData/mockDb';

interface AuthUser {
    name?: string;
    email?: string;
    canAccessAdmin?: boolean;
    permissions?: string[];
    [key: string]: any;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<'admin' | 'portal'>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'mahd_auth_user';
const TOKEN_STORAGE_KEY = 'mahd_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!user;
    const isAdmin = !!user?.canAccessAdmin;

    // Persist user to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }, [user]);

    const login = useCallback(async (email: string, password: string): Promise<'admin' | 'portal'> => {
        setIsLoading(true);
        setError(null);

        // Simulate a small delay for UX
        await new Promise(resolve => setTimeout(resolve, 600));

        const account = MOCK_ACCOUNTS.find(
            a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
        );

        if (!account) {
            setIsLoading(false);
            const msg = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
            setError(msg);
            throw new Error(msg);
        }

        const userData: AuthUser = {
            name: account.name,
            email: account.email,
            canAccessAdmin: account.canAccessAdmin,
            permissions: account.permissions,
        };

        // Store a fake token
        localStorage.setItem(TOKEN_STORAGE_KEY, 'mock-static-token-' + Date.now());
        setUser(userData);
        setIsLoading(false);

        return userData.canAccessAdmin ? 'admin' : 'portal';
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);

        window.location.href = '/login';
    }, []);

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        error,
        login,
        logout,
    }), [user, isAuthenticated, isAdmin, isLoading, error, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
