import { CURRENT_ENV_CONFIG } from '@admin/constants/environment';

const BASE_URL = CURRENT_ENV_CONFIG.API_BASE_URL;

export const FILE_RECORD_API = {
  uploadFile: "/FileRecord/Upload",
  searchFile: (keyword: string) => `/FileRecord/Get?Q=${keyword}`,
  getAll: `/FileRecord/Get`,
  getFile: (objectId: string) => `${BASE_URL}/FileRecord/Download/${objectId}`,
  previewFile: (objectId: string) =>
    `${BASE_URL}/FileRecord/Preview/${objectId}`,
  createFolder: "/FileRecord/CreateFolder",
  getFolderContents: (id: string) => `/FileRecord/Get?Id=${id}`,
  deleteFile: (fileId: string) => `/FileRecord/Delete/${fileId}`,
  moveFile: `/FileRecord/UpdateParent`,
  getMetaData: (id: string) => `/FileRecord/File/MetaData/${id}`,
  updatePermissions: "/FileRecord/UpdatePermission",
};
