import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutData {
  Fullname: string;
  Phone: string;
  Address: string;
  Password: string;
  confirmPassword: string;
  expirationDate?: string;
  licenseType?: string;
}

interface CheckoutContextType {
  checkoutData: CheckoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

interface CheckoutProviderProps {
  children: ReactNode; // Sử dụng ReactNode để định nghĩa kiểu cho children
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    Fullname: '',
    Phone: '',
    Address: '',
    Password: '',
    confirmPassword: '',
  });

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
