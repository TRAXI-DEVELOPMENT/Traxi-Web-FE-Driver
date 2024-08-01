import { DriverDegreeProps, applyJob } from 'src/types/applyjob';
import requestWebDriver from 'src/utils/axios';

export const applyForJob = async ({
  Fullname,
  Phone,
  Address,
  Birthday,
  Password,
}: applyJob): Promise<any> => {
  try {
    const response = await requestWebDriver.post('/api/v1/driver/apply-job', {
      Fullname,
      Phone,
      Address,
      Birthday,
      Password,
    });
    return response.data.result;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

export const postDriverDegree = async ({
  DriverId,
  DateDegree,
  DegreeName,
  Type,
  ImageUrl,
}: DriverDegreeProps) => {
  try {
    const response = await requestWebDriver.post('/api/v1/driverdegree', {
      DriverId,
      DateDegree,
      DegreeName,
      Type,
      ImageUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting driver degree:', error);
    throw error;
  }
};
