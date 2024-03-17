import requestWebDriver from 'src/utils/axios';

export const loginDriver = async (phone: string, password: string) => {
  try {
    const response = await requestWebDriver.post('/api/v1/login/driver', {
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error when calling loginDriver:', error);
    throw error;
  }
};

export const changeDriverPassword = async (driverId: string, newPassword: string) => {
  try {
    console.log(driverId);
    console.log(newPassword);
    const response = await requestWebDriver.patch(`/api/v1/driver/password/${driverId}`, {
      Password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing driver password:', error);
    throw error;
  }
};
