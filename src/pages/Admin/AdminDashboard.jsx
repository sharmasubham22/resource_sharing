import React, { useEffect, useState } from 'react'
import { Cog, Inbox, LayoutDashboard, LogOut, Menu, MessageCircleMore, Newspaper, Plus, TriangleAlert, User } from 'lucide-react';
import DarkMode from '../../components/DarkMode';
import UsersTable from './UsersTable';
import ResourcesTab from './ResourcesTab';
import { useFirebase } from '../../context/Firebase';
import BlogsTab from './BlogsTab';
import CommentsTab from './CommentsTab';

export default function AdminDashboard() {
    const [resources, setResources] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const firebase = useFirebase();
  
    useEffect(() => {
      firebase.getAllResources().then((resource) => {
        setResources(resource);
      });
      firebase.getAllBlogs().then((blog) => {
        setBlogs(blog);
      });
    }, [firebase]);
  return (
    <div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button"
        className="text-text-primary bg-transparent box-border border border-border hover:bg-brand-soft focus:ring-4 focus:ring-brand font-body leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-card border-e border-border">
          <a href='/' className="text-text-primary text-2xl font-body space-y-2 cursor-pointer">
            ShareStack
          </a>
          <ul className="space-y-2 font-body text-lg mt-5">
            <li>
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white ${activeTab === "dashboard" ? "text-white bg-brand" : ""}`}
                type="button"
              >
                <LayoutDashboard />
                <span className="ms-3 whitespace-nowrap">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("users");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white ${activeTab === "users" ? "text-white bg-brand" : ""}`}
                type="button"
              >
                <User />
                <span className="ms-3 whitespace-nowrap">Users</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("resources");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white ${activeTab === "resources" ? "text-white bg-brand" : ""}`}
                type="button"
              >
                <Cog />
                <span className="ms-3 whitespace-nowrap">Resources</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("comments");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white ${activeTab === "comments" ? "text-white bg-brand" : ""}`}
                type="button"
              >
                <MessageCircleMore />
                <span className="ms-3 whitespace-nowrap">Comments</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("blogs");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white ${activeTab === "blogs" ? "text-white bg-brand" : ""}`}
                type="button"
              >
                <Newspaper />
                <span className="ms-3 whitespace-nowrap">Blogs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("inbox");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white ${activeTab === "inbox" ? "text-white bg-brand" : ""}`}
                type="button"
              >
                <Inbox />
                <span className=" ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-success-strong bg-success-soft border border-success-subtle rounded-full">
                  2
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("reports");
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white ${activeTab === "reports" ? "text-white bg-brand" : ""}`}
                type="button"
              >
                <TriangleAlert />
                <span className="ms-3 whitespace-nowrap">Reports</span>
                <span className="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-danger-strong bg-danger-soft border border-danger-subtle rounded-full">
                  5
                </span>
              </button>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white"
              >
                <LogOut />
                <span className=" ms-3 whitespace-nowrap">Sign out</span>
              </a>
            </li>
            <li>
              <DarkMode />
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        {activeTab === "dashboard" && (
          <div className="p-4 border border-border border-dashed rounded-base">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 rounded-base bg-card mb-4">
              <p className="text-text-secondary">
                <Plus />
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 rounded-base bg-card mb-4">
              <p className="text-text-secondary">
                <Plus />
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-card">
                <p className="text-text-secondary">
                  <Plus />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Users tab */}
        {activeTab === "users" && (
          <div>
            <UsersTable />
          </div>
        )}

        {/* Resources tab */}
        {activeTab === "resources" && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {resources.map((resourceData) => (
                <ResourcesTab
                  key={resourceData.id}
                  id={resourceData.id}
                  {...resourceData}
                  onDelete={() => {
                    setResources((prev) => prev.filter((r) => r.id !== resourceData.id));
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Comments tab */}
        {activeTab === "comments" && (
          <div>
            <CommentsTab />
          </div>
        )}

        {/* Blogs tab */}
        {activeTab === "blogs" && (
          <div>
            {blogs.map((blogData) => (
              <BlogsTab 
                key={blogData.id} 
                id={blogData.id} 
                {...blogData}
                onDelete={() => {
                  setBlogs((prev) => prev.filter((b) => b.id !== blogData.id));
                }}
              />
            ))}
          </div>
        )}

        {/* Inbox tab */}
        {activeTab === "inbox" && (
          <div>
            <p className="text-text-primary text-lg">Inbox</p>
          </div>
        )}

        {/* Reports tab */}
        {activeTab === "reports" && (
          <div>
            <p className="text-text-primary text-lg">Reports</p>
          </div>
        )}
      </div>
    </div>
  );
}
