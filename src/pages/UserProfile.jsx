import React from 'react'
import { useFirebase } from '../context/Firebase'

export default function UserProfile() {
    const firebase = useFirebase();
  return (
    <div className="text-left inline-block w-100">
        <img src={firebase.user?.userPhoto} className="w-50 h-50 mb-5 rounded-full" />
        <div className="mb-5">
          <label
            htmlFor="emailAddress"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Name
          </label>
          <input
            type="email"
            id="emailAddress"
            value={firebase.user?.name}
            //   onChange={on}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-fg-brand focus:border-fg-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="emailAddress"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            value={firebase.user?.email}
            //   onChange={on}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-fg-brand focus:border-fg-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
          />
        </div>
      <button className="bg-brand text-white px-4 py-2 rounded-base">Save Changes</button>
    </div>
  );
}
