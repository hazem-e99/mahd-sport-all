// @ts-nocheck
import { MOCK_FILES, fakeDelay } from '@shared/mockData/mockDb';

let files = [...MOCK_FILES];

export const UploadFile = {
  uploadFile: async (file: File, _parentId?: string, _visibility = 0) => {
    await fakeDelay();
    const newFile = {
      id: 'f' + Date.now(),
      name: file.name,
      type: 'file',
      parentId: _parentId ?? null,
      createdAt: new Date().toISOString(),
      size: file.size,
    };
    files.push(newFile as any);
    return { success: true, data: { path: `/uploads/${file.name}`, id: newFile.id }, message: null, errors: [] };
  },

  searchFile: async (keyword: string) => {
    await fakeDelay();
    const results = files.filter(f => f.name.toLowerCase().includes(keyword.toLowerCase()));
    return { success: true, data: results, message: null, errors: [] };
  },

  getAll: async () => {
    await fakeDelay();
    return { success: true, data: files, message: null, errors: [] };
  },

  createFolder: async (folderName: string, parentId?: string) => {
    await fakeDelay();
    const newFolder = { id: 'f' + Date.now(), name: folderName, type: 'folder', parentId: parentId ?? null, createdAt: new Date().toISOString() };
    files.push(newFolder as any);
    return { success: true, data: newFolder, message: null, errors: [] };
  },

  getFolderContents: async (folderId: string) => {
    await fakeDelay();
    const contents = files.filter(f => f.parentId === folderId);
    return { success: true, data: contents, message: null, errors: [] };
  },

  deleteFile: async (fileId: string) => {
    await fakeDelay();
    files = files.filter(f => f.id !== fileId);
    return { success: true, data: null, message: null, errors: [] };
  },

  moveFile: async (fileId: string, newParentId: string | null) => {
    await fakeDelay();
    files = files.map(f => f.id === fileId ? { ...f, parentId: newParentId } : f);
    return { success: true, data: null, message: null, errors: [] };
  },

  getFileMetaData: async (fileId: string) => {
    await fakeDelay();
    const file = files.find(f => f.id === fileId);
    return { success: true, data: file ?? null, message: null, errors: [] };
  },

  updatePermissions: async (_fileId: string, _visibility: number, _allowedRoleIds?: string[]) => {
    await fakeDelay();
    return { success: true, data: null, message: null, errors: [] };
  },
};
