import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

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

  // Sử dụng useMemo để đối tượng value chỉ được tạo mới khi response thay đổi
  const value = useMemo(() => ({ response, setResponse }), [response]);

  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  );
};
