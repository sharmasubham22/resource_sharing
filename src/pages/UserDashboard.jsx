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
      <div className="mt-10">
        <UserProfile />
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
                  className="inline-block p-4 border-b-2 rounded-t-base hover:text-fg-brand hover:border-brand"
                  id="resource-styled-tab"
                  data-tabs-target="#styled-resource"
                  type="button"
                  role="tab"
                  aria-controls="resource"
                  aria-selected="false"
                >
                  My Resources
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-base hover:text-fg-brand hover:border-brand"
                  id="blog-styled-tab"
                  data-tabs-target="#styled-blog"
                  type="button"
                  role="tab"
                  aria-controls="blog"
                  aria-selected="false"
                >
                  My Blogs
                </button>
              </li>
            </ul>
          </div>
          <div id="default-styled-tab-content">
            <div
              className="hidden"
              id="styled-resource"
              role="tabpanel"
              aria-labelledby="resource-tab"
            >
              <a
                href="/add-resource"
                className="bg-brand text-white p-4 rounded-lg hover:bg-brand-strong transition-colors sm:float-end mb-6 mx-5"
              >
                <span className="inline-flex">
                  Add a new Resource
                  <svg
                    className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                </span>
              </a>
              <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
                {myResources.length === 0 ? (
                  <p className="text-center">
                    You haven't added any resources yet
                  </p>
                ) : (
                  myResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      id={resource.id}
                      {...resource.data()}
                    />
                  ))
                )}
              </div>
            </div>
            <div
              className="hidden p-4"
              id="styled-blog"
              role="tabpanel"
              aria-labelledby="blog-tab"
            >
              <a
                href="#"
                className="bg-brand text-white p-4 rounded-lg hover:bg-brand-strong transition-colors md:float-end mb-6 mx-5"
              >
                <span className="inline-flex">
                  Write a new Blog
                  <svg
                    className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                </span>
              </a>
              <div className="my-20">Blogs</div>
            </div>
          </div>
        </div>
      </div>
    );
}
