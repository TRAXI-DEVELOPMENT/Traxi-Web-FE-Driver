import { useEffect, useState } from 'react';

export const useDriverInfo = () => {
  const [driverId, setDriverId] = useState<string>('');

  useEffect(() => {
    const fetchDriverInfo = () => {
      const driverInfoString = localStorage.getItem('USER_INFO');
      if (driverInfoString) {
        const driverInfo = JSON.parse(driverInfoString);
        if (typeof driverInfo.id === 'string') {
          setDriverId(driverInfo.id);
        }
      }
    };

    fetchDriverInfo();
  }, []);

  return driverId;
};
