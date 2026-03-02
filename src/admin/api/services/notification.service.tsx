// @ts-nocheck
import { MOCK_NOTIFICATIONS, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type { PaginatedApiResponse } from '@admin/types/api-response';
import type { Notification } from '@admin/types/notification.type';

let notifications = [...MOCK_NOTIFICATIONS];

export const NotificationService = {
    getAllNotifications: async (params?: any): Promise<PaginatedApiResponse<Notification>> => {
        await fakeDelay();
        let items = [...notifications];
        if (params?.searchTerm) items = items.filter(n => n.title.includes(params.searchTerm));
        if (params?.audienceFilter) items = items.filter(n => String(n.audience) === params.audienceFilter);
        if (params?.statusFilter) items = items.filter(n => String(n.status) === params.statusFilter);
        const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
        return {
            success: true,
            data: { items: p.items as unknown as Notification[], ...p, pageNumber: p.pageNumber },
            message: null,
            errors: [],
        };
    },

    getNotificationById: async (id: string | number): Promise<Notification> => {
        await fakeDelay();
        const n = notifications.find(x => x.id === Number(id));
        if (!n) throw new Error('Notification not found');
        return n as unknown as Notification;
    },

    createNotification: async (data: Omit<Notification, 'id'>): Promise<Notification> => {
        await fakeDelay();
        const newItem = { ...data, id: Date.now() } as unknown as Notification;
        notifications.push(newItem as any);
        return newItem;
    },

    updateNotification: async (id: string | number, data: Partial<Notification>): Promise<Notification> => {
        await fakeDelay();
        notifications = notifications.map(n => n.id === Number(id) ? { ...n, ...data } : n);
        return notifications.find(n => n.id === Number(id)) as unknown as Notification;
    },

    deleteNotification: async (id: string | number): Promise<{ success: boolean }> => {
        await fakeDelay();
        notifications = notifications.filter(n => n.id !== Number(id));
        return { success: true };
    },
};