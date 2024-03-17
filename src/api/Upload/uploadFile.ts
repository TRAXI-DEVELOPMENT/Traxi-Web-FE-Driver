import { AxiosResponse } from 'axios';
import requestWebDriver from 'src/utils/axios';

export const uploadFile = async (file: File): Promise<AxiosResponse<any>> => {
  const formData = new FormData();
  formData.append('ImageUrl', file);
  console.log(file);
  try {
    const response = await requestWebDriver.post('/api/v1/upload', formData);
    console.log('File uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const uploadFileAvatar = async (file: File): Promise<AxiosResponse<any>> => {
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

export const patchDriverAvatar = async (
  driverId: string,
  imageUrl: string
): Promise<AxiosResponse<any>> => {
  const body = {
    DriverId: driverId,
    ImageUrl: imageUrl,
  };
  try {
    const response = await requestWebDriver.patch('/api/v1/driver/change-avatar', body);
    console.log('Avatar updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};
