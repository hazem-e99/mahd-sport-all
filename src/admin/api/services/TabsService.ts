import { MOCK_TABS, MOCK_TAB_VISIBILITY, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type { PaginatedApiResponse } from '@admin/types/api-response';
import type { TabConfig, TabFormInputs } from '@admin/types/shard-table.type';

let tabs = [...MOCK_TABS];

export const TabsService = {
  getTabVisibilityList: async () => {
    await fakeDelay();
    return { data: MOCK_TAB_VISIBILITY };
  },

  getAllTabs: async (params?: any) => {
    await fakeDelay();
    let items = [...tabs];
    if (params?.searchTerm) items = items.filter(t => t.name.includes(params.searchTerm));
    if (params?.visibility) items = items.filter(t => (t as any).visibility === params.visibility);
    if (params?.statusFilter === 1 || params?.statusFilter === 0)
      items = items.filter(t => t.status === params.statusFilter);

    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      data: p.items as TabConfig[],
      totalCount: p.totalCount,
      currentPage: p.pageNumber,
      totalPages: p.totalPages,
      hasNextPage: p.hasNextPage,
      hasPreviousPage: p.hasPreviousPage,
    };
  },

  createTab: async (tabData: Omit<TabFormInputs, 'id'>) => {
    await fakeDelay();
    const newTab = { ...tabData, id: String(Date.now()) };
    tabs.push(newTab as any);
    return { success: true, data: newTab, message: null, errors: [] };
  },

  updateTab: async (id: string, tabData: Partial<TabConfig>) => {
    await fakeDelay();
    tabs = tabs.map(t => t.id === id ? { ...t, ...tabData } : t);
    return { success: true, data: tabs.find(t => t.id === id), message: null, errors: [] };
  },

  deleteTab: async (id: string) => {
    await fakeDelay();
    tabs = tabs.filter(t => t.id !== id);
    return { success: true, data: null, message: null, errors: [] };
  },

  getTabDetails: async (id: string) => {
    await fakeDelay();
    const tab = tabs.find(t => t.id === id);
    return { success: true, data: tab, message: null, errors: [] };
  },
};
