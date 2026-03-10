import { React, useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function BlogCard(props) {
  const firebase = useFirebase();
  const [imgUrl, setImgUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
        firebase.getBlogImg(props.coverPhoto).then(url => setImgUrl(url));
    }, []);

 const deleteBlog = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6d466b",
        cancelButtonColor: "#cbd5e1",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          firebase.deleteBlog(props.id);
          Swal.fire({
            title: "Deleted!",
            text: "The blog post has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }

  return (
    <div>
      <div className="bg-neutral-primary-soft relative flex flex-col justify-between h-full border border-default shadow-xs mb-5">
        {!props.hideDelete && (
          <button className="cursor-pointer" onClick={deleteBlog}>
            <span className="absolute inline-flex top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Delete
              <svg
                className="w-4 h-5 ms-1.5 rtl:rotate-180 -me-0.5 text-white"
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
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </span>
          </button>
        )}
        <a href="#">
          <img className="h-70 w-full object-cover" src={imgUrl} alt="" />
        </a>
        <div className="p-6">
          <a href="#">
            <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
              {props.title}
            </h5>
          </a>
          <p className="text-body">
            {/* Render HTML preview, truncate for safety */}
            <span
              className="text-body"
              dangerouslySetInnerHTML={{
                __html:
                  typeof props.description === "string"
                    ? props.description.slice(0, 200) + "..."
                    : "",
              }}
            />
          </p>
        </div>
        <div className="mt-auto px-6 pb-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={(e) => navigate(`/view-blog/${props.id}`)}
              className="inline-flex items-center cursor-pointer text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Read Full Post
              <svg
                className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
            {!props.hideDelete && (
              <button
                type="button"
                onClick={(e) => navigate(`/edit-blog/${props.id}`)}
                className="inline-flex cursor-pointer self-start w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Edit Article
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
