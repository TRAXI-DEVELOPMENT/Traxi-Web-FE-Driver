import React, { useState, useRef } from 'react';
import { uploadFile } from 'src/api/Upload/uploadFile';
import { Button } from '@mui/material';

const FileUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<any>(null); // Quản lý trạng thái response trực tiếp

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const responseFromAPI = await uploadFile(file);
      setResponse(responseFromAPI);
      setMessage('File đã được tải lên thành công!');
      localStorage.setItem('fileUploadResponse', JSON.stringify(responseFromAPI));
      console.log('Phản hồi từ API:', responseFromAPI);
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      setMessage('Lỗi khi tải file. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      handleUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={uploading}
        ref={fileInputRef}
      />
      <Button variant="contained" component="span" onClick={handleButtonClick} disabled={uploading}>
        {uploading ? 'Đang tải lên...' : 'Tải lên'}
      </Button>
    </div>
  );
};

export default FileUploadPage;
