import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { useFirebase } from '../context/Firebase';

export default function Modal({ user, onClose, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef();

  const firebase = useFirebase();

  // Initialize selected user ID from user prop
  useEffect(() => {
    // User ID comes from the selected user in admin panel
  }, [user.id]);

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);

      if (!name || !email || !password || !role || role === "") {
        setError("All fields are required");
        return;
      }

      await firebase.updateUser(user.id, {
        name,
        email,
        password,
        role,
      });

      if (onSave) {
        onSave();
      }

      onClose();
    } catch (err) {
      console.error("Update failed", err);
      setError(err.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

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
    if (!selectedFile || !user?.id) {
      setError("Missing file or user ID");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const url = await firebase.adminUpdatePhoto(user.id, selectedFile);

      console.log("Updated photo URL:", url);
      setSelectedFile(null);
      setPreview(null);

      // Refresh user list if callback provided
      if (onSave) {
        onSave();
      }
    } catch (err) {
      console.error("Upload failed", err);
      setError(err.message || "Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/50 flex items-center justify-center">
      <div className="bg-card p-4 md:p-6 rounded-lg w-96">
        <h2 className="text-text-primary text-2xl pb-4 border-b border-border font-body">
          Edit User
        </h2>
        <div className="my-5 text-center">
          <img
            src={
              preview ||
              user.userPhoto ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
            alt="Profile"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="w-25 h-25 mb-3 mx-auto rounded-full object-cover cursor-pointer border-4 border-border"
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
                size="sm"
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
                size="sm"
                className="mx-auto"
              >
                Change Photo
              </Button>
            )}
            {/* {uploading && (
              <p className="text-brand text-sm mt-2 text-center">Uploading...</p>
            )} */}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
          {error && (
            <div className="col-span-2 p-3 bg-danger-soft border border-danger-subtle rounded-base text-danger-strong text-sm">
              {error}
            </div>
          )}
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-2.5 text-sm font-body text-text-primary"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input-bg border border-input-bg text-text-primary text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Type product name"
              required=""
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-body text-text-primary"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input-bg border border-input-bg text-text-primary text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              required=""
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="password"
              className="block mb-2.5 text-sm font-body text-text-primary"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input-bg border border-input-bg text-text-primary text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              required=""
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="role"
              className="block mb-2.5 text-sm font-body text-text-primary"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full px-3 py-2.5 bg-input-bg border border-input-bg text-text-primary text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            >
              <option selected="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleSubmit}
            disabled={saving}
            variant="primary"
            size="md"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
