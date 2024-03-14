import requestWebDriver from 'src/utils/axios';

export const getDriverDegree = async (driverId: string) => {
  try {
    const response = await requestWebDriver.get(`/api/v1/driver-degree/${driverId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching driver degree:', error);
    throw error;
  }
};
