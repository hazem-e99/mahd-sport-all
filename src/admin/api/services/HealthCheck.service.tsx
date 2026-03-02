import {
  MOCK_HEALTH_DASHBOARD,
  MOCK_HEALTH_LOGS,
  MOCK_MONITOR_INTEGRATION,
  fakeDelay,
  paginate,
} from '@shared/mockData/mockDb';

export interface SystemStatus {
  uptimePercentage: number;
  status: 'Good' | 'Poor' | 'Average';
  uptimeDuration: string;
}

export interface HealthDashboardData {
  systemStatus: SystemStatus;
  activeUsers: number;
  uptimePercentage: number;
  avgResponseTime: number;
  pageViews: Record<string, number>;
  last100Requests: RequestLog[];
  top5MostUsedPages: MostUsedPage[];
}

export interface MostUsedPage {
  page: string;
  pageViews: number;
  uniqueVisitors: number;
}

export interface HealthDashboardResponse {
  success: boolean;
  data: HealthDashboardData;
  errors: any[];
  message: string | null;
}

export interface RequestLog {
  requestUrl: string;
  responseTimeMs: number;
  timestamp: string;
}

export type LogLevel = 'error' | 'warning' | 'info' | '';

export interface ErrorLog {
  timestamp: string;
  userId: string;
  errorCode: string | number;
  page: string;
  message: string;
  userName: string;
  level: string;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  message?: string | null;
  errors?: unknown[];
}

export interface MonitorIntegrationItem {
  systemName: string;
  status: number;
  lastSuccessfulSync: string;
  details: string;
}

export interface MonitorIntegrationResponse {
  success: boolean;
  data: MonitorIntegrationItem[];
  message: string | null;
  errors: unknown[];
}

export type CardStatus = 'connected' | 'degraded' | 'error';

export interface IntegrationItem {
  id: string;
  name: string;
  description?: string;
  lastSync: string | Date;
  status: CardStatus;
  details?: string;
  src?: string;
}

const STATUS_CARD_MAP: Record<number, CardStatus> = {
  0: 'connected',
  1: 'degraded',
  2: 'error',
};

const ICONS: Record<string, string> = {
  MicrosoftGraph: '/admin/images/Microsoft.png',
};

export const toIntegrationItems = (rows: MonitorIntegrationItem[]): IntegrationItem[] =>
  (Array.isArray(rows) ? rows : []).map(r => ({
    id: r.systemName,
    name: r.systemName,
    description: undefined,
    lastSync: r.lastSuccessfulSync,
    status: STATUS_CARD_MAP[r.status] ?? 'degraded',
    details: r.details,
    src: ICONS[r.systemName],
  }));

export const HealthCheckService = {
  async getDashboard(): Promise<HealthDashboardData> {
    await fakeDelay();
    return MOCK_HEALTH_DASHBOARD as HealthDashboardData;
  },

  async getMonitorIntegration(): Promise<MonitorIntegrationItem[]> {
    await fakeDelay();
    return MOCK_MONITOR_INTEGRATION;
  },

  async getMonitorIntegrationCards(): Promise<IntegrationItem[]> {
    const rows = await this.getMonitorIntegration();
    return toIntegrationItems(rows);
  },
};

export const HealthCheckServicelogs = {
  async getLogs(params?: {
    pageNumber?: number;
    pageSize?: number;
    query?: string;
    level?: LogLevel;
    userId?: string;
    errorCode?: string;
    page?: string;
    dateFrom?: string;
    dateTo?: string;
    userName?: string;
    signal?: AbortSignal;
  }) {
    await fakeDelay();
    let items = [...MOCK_HEALTH_LOGS];
    if (params?.level) items = items.filter(l => l.level === params.level);
    if (params?.userName) items = items.filter(l => l.userName.includes(params.userName!));
    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      data: p.items,
      totalCount: p.totalCount,
      currentPage: p.pageNumber,
      totalPages: p.totalPages,
      hasNextPage: p.hasNextPage,
      hasPreviousPage: p.hasPreviousPage,
    };
  },

  async exportLogs(_params: any = {}): Promise<any> {
    await fakeDelay();
    return MOCK_HEALTH_LOGS;
  },
};
