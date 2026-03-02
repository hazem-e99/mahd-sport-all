import type { PaginatedApiResponse } from '@admin/types/api-response';
import type { Campaign } from '@admin/types/campaign';
import type { ApiResponse, CampaignType, CampaignTypes, DictionaryItem } from '../api-type/api-type';
import {
  MOCK_CAMPAIGNS,
  MOCK_CAMPAIGN_TYPES,
  MOCK_VISIBILITY_OPTIONS,
  MOCK_APP_ROLES,
  fakeDelay,
  paginate,
} from '@shared/mockData/mockDb';

export interface CampaignDetails {
  id: number;
  name: string;
  campaignTypeId: number;
  campaignTypeName: string | null;
  startDate: string;
  endDate: string;
  visibleToId: number;
  visibleToName: string;
  description: string;
  image: string;
  link: string;
  statusName: string;
  allowedRoleIds: number[];
}

export interface CampaignDetailsResponse {
  success: boolean;
  data: CampaignDetails;
  message: string | null;
  errors: string[];
}

let campaigns = [...MOCK_CAMPAIGNS];

export const CampaignService = {
  getAllCampaigns: async (params?: any): Promise<PaginatedApiResponse<Campaign>> => {
    await fakeDelay();
    let items = [...campaigns];
    if (params?.searchTerm) items = items.filter(c => c.name.includes(params.searchTerm));
    const p = paginate(items, params?.pageNumber ?? 1, params?.pageSize ?? 10);
    return {
      success: true,
      data: { items: p.items as unknown as Campaign[], totalCount: p.totalCount, pageNumber: p.pageNumber, totalPages: p.totalPages, hasNextPage: p.hasNextPage, hasPreviousPage: p.hasPreviousPage },
      message: null,
      errors: [],
    };
  },

  getCampaignDetails: async (id: string | number): Promise<CampaignDetails> => {
    await fakeDelay();
    const c = campaigns.find(x => x.id === Number(id));
    if (!c) throw new Error('Campaign not found');
    return c as unknown as CampaignDetails;
  },

  createCampaign: async (data: Omit<Campaign, 'id'>): Promise<Campaign> => {
    await fakeDelay();
    const newItem = { ...data, id: Date.now() } as Campaign;
    campaigns.push(newItem as any);
    return newItem;
  },

  updateCampaign: async (id: string | number, data: Partial<Campaign>): Promise<Campaign> => {
    await fakeDelay();
    campaigns = campaigns.map(c => c.id === Number(id) ? { ...c, ...data } : c);
    return campaigns.find(c => c.id === Number(id)) as unknown as Campaign;
  },

  deleteCampaign: async (id: string | number): Promise<{ success: boolean }> => {
    await fakeDelay();
    campaigns = campaigns.filter(c => c.id !== Number(id));
    return { success: true };
  },

  getCampaignTypes: async (): Promise<CampaignType[]> => {
    await fakeDelay();
    return MOCK_CAMPAIGN_TYPES as unknown as CampaignType[];
  },

  getAppRoles: async (): Promise<DictionaryItem[]> => {
    await fakeDelay();
    return MOCK_APP_ROLES as unknown as DictionaryItem[];
  },

  getVisibilityOptions: async (): Promise<DictionaryItem[]> => {
    await fakeDelay();
    return MOCK_VISIBILITY_OPTIONS as unknown as DictionaryItem[];
  },

  addCampaignType: async (data: CampaignType) => {
    await fakeDelay();
    return data;
  },

  getCampaignTypeDetails: async (id: string): Promise<ApiResponse<CampaignTypes>> => {
    await fakeDelay();
    const t = MOCK_CAMPAIGN_TYPES.find(x => x.id === Number(id));
    return { success: true, data: t as unknown as CampaignTypes, message: null, errors: [] };
  },

  updateCampaignType: async (_id: number, data: CampaignType): Promise<CampaignType> => {
    await fakeDelay();
    return data;
  },

  deleteCampaignType: async (_id: number) => {
    await fakeDelay();
    return { success: true };
  },
};