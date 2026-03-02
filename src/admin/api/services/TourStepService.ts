import { MOCK_TOUR_STEPS, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type { ApiEnvelope, TourStep, TourStepCreatePayload, TourStepUpdatePayload } from '@admin/types/tour-step.type';

let tourSteps = [...MOCK_TOUR_STEPS];

export const TourStepService = {
  getAll: async (params?: any) => {
    await fakeDelay();
    let items = [...tourSteps];
    if (params?.searchTerm) items = items.filter(s => s.title.includes(params.searchTerm) || s.titleLa.toLowerCase().includes(params.searchTerm.toLowerCase()));
    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      data: p.items as TourStep[],
      totalCount: p.totalCount,
      currentPage: p.pageNumber,
      totalPages: p.totalPages,
      hasNextPage: p.hasNextPage,
      hasPreviousPage: p.hasPreviousPage,
    };
  },

  getById: async (id: number | string): Promise<TourStep> => {
    await fakeDelay();
    const step = tourSteps.find(s => s.id === Number(id));
    if (!step) throw new Error('Tour step not found');
    return step as unknown as TourStep;
  },

  async create(payload: TourStepCreatePayload): Promise<TourStep> {
    await fakeDelay();
    const newStep = { ...payload, id: Date.now() };
    tourSteps.push(newStep as any);
    return newStep as unknown as TourStep;
  },

  async update(payload: TourStepUpdatePayload): Promise<TourStep> {
    await fakeDelay();
    tourSteps = tourSteps.map(s => s.id === (payload as any).id ? { ...s, ...payload } : s);
    return tourSteps.find(s => s.id === (payload as any).id) as unknown as TourStep;
  },

  async remove(id: number): Promise<void> {
    await fakeDelay();
    tourSteps = tourSteps.filter(s => s.id !== id);
  },
};
