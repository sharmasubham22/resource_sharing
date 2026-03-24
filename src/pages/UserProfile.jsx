import React, { useState, useEffect, useRef } from 'react'
import { useFirebase } from '../context/Firebase'
import Button from '../components/Button';

export default function UserProfile() {
    const firebase = useFirebase();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();

    useEffect(() => {
      if (!selectedFile) {
        setPreview(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onFileChange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) setSelectedFile(file);
    };

    const uploadPhoto = async () => {
      if (!selectedFile) return;
      try {
        setUploading(true);
        await firebase.updateProfilePhoto(selectedFile);
        setSelectedFile(null);
      } catch (err) {
        console.error('Upload failed', err);
      } finally {
        setUploading(false);
      }
    };

  return (
    <div className="text-left max-w-2xl mx-auto my-10">
      <div className="mb-5 text-center">
        <img
          src={
            preview ||
            firebase.user?.userPhoto ||
            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          }
          alt="Profile"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="w-32 h-32 mb-3 mx-auto rounded-full object-cover cursor-pointer border-4 border-border"
        />
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          {selectedFile ? (
            <Button
              onClick={uploadPhoto}
              disabled={uploading}
              variant="secondary"
              size="md"
              className="mx-auto"
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </Button>
          ) : (
            <Button
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
              variant="primary"
              size="md"
              className="mx-auto"
            >
              Change Photo
            </Button>
          )}
        </div>
      </div>
      <p className="text-center text-text-primary font-body text-3xl">
        {firebase.user?.name}
      </p>
      <p className='text-text-secondary text-center text-lg font-body'>{firebase.user?.email}</p>
    </div>
  );
}
