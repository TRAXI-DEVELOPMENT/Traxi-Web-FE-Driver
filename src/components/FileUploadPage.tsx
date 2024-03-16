import React, { useState } from 'react';
import { uploadFile } from 'src/api/Upload/uploadFile'; // Đảm bảo đường dẫn đúng

const FileUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<any>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const responseFromAPI = await uploadFile(file);
      setResponse(responseFromAPI);
      setMessage('File đã được tải lên thành công!');
      console.log('Phản hồi từ API:', responseFromAPI);
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      setMessage('Lỗi khi tải file. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      handleUpload(file); // Tự động tải file lên sau khi file được chọn
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploadPage;
