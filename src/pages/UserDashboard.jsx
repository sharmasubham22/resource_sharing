import {React, useState, useEffect} from 'react'
import { useFirebase } from '../context/Firebase'
import ResourceCard from '../components/ResourceCard';
import UserProfile from './UserProfile';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function UserDashboard() {
  const firebase = useFirebase();
  const [myResources, setMyResources] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    if (!firebase.user?.uid) return;

    firebase
      .getMyResources(firebase.user.uid)
      .then((res) => setMyResources(res))
      .catch((err) => {
        console.error(err);
        setMyResources([]);
      });

    firebase
      .getMyBlogs(firebase.user.uid)
      .then((blogs) => setMyBlogs(blogs))
      .catch((err) => {
        console.error(err);
        setMyBlogs([]);
      });
  }, [firebase.user]);    

  const nav = useNavigate();
    return (
      <div className="mt-10">
        <UserProfile />
        <div>
          <div className="mb-4">
            <ul
              className="flex flex-wrap -mb-px text-lg font-body text-center items-center justify-center"
              id="default-styled-tab"
              data-tabs-toggle="#default-styled-tab-content"
              data-tabs-active-classes="text-brand-medium hover:text-brand-medium border-brand-medium"
              data-tabs-inactive-classes="dark:border-transparent text-text-secondary hover:text-brand-medium border-default hover:border-brand"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-base hover:text-brand-medium hover:border-brand-medium"
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
                  className="inline-block p-4 border-b-2 rounded-t-base hover:text-brand-medium hover:border-brand-medium"
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
              <Button
                onClick={() => nav("/add-resource")}
                variant="primary"
                size="md"
                className="float-end mt-5 mr-10"
              >
                <span className="inline-flex text-sm md:text-base">
                  Add a new Resource
                  <svg
                    className="w-4 h-6 ms-1.5 rtl:rotate-180 -me-0.5"
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
              </Button>
              <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-5 md:p-10">
                {myResources.length === 0 ? (
                  <p className="text-center text-text-secondary">
                    You haven't added any resources yet
                  </p>
                ) : (
                  myResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      id={resource.id}
                      {...resource}
                      profile={true}
                      onDelete={() => {
                        setMyResources((prev) => prev.filter((r) => r.id !== resource.id));
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div
              className="hidden"
              id="styled-blog"
              role="tabpanel"
              aria-labelledby="blog-tab"
            >
              <Button
                onClick={() => nav("/add-blog")}
                variant="primary"
                size="md"
                className="float-end mt-5 mr-10"
              >
                <span className="inline-flex text-sm md:text-base">
                  Write a new Blog
                  <svg
                    className="w-4 h-6 ms-1.5 rtl:rotate-180 -me-0.5 "
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
              </Button>
              <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 md:p-10">
                {myBlogs.length === 0 ? (
                  <p className="text-center text-text-secondary">
                    You haven't written any blogs yet
                  </p>
                ) : (
                  myBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      {...blog}
                      profile={true}
                      onDelete={() => {
                        setMyBlogs((prev) => prev.filter((b) => b.id !== blog.id));
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
