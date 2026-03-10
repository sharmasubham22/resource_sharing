import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

export default function ViewBlog() {
  const params = useParams();
  const firebase = useFirebase();
  const [blogData, setBlogData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
          if (blogData) {
              const imgURL = blogData.coverPhoto;
              firebase.getBlogImg(imgURL).then(url => setImgUrl(url));
          }
      }, [blogData]);
  
      useEffect(() => {
          firebase.viewBlog(params.id).then(blog => {
              setBlogData(blog.data());
          }).catch(err => {
              console.error("Error fetching my blogs:", err);
          })
      }, []);
  
      if(blogData == null) {
          return <div>Loading...</div>
      }

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10">
      <h1 className="text-3xl md:text-6xl font-bold text-center mt-10">
        {blogData.title}
      </h1>
      <p className="text-body my-5 text-center">Author: {blogData.userName}</p>
      <img className="rounded-base mb-10 h-full mx-auto w-screen" src={imgUrl} alt="" />

      <div
        className="text-body mb-30"
        dangerouslySetInnerHTML={{ __html: blogData.description }}
      />
    </div>
  );
}
