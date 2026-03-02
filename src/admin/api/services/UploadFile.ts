// @ts-nocheck
import { MOCK_FILES, fakeDelay } from '@shared/mockData/mockDb';

let files = [...MOCK_FILES];

export const UploadFile = {
  uploadFile: async (file: File, _parentId?: string, _visibility = 0) => {
    await fakeDelay();
    const newFile = {
      id: 'f' + Date.now(),
      fileName: file.name,
      type: 'File',
      parentId: _parentId ?? null,
      createdAt: new Date().toISOString(),
      size: file.size,
      contentType: file.type,
      extension: file.name.split('.').pop() || '',
      filePath: `/uploads/${file.name}`,
      visiblity: _visibility === 1 ? "Restricted" : "Public"
    };
    files.push(newFile as any);
    return { success: true, data: newFile, message: null, errors: [] };
  },

  searchFile: async (keyword: string) => {
    await fakeDelay();
    const results = files.filter(f => f.fileName.toLowerCase().includes(keyword.toLowerCase()));
    return { success: true, data: results, message: null, errors: [] };
  },

  getAll: async () => {
    await fakeDelay();
    return { success: true, data: files, message: null, errors: [] };
  },

  createFolder: async (folderName: string, parentId?: string) => {
    await fakeDelay();
    const newFolder = {
      id: 'f' + Date.now(),
      fileName: folderName,
      type: 'Folder',
      parentId: parentId ?? null,
      createdAt: new Date().toISOString(),
      contentType: '',
      extension: '',
      size: 0,
      filePath: '',
      visiblity: "Public"
    };
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
