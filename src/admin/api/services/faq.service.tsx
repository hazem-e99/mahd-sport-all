import { MOCK_FAQS, MOCK_FAQ_CATEGORIES, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type { PaginatedData } from '@admin/types/api-response';

let faqs = [...MOCK_FAQS];
let categories = [...MOCK_FAQ_CATEGORIES];

export interface FaqCategory {
  id: number;
  arabicName: string;
  englishName: string;
}

export interface FaqCategoryFormData {
  arabicName: string;
  englishName: string;
}

export const FaqService = {
  getAll: async (params: any = {}): Promise<PaginatedData<any>> => {
    await fakeDelay();
    const p = paginate(faqs, params['Pagination.PageNumber'] ?? 1, params['Pagination.PageSize'] ?? 10);
    return {
      success: true,
      data: { items: p.items, totalCount: p.totalCount, pageNumber: p.pageNumber, totalPages: p.totalPages, hasNextPage: p.hasNextPage, hasPreviousPage: p.hasPreviousPage },
      message: null,
      errors: [],
    } as unknown as PaginatedData<any>;
  },

  getById: async (id: string | number) => {
    await fakeDelay();
    return faqs.find(f => f.id === Number(id)) ?? null;
  },

  create: async (data: any) => {
    await fakeDelay();
    const newItem = { ...data, id: Date.now() };
    faqs.push(newItem);
    return { success: true, data: newItem, message: null, errors: [] };
  },

  update: async (data: any) => {
    await fakeDelay();
    faqs = faqs.map(f => f.id === data.id ? { ...f, ...data } : f);
    return { success: true, data: faqs.find(f => f.id === data.id), message: null, errors: [] };
  },

  delete: async (id: string | number) => {
    await fakeDelay();
    faqs = faqs.filter(f => f.id !== Number(id));
    return { success: true, data: null, message: null, errors: [] };
  },

  getCategories: async (): Promise<{ data: any[] }> => {
    await fakeDelay();
    return { data: categories };
  },

  getCategoriesAll: async (): Promise<any[]> => {
    await fakeDelay();
    return categories;
  },

  createCategory: async (data: any): Promise<FaqCategory> => {
    await fakeDelay();
    const newCat = { ...data, id: Date.now() } as FaqCategory;
    categories.push(newCat);
    return newCat;
  },

  updateCategory: async (id: number, data: any): Promise<FaqCategory> => {
    await fakeDelay();
    categories = categories.map(c => c.id === id ? { ...c, ...data } : c);
    return categories.find(c => c.id === id) as FaqCategory;
  },

  deleteCategory: async (id: number): Promise<void> => {
    await fakeDelay();
    categories = categories.filter(c => c.id !== id);
  },
};

export const FaqCategoryService = {
  getAll: async (): Promise<FaqCategory[]> => {
    await fakeDelay();
    return [...categories];
  },

  getById: async (id: number): Promise<FaqCategory> => {
    await fakeDelay();
    const cat = categories.find(c => c.id === id);
    if (!cat) throw new Error('Category not found');
    return cat;
  },

  create: async (data: FaqCategoryFormData): Promise<FaqCategory> => {
    await fakeDelay();
    const newCat = { ...data, id: Date.now() };
    categories.push(newCat);
    return newCat;
  },

  update: async (id: number, data: FaqCategoryFormData): Promise<FaqCategory> => {
    await fakeDelay();
    categories = categories.map(c => c.id === id ? { ...c, ...data } : c);
    return categories.find(c => c.id === id) as FaqCategory;
  },

  delete: async (id: number): Promise<void> => {
    await fakeDelay();
    categories = categories.filter(c => c.id !== id);
  },
};