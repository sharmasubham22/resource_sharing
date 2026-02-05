import {React, useState, useEffect} from 'react'
import { useFirebase } from '../context/Firebase'
import ResourceCard from '../components/ResourceCard';
import UserProfile from './UserProfile';

export default function UserDashboard() {
  const firebase = useFirebase();
      const [myResources, setMyResources] = useState([]);

      useEffect(() => {
    
        firebase.getMyResources()
          .then(resources => setMyResources(resources?.docs || []))
          .catch(err => {
            console.error("Error fetching my resources:", err);
            setMyResources([]);
          });
      }, [firebase.user]);
      

    return (
      <div>
        <div className="mb-4">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center items-center justify-center"
            id="default-styled-tab"
            data-tabs-toggle="#default-styled-tab-content"
            data-tabs-active-classes="text-fg-brand hover:text-fg-brand border-fg-brand"
            data-tabs-inactive-classes="dark:border-transparent text-body hover:text-fg-brand border-default hover:border-brand"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 rounded-t-base"
                id="profile-styled-tab"
                data-tabs-target="#styled-profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                My Profile
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 rounded-t-base hover:text-fg-brand hover:border-brand"
                id="dashboard-styled-tab"
                data-tabs-target="#styled-dashboard"
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected="false"
              >
                My Resources
              </button>
            </li>
          </ul>
        </div>
        <div id="default-styled-tab-content">
          <div
            className="hidden p-4"
            id="styled-profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <UserProfile />
          </div>
          <div
            className="hidden"
            id="styled-dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            <a
              href="/add-resource"
              className="bg-brand text-white p-4 rounded-lg hover:bg-brand-strong transition-colors md:float-end mb-6"
            >
              Add a new Resource 
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </a>
            <div className="mt-5 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {myResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  id={resource.id}
                  {...resource.data()}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
