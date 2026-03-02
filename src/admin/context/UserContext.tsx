import React, { createContext, useContext, useMemo } from 'react';

interface User {
    canAccessAdmin?: boolean;
    permissions?: string[];
    name?: string;
    email?: string;
    [key: string]: any;
}

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    isStale: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode;
}

const getStaticUser = (): User | null => {
    try {
        const stored = localStorage.getItem('mahd_auth_user');
        if (stored) return JSON.parse(stored);
    } catch {
        // ignore
    }
    return null;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const user = getStaticUser();

    const refetch = async (): Promise<void> => {
        // No-op: user comes from localStorage (set by AuthContext)
    };

    const value = useMemo(() => ({
        user,
        isLoading: false,
        error: null,
        refetch,
        isStale: false,
    }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useCurrentUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useCurrentUser must be used within a UserProvider');
    }
    return context;
};

export const clearUserCache = (): void => {
    // No-op in static mode
};
