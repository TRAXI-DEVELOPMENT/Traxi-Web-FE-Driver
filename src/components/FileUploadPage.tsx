import React, { useState } from 'react';
import { uploadFile } from 'src/api/Upload/uploadFile'; // Đảm bảo đường dẫn đúng

const FileUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      try {
        await uploadFile(selectedFile);
        setMessage('File đã được tải lên thành công!');
      } catch (error) {
        console.error('Lỗi khi tải file:', error);
        setMessage('Lỗi khi tải file. Vui lòng thử lại.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <h2>Tải File lên</h2>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      <button onClick={handleUpload} disabled={uploading || !selectedFile}>
        {uploading ? 'Đang tải...' : 'Tải lên'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploadPage;