import { DriverDegreeProps, applyJob } from 'src/types/applyjob';
import requestWebDriver from 'src/utils/axios';

export const applyForJob = async ({
  Fullname,
  Phone,
  Address,
  Password,
}: applyJob): Promise<any> => {
  try {
    const response = await requestWebDriver.post('/api/v1/driver/apply-job', {
      Fullname: Fullname,
      Phone: Phone,
      Address: Address,
      Password: Password,
    });
    return response.data;
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
      DriverId: DriverId,
      DateDegree: DateDegree,
      DegreeName: DegreeName,
      Type: Type,
      ImageUrl: ImageUrl,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting driver degree:', error);
    throw error;
  }
};
