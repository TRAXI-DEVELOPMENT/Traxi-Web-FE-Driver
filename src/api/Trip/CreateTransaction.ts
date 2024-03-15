import requestWebDriver from 'src/utils/axios';
import { TransactionProps } from 'src/types/transaction';

export const createTransaction = async (props: TransactionProps) => {
  try {
    const response = await requestWebDriver.post('/api/v1/transaction', props);
    return response.data;
  } catch (error) {
    console.error('Error when calling createTransaction:', error);
    throw error;
  }
};
