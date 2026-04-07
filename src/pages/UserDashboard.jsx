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
  const [activeTab, setActiveTab] = useState("resources");
  
  useEffect(() => {
    if (!firebase.user?.uid) return;

    const loadData = async () => {
      try {
        const [resources, blogs] = await Promise.all([
          firebase.getMyResources(firebase.user.uid),
          firebase.getMyBlogs(firebase.user.uid),
        ]);

        setMyResources(resources);
        setMyBlogs(blogs);
      } catch (err) {
        console.error(err);
        setMyResources([]);
        setMyBlogs([]);
      }
    };

    loadData();
  }, [firebase.user?.uid]);   

 

  const nav = useNavigate();
    return (
      <div className="mt-30">
        <UserProfile />
        <div>
          <div className="mb-4">
            <ul
              className="flex flex-wrap -mb-px text-lg font-body text-center items-center justify-center"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`inline-block p-4 border-b-2 rounded-t-base hover:text-brand-medium hover:border-brand-medium ${
                    activeTab === "resources"
                      ? "text-brand-medium border-brand-medium"
                      : "text-text-secondary border-transparent"
                  }`}
                  id="resource-styled-tab"
                  type="button"
                  role="tab"
                  aria-controls="resource"
                  aria-selected={activeTab === "resources"}
                >
                  My Resources
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`inline-block p-4 border-b-2 rounded-t-base hover:text-brand-medium hover:border-brand-medium ${
                    activeTab === "blogs"
                      ? "text-brand-medium border-brand-medium"
                      : "text-text-secondary border-transparent"
                  }`}
                  id="blog-styled-tab"
                  type="button"
                  role="tab"
                  aria-controls="blog"
                  aria-selected={activeTab === "blogs"}
                >
                  My Blogs
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div
              className={activeTab === "resources" ? "block" : "hidden"}
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
              className={activeTab === "blogs" ? "block" : "hidden"}
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
