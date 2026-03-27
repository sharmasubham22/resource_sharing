import React, { useEffect, useState } from 'react'
import Button from './Button';
import { useFirebase } from '../context/Firebase';

export default function MessageModal({message, onClose, onSave}) {
    const [status, setStatus] = useState(message.status);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const firebase = useFirebase();

    useEffect(() => {
        // User ID comes from the selected user in admin panel
      }, [message.id]);

     const handleSubmit = async () => {
       try {
         setSaving(true);
         setError(null);

         if ( !status || status === "") {
           setError("Status is necessary to be updated");
           return;
         }

         await firebase.updateMessage(message.id, {
           status
         });

         if (onSave) {
           onSave();
         }

         onClose();
       } catch (err) {
         console.error("Update failed", err);
         setError(err.message || "Failed to update message");
       } finally {
         setSaving(false);
       }
     };


  return (
    <div className="fixed inset-0 bg-background/50 flex items-center justify-center">
      <div className="bg-card p-4 md:p-6 rounded-lg w-96">
        <h2 className="text-text-primary text-2xl pb-4 border-b border-border font-body">
          Message Details
        </h2>
        <div className="my-5">
          <label
            htmlFor="name"
            className="block mb-2.5 text-sm font-body text-text-secondary"
          >
            Message
          </label>
          <p id="name" className="block w-full text-text-primary text-sm">
            {message.message}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2.5 text-sm font-body text-text-secondary"
          >
            Sent By
          </label>
          <p id="name" className="block w-full text-text-primary text-sm">
            {message.userName}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-body text-text-secondary"
          >
            Email Address
          </label>
          <p id="email" className="block w-full text-text-primary text-sm">
            {message.email}
          </p>
        </div>
        <div>
          <label
            htmlFor="role"
            className="block mb-2.5 text-sm font-body text-text-primary"
          >
            Change status
          </label>
          <select
            id="role"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full px-3 py-2.5 bg-input-bg border border-input-bg text-text-primary text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          >
            <option selected="">Select Role</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
          </select>
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
