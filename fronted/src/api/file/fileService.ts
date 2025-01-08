import apiClient from '../apiClient'

export enum FileApi {
  Upload = '/files/upload',
  Delete = '/files',
  Download = '/files',
  GetFile = '/files',
}

const uploadFile = (file: any) => apiClient.post({ url: FileApi.Upload, data: file })

const deleteFile = (id: string) => apiClient.delete({ url: `${FileApi.Delete}/${id}` })

const downloadFile = (id: string) => apiClient.get({ url: `${FileApi.Download}/${id}` })

const getFile = () => apiClient.get({ url: FileApi.GetFile })

export default {
  uploadFile,
  deleteFile,
  downloadFile,
  getFile,
}
