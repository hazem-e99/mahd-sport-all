import type { CardControlFilters, CardControlResponse } from '@admin/types/card-control.type';
import { MOCK_EMPLOYEES, MOCK_DEPARTMENTS, fakeDelay, paginate } from '@shared/mockData/mockDb';

let employees = [...MOCK_EMPLOYEES];

export class CardControlService {
  static async getEmployees(filters: CardControlFilters): Promise<CardControlResponse> {
    await fakeDelay();
    let items = [...employees];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      items = items.filter(e =>
        e.fullNameEn.toLowerCase().includes(s) ||
        e.fullNameAr.includes(s) ||
        e.email.toLowerCase().includes(s)
      );
    }

    if (filters.filterBy === 'show') items = items.filter(e => e.status === true);
    if (filters.filterBy === 'hide') items = items.filter(e => e.status === false);
    if (filters.department) items = items.filter(e => e.department === filters.department);

    const p = paginate(items, filters.pageNumber, filters.pageSize);
    return {
      success: true,
      data: {
        items: p.items as any,
        totalCount: p.totalCount,
        pageNumber: p.pageNumber,
        totalPages: p.totalPages,
        hasNextPage: p.hasNextPage,
        hasPreviousPage: p.hasPreviousPage,
      },
    } as unknown as CardControlResponse;
  }

  static async getDepartments(): Promise<string[]> {
    await fakeDelay();
    return [...MOCK_DEPARTMENTS];
  }

  static async updateEmployeeStatus(email: string, status: boolean): Promise<{ success: boolean; message?: string }> {
    await fakeDelay();
    employees = employees.map(e => e.email === email ? { ...e, status } : e);
    return { success: true, message: 'تم التحديث بنجاح' };
  }

  static async updateEmployee(updateData: {
    email: string;
    status: boolean;
    orderIndex: number;
    photoPath: string | null;
  }): Promise<{ success: boolean; message?: string }> {
    await fakeDelay();
    employees = employees.map(e =>
      e.email === updateData.email
        ? { ...e, status: updateData.status, orderIndex: updateData.orderIndex, photoPath: updateData.photoPath ?? e.photoPath }
        : e
    );
    return { success: true, message: 'تم التحديث بنجاح' };
  }
}
