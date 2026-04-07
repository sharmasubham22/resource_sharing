import React, { useEffect, useState } from 'react'
import { Cog, Inbox, LayoutDashboard, LogOut, Menu, MessageCircleMore, Newspaper, Plus, TriangleAlert, User, ArrowLeft } from 'lucide-react';
import DarkMode from '../../components/DarkMode';
import UsersTable from './UsersTable';
import ResourcesTab from './ResourcesTab';
import ViewResource from '../RecourcesFiles/ViewResource';
import { useFirebase } from '../../context/Firebase';
import BlogsTab from './BlogsTab';
import CommentsTab from './CommentsTab';
import ReportsTab from './ReportsTab';
import ViewBlog from '../Blogs/ViewBlog';
import EditBlog from '../Blogs/EditBlog';
import { useNavigate } from 'react-router-dom';
import MessageTab from './MessageTab';
import { logoVector } from '../../assets/Elements';
import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function AdminDashboard() {
    const [resources, setResources] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedResourceId, setSelectedResourceId] = useState(null);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [growthData, setGrowthData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [topResources, setTopResources] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const [counts, setCounts] = useState({
      resources: 0,
      blogs: 0,
      users: 0,
      messages: 0,
      reports: 0,
    });
    const firebase = useFirebase();
    const nav = useNavigate();
  
    useEffect(() => {
      firebase.getAllResources().then((resource) => {
        setResources(resource);
      });
      firebase.getAllBlogs().then((blog) => {
        setBlogs(blog);
      });

      
    }, [firebase]);

    useEffect(() => {
      const loadData = async () => {
        const [growth, category, topRated, userActivity, stats] = await Promise.all([
          firebase.getResourceGrowth(),
          firebase.getCategoryStats(),
          firebase.getTopRatedResources(),
          firebase.getUserActivity(),
          firebase.getDashboardCounts(),
        ]);

        setGrowthData(growth);
        setCategoryData(category);
        setTopResources(topRated);
        setActivityData(userActivity);
        setCounts(stats);
      };

      loadData();
    }, []);

  return (
    <div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button"
        className="text-text-primary bg-transparent box-border border border-border hover:bg-brand-soft focus:ring-4 focus:ring-brand font-body leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-card border-e border-border">
          <a
            href="/"
            className="flex items-center space-x-1 rtl:space-x-reverse font-body"
          >
            {logoVector}
            <span className="self-center text-xl text-text-primary font-bold whitespace-nowrap">
              StackXchange
            </span>
          </a>
          <div className="my-10">
            <img
              className="w-20 h-20 rounded-full mx-auto border border-brand"
              src={
                firebase.user?.userPhoto ||
                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              }
              alt="user photo"
            />
            <p className="text-text-primary text-2xl font-body text-center my-2">
              {firebase.user?.name}
            </p>
          </div>
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
                {counts.messages !== 0 ? (
                <span className="inline-flex items-center justify-center w-4.5 h-4.5 ms-2 text-xs font-medium text-fg-success-strong bg-success-soft border border-success-subtle rounded-full">
                  {counts.messages}
                </span>
                ) : (
                  <></>
                )}
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
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  firebase.logout();
                  nav("/");
                }}
                className="flex items-center w-full cursor-pointer px-2 py-1.5 text-body rounded-base hover:bg-brand hover:text-white"
              >
                <LogOut />
                <span className=" ms-3 whitespace-nowrap">Sign out</span>
              </button>
            </li>
            <li>
              <DarkMode />
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 lg:ml-64">
        {activeTab === "dashboard" && (
          <div className="p-4 border border-border border-dashed rounded-base">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="block py-3 px-4 h-full rounded-base bg-card">
                <p className="text-text-secondary font-body text-lg md:text-2xl">
                  Resources
                </p>
                <p className="text-text-primary font-mono font-bold text-4xl">
                  {counts.resources}
                </p>
              </div>
              <div className="block py-3 px-4 h-full rounded-base bg-card">
                <p className="text-text-secondary font-body text-lg md:text-2xl">
                  Blogs
                </p>
                <p className="text-text-primary font-mono font-bold text-4xl">
                  {counts.blogs}
                </p>
              </div>
              <div className="block py-3 px-4 h-full rounded-base bg-card">
                <p className="text-text-secondary font-body text-lg md:text-2xl">
                  Users
                </p>
                <p className="text-text-primary font-mono font-bold text-4xl">
                  {counts.users}
                </p>
              </div>
            </div>
            <div className="p-3 h-100 w-full rounded-base bg-card mb-4">
              <p className="text-text-secondary font-body text-lg md:text-2xl">
                User Activity
              </p>
              <ResponsiveContainer width="100%" height="100%" className="p-5">
                <AreaChart data={activityData}>
                  <XAxis dataKey="date" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="activity"
                    fill={"var(--color-brand-soft)"}
                    stroke={"var(--color-brand)"}
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="block py-3 px-4 h-full rounded-base bg-card">
                <p className="text-text-secondary font-body text-lg md:text-2xl">
                  New Messages
                </p>
                <p className="text-text-primary font-mono font-bold text-4xl">
                  {counts.messages}
                </p>
              </div>
              <div className="block py-3 px-4 h-full rounded-base bg-card">
                <p className="text-text-secondary font-body text-lg md:text-2xl">
                  Reports
                </p>
                <p className="text-text-primary font-mono font-bold text-4xl">
                  {counts.reports}
                </p>
              </div>
              <div className="h-full p-3 rounded-base bg-card">
                <p className="text-text-secondary font-body text-lg md:text-2xl">
                  Category-wise Growth
                </p>
                <PieChart width="100%" height={300}>
                  <Pie data={categoryData} dataKey="value" outerRadius={100}>
                    {categoryData.map((entry, index) => (
                      <Cell key={index} className="fill-brand" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="h-full p-3 rounded-base bg-card">
                <p className="text-text-secondary font-body text-lg md:text-2xl">
                  Resources Growth
                </p>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className="p-5"
                  stroke={"var(--color-brand)"}
                >
                  <LineChart data={growthData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="resources"
                      stroke={"var(--color-brand)"}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="p-3 h-auto rounded-base bg-card">
              <p className="text-text-secondary font-body text-lg md:text-2xl">
                Top Rated Resources
              </p>
              <ResponsiveContainer
                width="100%"
                height={300}
                className="p-5 fill-brand"
              >
                <BarChart data={topResources}>
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rating" />
                </BarChart>
              </ResponsiveContainer>
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
            {selectedResourceId ? (
              <div>
                <button
                  onClick={() => setSelectedResourceId(null)}
                  className="flex items-center gap-2 mb-5 text-brand hover:text-brand-medium font-medium cursor-pointer"
                >
                  <ArrowLeft size={20} />
                  Back to Resources
                </button>
                <ViewResource resourceId={selectedResourceId} isAdmin={true} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {resources.map((resourceData) => (
                  <ResourcesTab
                    key={resourceData.id}
                    id={resourceData.id}
                    {...resourceData}
                    onDelete={() => {
                      setResources((prev) =>
                        prev.filter((r) => r.id !== resourceData.id),
                      );
                    }}
                    onResourceView={() =>
                      setSelectedResourceId(resourceData.id)
                    }
                  />
                ))}
              </div>
            )}
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
            {selectedBlogId ? (
              <div>
                <button
                  onClick={() => {
                    setSelectedBlogId(null);
                    // setIsEditing(false);
                  }}
                  className="flex items-center gap-2 mb-5 text-brand hover:text-brand-medium font-medium cursor-pointer"
                >
                  <ArrowLeft size={20} />
                  Back to Blogs
                </button>
                <ViewBlog blogId={selectedBlogId} isAdmin={true} />
              </div>
            ) : (
              <div className="">
                {blogs.map((blogData) => (
                  <BlogsTab
                    key={blogData.id}
                    id={blogData.id}
                    {...blogData}
                    onDelete={() => {
                      setBlogs((prev) =>
                        prev.filter((b) => b.id !== blogData.id),
                      );
                    }}
                    onBlogView={() => setSelectedBlogId(blogData.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inbox tab */}
        {activeTab === "inbox" && (
          <div>
            <MessageTab />
          </div>
        )}

        {/* Reports tab */}
        {activeTab === "reports" && (
          <div>
            <ReportsTab />
          </div>
        )}
      </div>
    </div>
  );
}
