import React, { createContext, useContext, useState, ReactNode } from 'react';

const UploadContext = createContext<
  { response: any; setResponse: React.Dispatch<React.SetStateAction<any>> } | undefined
>(undefined);

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within a UploadProvider');
  }
  return context;
};

interface UploadProviderProps {
  children: ReactNode;
}

export const UploadProvider: React.FC<UploadProviderProps> = ({ children }) => {
  const [response, setResponse] = useState<any>(null);

  return (
    <UploadContext.Provider value={{ response, setResponse }}>{children}</UploadContext.Provider>
  );
};
