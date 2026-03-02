// @ts-nocheck
import { MOCK_EVENTS, MOCK_EVENT_CATEGORIES, fakeDelay, paginate } from '@shared/mockData/mockDb';
import type { PaginatedApiResponse } from '@admin/types/api-response';
import type {
  EventItem,
  EventCategory,
  EventApiParams,
  EventCategoryApiParams,
  EventFormInputs,
  EventCategoryFormInputs,
} from '@admin/types/operational-calendar.type';

let events = [...MOCK_EVENTS];
let eventCategories = [...MOCK_EVENT_CATEGORIES];

export const OperationalCalendarService = {
  getAllEvents: async (params: EventApiParams): Promise<PaginatedApiResponse<EventItem>> => {
    await fakeDelay();
    let items = [...events];
    if (params['FilterDto.Title']) items = items.filter(e => e.title.includes(params['FilterDto.Title']!));
    if (params['FilterDto.CategoryId']) items = items.filter(e => e.categoryId === Number(params['FilterDto.CategoryId']));
    const p = paginate(items, params['Pagination.PageNumber'] ?? 1, params['Pagination.PageSize'] ?? 10);
    return {
      success: true,
      data: { items: p.items as EventItem[], ...p, pageNumber: p.pageNumber },
      message: null,
      errors: [],
    };
  },

  getEventById: async (id: string | number): Promise<EventItem> => {
    await fakeDelay();
    const e = events.find(x => x.id === Number(id));
    if (!e) throw new Error('Event not found');
    return e as unknown as EventItem;
  },

  createEvent: async (data: EventFormInputs): Promise<EventItem> => {
    await fakeDelay();
    const newItem = { ...data, id: Date.now() } as unknown as EventItem;
    events.push(newItem as any);
    return newItem;
  },

  updateEvent: async (id: string | number, data: Partial<EventFormInputs>): Promise<EventItem> => {
    await fakeDelay();
    events = events.map(e => e.id === Number(id) ? { ...e, ...data } : e);
    return events.find(e => e.id === Number(id)) as unknown as EventItem;
  },

  deleteEvent: async (id: string | number): Promise<void> => {
    await fakeDelay();
    events = events.filter(e => e.id !== Number(id));
  },

  getEventCategories: async (): Promise<EventCategory[]> => {
    await fakeDelay();
    return [...eventCategories] as unknown as EventCategory[];
  },

  getAllEventCategories: async (params: EventCategoryApiParams): Promise<PaginatedApiResponse<EventCategory>> => {
    await fakeDelay();
    let items = [...eventCategories];
    if (params.searchTerm) items = items.filter(c => c.name.includes(params.searchTerm!));
    const p = paginate(items, params['Pagination.PageNumber'] ?? 1, params['Pagination.PageSize'] ?? 10);
    return {
      success: true,
      data: { items: p.items as EventCategory[], ...p, pageNumber: p.pageNumber },
      message: null,
      errors: [],
    };
  },

  getEventCategoryById: async (id: string | number): Promise<EventCategory> => {
    await fakeDelay();
    const cat = eventCategories.find(c => c.id === Number(id));
    if (!cat) throw new Error('Category not found');
    return cat as unknown as EventCategory;
  },

  createEventCategory: async (data: EventCategoryFormInputs): Promise<EventCategory> => {
    await fakeDelay();
    const newCat = { ...data, id: Date.now() };
    eventCategories.push(newCat as any);
    return newCat as unknown as EventCategory;
  },

  updateEventCategory: async (id: string | number, data: Partial<EventCategoryFormInputs>): Promise<EventCategory> => {
    await fakeDelay();
    eventCategories = eventCategories.map(c => c.id === Number(id) ? { ...c, ...data } : c);
    return eventCategories.find(c => c.id === Number(id)) as unknown as EventCategory;
  },

  deleteEventCategory: async (id: string | number): Promise<void> => {
    await fakeDelay();
    eventCategories = eventCategories.filter(c => c.id !== Number(id));
  },
};
