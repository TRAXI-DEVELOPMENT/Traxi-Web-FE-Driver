import requestWebDriver from 'src/utils/axios';

export const uploadFile = async (file: File, url: string) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await requestWebDriver.post(url, formData);
    console.log('File uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
