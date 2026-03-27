import { React, useState, useEffect } from 'react'
import BlogCard from '../../components/BlogCard'
import { useFirebase } from "../../context/Firebase";

export default function AllBlogs() {
  const firebase = useFirebase();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    firebase.getAllBlogs().then((blogs) => setBlog(blogs));
  }, []);
  return (
    <div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl pl-2 mx-5 md:mx-10 my-2 border-l-8 text-text-primary font-heading border-brand ">
        Blogs
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 p-5 md:p-10">
        {blog.map((blog) => (
          <BlogCard key={blog.id} id={blog.id} hideDelete={true} {...blog} />
        ))}
      </div>
    </div>
  );
}
