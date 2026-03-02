import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { MOCK_ACCOUNTS, MOCK_MANAGED_USERS } from '@shared/mockData/mockDb';

interface AuthUser {
    name?: string;
    email?: string;
    canAccessAdmin?: boolean;
    permissions?: string[];
    isFirstLogin?: boolean;
    [key: string]: any;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<'admin' | 'portal' | 'first-login'>;
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

    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }, [user]);

    const login = useCallback(async (email: string, password: string): Promise<'admin' | 'portal' | 'first-login'> => {
        setIsLoading(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 600));

        // Search static accounts first
        let account: any = MOCK_ACCOUNTS.find(
            a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
        );

        // Then search managed users
        if (!account) {
            const managed = MOCK_MANAGED_USERS.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );
            if (managed) {
                account = {
                    email: managed.email,
                    password: managed.password,
                    name: managed.name,
                    canAccessAdmin: managed.canAccessAdmin,
                    permissions: managed.permissions,
                    isFirstLogin: managed.isFirstLogin,
                };
            }
        }

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
            isFirstLogin: account.isFirstLogin ?? false,
        };

        localStorage.setItem(TOKEN_STORAGE_KEY, 'mock-static-token-' + Date.now());
        setUser(userData);
        setIsLoading(false);

        if (userData.isFirstLogin) return 'first-login';
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
