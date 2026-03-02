// @ts-nocheck
import {
  MOCK_WIDGETS,
  MOCK_WIDGET_CATEGORIES,
  MOCK_WIDGET_TYPES,
  MOCK_APP_ROLES,
  MOCK_TAB_VISIBILITY,
  MOCK_SERVICE_CATALOG_PARENTS,
  fakeDelay,
  paginate,
} from '@shared/mockData/mockDb';

export interface WidgetListParams { pageNumber?: number; pageSize?: number; name?: string; widgetType?: number; status?: number; categoryId?: number; sortBy?: string; sortDirection?: string; }
export interface CategoryItem { id: string; name: string; }
export interface CategoryDictionaryItem { id: string; name: string; nameLa: string; deletable: boolean; }
export interface WidgetTypeItem { key: string | number; value: string; }
export interface WidgetData { id?: number | string; name: string; nameLa?: string; status?: number; widgetType?: number; tabWidgetCategoryId?: number; url?: string; parentId?: number;[key: string]: unknown; }
export interface CategoryFormData { name: string; nameLa: string; }
export interface UserWidgetSubData { id?: number | string; name: string; nameLa: string; url: string; parentId?: any; widgetType: number; icon?: any; darkModeIcon?: string; }
export interface ServiceCatalogParent { id: number; name: string; nameLa: string; }

let widgets = [...MOCK_WIDGETS];
let categories = [...MOCK_WIDGET_CATEGORIES];

export const WidgetService = {
  getAll: async (params: WidgetListParams = {}) => {
    await fakeDelay();
    let items = [...widgets];
    if (params.name) items = items.filter(w => w.name.includes(params.name!));
    if (params.widgetType !== undefined) items = items.filter(w => w.widgetType === params.widgetType);
    if (params.status !== undefined) items = items.filter(w => w.status === params.status);
    if (params.categoryId !== undefined) items = items.filter(w => w.tabWidgetCategoryId === params.categoryId);
    const p = paginate(items, params.pageNumber ?? 1, params.pageSize ?? 10);
    return { success: true, data: { items: p.items, ...p, pageNumber: p.pageNumber }, message: null, errors: [] };
  },

  getById: async (id: number | string) => {
    await fakeDelay();
    return { success: true, data: widgets.find(w => w.id === Number(id)), message: null, errors: [] };
  },

  create: async (data: WidgetData) => {
    await fakeDelay();
    const newItem = { ...data, id: Date.now() };
    widgets.push(newItem as any);
    return { success: true, data: newItem, message: null, errors: [] };
  },

  update: async (data: WidgetData) => {
    await fakeDelay();
    widgets = widgets.map(w => w.id === Number(data.id) ? { ...w, ...data } : w);
    return { success: true, data: widgets.find(w => w.id === Number(data.id)), message: null, errors: [] };
  },

  getCategories: async (): Promise<CategoryItem[]> => {
    await fakeDelay();
    return categories.map(c => ({ id: c.id, name: c.name }));
  },

  getCategoriesWidget: async (): Promise<CategoryItem[]> => {
    await fakeDelay();
    return categories.map(c => ({ id: c.id, name: c.name }));
  },

  getWidgetTypes: async (): Promise<WidgetTypeItem[]> => {
    await fakeDelay();
    return MOCK_WIDGET_TYPES;
  },

  delete: async (id: string | number) => {
    await fakeDelay();
    widgets = widgets.filter(w => w.id !== Number(id));
    return { success: true, data: null, message: null, errors: [] };
  },

  createUserWidgetSub: async (data: UserWidgetSubData) => {
    await fakeDelay();
    return { success: true, data, message: null, errors: [] };
  },

  updateUserWidgetSub: async (data: UserWidgetSubData) => {
    await fakeDelay();
    return { success: true, data, message: null, errors: [] };
  },

  getUserWidgetSub: async (_params: any) => {
    await fakeDelay();
    return [];
  },

  deleteUserWidgetSub: async (_id: string | number) => {
    await fakeDelay();
    return { success: true, data: null, message: null, errors: [] };
  },

  getAllServiceCatalogParents: async (): Promise<ServiceCatalogParent[]> => {
    await fakeDelay();
    return MOCK_SERVICE_CATALOG_PARENTS;
  },
};

export const WidgetCategoryService = {
  create: async (data: CategoryFormData) => {
    await fakeDelay();
    const newCat = { ...data, id: String(Date.now()), deletable: true };
    categories.push(newCat);
    return { success: true, data: newCat, message: null, errors: [] };
  },

  update: async (id: number, data: CategoryFormData) => {
    await fakeDelay();
    categories = categories.map(c => c.id === String(id) ? { ...c, ...data } : c);
    return { success: true, data: categories.find(c => c.id === String(id)), message: null, errors: [] };
  },

  delete: async (id: number) => {
    await fakeDelay();
    categories = categories.filter(c => c.id !== String(id));
    return { success: true, data: null, message: null, errors: [] };
  },

  getDictionary: async (): Promise<CategoryDictionaryItem[]> => {
    await fakeDelay();
    return categories as CategoryDictionaryItem[];
  },
};

export const AppRolesService = {
  getDictionary: async (): Promise<any[]> => {
    await fakeDelay();
    return MOCK_APP_ROLES;
  },

  getTabVisibilityList: async () => {
    await fakeDelay();
    return { success: true, data: MOCK_TAB_VISIBILITY, message: null, errors: [] };
  },
};
