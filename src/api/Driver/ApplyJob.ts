import { applyJob } from 'src/types/applyjob';
import requestWebDriver from 'src/utils/axios';

export const applyForJob = async (driverDetails: applyJob) => {
  try {
    const response = await requestWebDriver.post('/api/v1/driver/apply-job', driverDetails);
    return response.data;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};
