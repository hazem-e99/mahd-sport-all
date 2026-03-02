import { MOCK_MANAGED_USERS, MOCK_ROLES_DICTIONARY, type ManagedUser } from '@shared/mockData/mockDb';

// Generate random temp password
const generateTempPassword = (): string => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let pass = 'Tmp@';
    for (let i = 0; i < 6; i++) pass += chars[Math.floor(Math.random() * chars.length)];
    return pass;
};

// Generate ID
const generateId = (): string => Date.now().toString();

export const AVAILABLE_PERMISSIONS = [
    { key: 'read', labelKey: 'perm_read' },
    { key: 'write', labelKey: 'perm_write' },
    { key: 'delete', labelKey: 'perm_delete' },
    { key: 'manage', labelKey: 'perm_manage' },
];

export const UserManagementService = {

    getAll: async (search?: string) => {
        await new Promise(r => setTimeout(r, 300));
        let users = [...MOCK_MANAGED_USERS];
        if (search) {
            const q = search.toLowerCase();
            users = users.filter(u =>
                u.email.toLowerCase().includes(q) ||
                u.name.toLowerCase().includes(q) ||
                u.roleName.toLowerCase().includes(q)
            );
        }
        return users;
    },

    getRoles: async () => {
        await new Promise(r => setTimeout(r, 100));
        return MOCK_ROLES_DICTIONARY;
    },

    addUser: async (data: {
        email: string;
        name: string;
        roleId: string;
        permissions: string[];
        canAccessAdmin: boolean;
    }): Promise<ManagedUser> => {
        await new Promise(r => setTimeout(r, 500));

        const role = MOCK_ROLES_DICTIONARY.find(r => r.key === data.roleId);
        const tempPass = generateTempPassword();

        const newUser: ManagedUser = {
            id: generateId(),
            email: data.email,
            name: data.name,
            roleId: data.roleId,
            roleName: role?.value ?? 'Unknown',
            permissions: data.permissions,
            isFirstLogin: true,
            tempPassword: tempPass,
            password: tempPass,
            canAccessAdmin: data.canAccessAdmin,
            createdAt: new Date().toISOString(),
            status: 'active',
        };

        MOCK_MANAGED_USERS.push(newUser);

        // Also add to MOCK_ACCOUNTS so they can login
        const { MOCK_ACCOUNTS } = await import('@shared/mockData/mockDb');
        MOCK_ACCOUNTS.push({
            email: newUser.email,
            password: newUser.tempPassword,
            name: newUser.name,
            canAccessAdmin: newUser.canAccessAdmin,
            permissions: newUser.permissions,
            isFirstLogin: true,
        });

        // Simulate email sent (log to console)
        console.log(`📧 [MOCK EMAIL] بُعث إلى: ${newUser.email} | كلمة المرور المؤقتة: ${newUser.tempPassword}`);

        return newUser;
    },

    updateUser: async (id: string, data: Partial<ManagedUser>): Promise<ManagedUser> => {
        await new Promise(r => setTimeout(r, 400));
        const idx = MOCK_MANAGED_USERS.findIndex(u => u.id === id);
        if (idx === -1) throw new Error('User not found');
        MOCK_MANAGED_USERS[idx] = { ...MOCK_MANAGED_USERS[idx], ...data };
        return MOCK_MANAGED_USERS[idx];
    },

    deleteUser: async (id: string): Promise<void> => {
        await new Promise(r => setTimeout(r, 300));
        const idx = MOCK_MANAGED_USERS.findIndex(u => u.id === id);
        if (idx === -1) throw new Error('User not found');
        MOCK_MANAGED_USERS.splice(idx, 1);
    },

    toggleStatus: async (id: string): Promise<ManagedUser> => {
        await new Promise(r => setTimeout(r, 200));
        const user = MOCK_MANAGED_USERS.find(u => u.id === id);
        if (!user) throw new Error('User not found');
        user.status = user.status === 'active' ? 'inactive' : 'active';
        return user;
    },

    changePassword: async (email: string, newPassword: string): Promise<void> => {
        await new Promise(r => setTimeout(r, 500));

        // Update in MOCK_MANAGED_USERS
        const managed = MOCK_MANAGED_USERS.find(u => u.email === email);
        if (managed) {
            managed.password = newPassword;
            managed.isFirstLogin = false;
        }

        // Update in MOCK_ACCOUNTS
        const { MOCK_ACCOUNTS } = await import('@shared/mockData/mockDb');
        const acc = MOCK_ACCOUNTS.find(a => a.email === email);
        if (acc) {
            acc.password = newPassword;
            (acc as any).isFirstLogin = false;
        }
    },
};
