import { AxiosResponse } from 'axios';
import requestWebDriver from 'src/utils/axios';

export const uploadFile = async (file: File): Promise<AxiosResponse<any>> => {
  const formData = new FormData();
  formData.append('ImageUrl', file);
  console.log(file);
  try {
    const response = await requestWebDriver.post('/api/v1/upload', formData);
    console.log('File uploaded successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
