import { fakeDelay } from '@shared/mockData/mockDb';

export const updateEmployeesFromAzureAD = async () => {
    await fakeDelay();
    return { success: true, message: 'Employees sync simulated (static mode)', data: null };
};
