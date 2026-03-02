import {
    MOCK_AUDIT_ENTITIES,
    MOCK_AUDIT_LOGS,
    fakeDelay,
    paginate,
    type GetAuditLogsParams as _Params,
} from '@shared/mockData/mockDb';

export interface AuditEntityResponse {
    success: boolean;
    data: Array<{ key: string; value: string }>;
}

export interface AuditLog {
    id: number;
    timestamp: string;
    username: string;
    action: string;
    entityName: string;
    details: string;
    userId?: number;
    targetId?: string;
    ipAddress?: string;
    userAgent?: string;
    roleName?: string;
}

export interface AuditLogsResponse {
    success: boolean;
    data: {
        items: AuditLog[];
        totalCount: number;
        currentPage: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface GetAuditLogsParams {
    pageNumber?: number;
    pageSize?: number;
    Entity?: string;
    Action?: number;
    FromDate?: string;
    ToDate?: string;
    userId?: string;
    RoleName?: string;
}

export const AuditService = {
    getEntities: async (): Promise<AuditEntityResponse> => {
        await fakeDelay();
        return { success: true, data: MOCK_AUDIT_ENTITIES };
    },

    getAuditLogs: async (params: GetAuditLogsParams = {}): Promise<AuditLogsResponse> => {
        await fakeDelay();
        let items = [...MOCK_AUDIT_LOGS];
        if (params.Entity && params.Entity !== '0')
            items = items.filter(i => i.entityName === params.Entity);
        if (params.RoleName)
            items = items.filter(i => i.roleName === params.RoleName);
        const p = paginate(items, params.pageNumber ?? 1, params.pageSize ?? 10);
        return {
            success: true,
            data: {
                items: p.items as AuditLog[],
                totalCount: p.totalCount,
                currentPage: p.pageNumber,
                totalPages: p.totalPages,
                hasNextPage: p.hasNextPage,
                hasPreviousPage: p.hasPreviousPage,
            },
        };
    },

    exportAudits: async (_params: GetAuditLogsParams = {}): Promise<any> => {
        await fakeDelay();
        return MOCK_AUDIT_LOGS;
    },
};
