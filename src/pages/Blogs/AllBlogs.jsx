import { React, useState, useEffect } from 'react'
import BlogCard from '../../components/BlogCard'
import { useFirebase } from "../../context/Firebase";

export default function AllBlogs() {
  const firebase = useFirebase();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    firebase
      .getAllBlogs()
      .then((blogs) => setBlog(blogs.docs));
  }, []);
  return (
    <div className="mt-15">
      <h1 className="text-3xl md:text-5xl pl-2 mx-10 my-2 border-l-8  font-sans font-bold border-brand ">
        Blogs
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 p-10">
        {blog.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            hideDelete={true}
            {...blog.data()}
          />
        ))}
      </div>
    </div>
  );
}
