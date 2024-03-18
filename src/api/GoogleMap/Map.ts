import requestWebDriver from 'src/utils/axios';

interface PositionResponse {
  result: {
    originLatLng: string;
    destinationLatLng: string;
    TripId: string;
  };
  error: any;
}

export const getPositionById = async (id: string): Promise<PositionResponse> => {
  try {
    const response = await requestWebDriver.get(`/api/v1/position/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching position data:', error);
    throw error;
  }
};
