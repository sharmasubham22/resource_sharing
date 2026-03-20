import { React, useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "./Button";
import { MoveRight, Pencil, Trash2 } from "lucide-react";

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
      {/* <a href="" onClick={(e) => navigate(`/view-blog/${props.id}`)}> */}
      <div className="group bg-card relative flex flex-col justify-between h-full border border-border shadow-xs mb-5">
        {!props.hideDelete && (
          <button className="cursor-pointer" onClick={deleteBlog}>
            <span className="absolute inline-flex items-center justify-center top-3 right-3 bg-red-400 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-medium gap-1">
              Delete
              <Trash2 size={16} />
            </span>
          </button>
        )}

        <img className="h-70 w-full object-cover" src={imgUrl} alt="" />

        <div className="px-6 py-3">
          <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-text-primary">
            {props.title}
          </h5>

          <p className="text-text-secondary">
            {/* Render normalized preview, truncate for safety */}
            <span
              className="text-text-secondary"
              style={{
                fontSize: "1rem",
                lineHeight: "1.5",
                whiteSpace: "normal",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  typeof props.description === "string"
                    ? props.description
                        .replace(/<[^>]+>/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()
                        .slice(0, 200) + "..."
                    : "",
              }}
            />
          </p>
        </div>

        <div className="mt-auto px-6 pb-6">
          {!props.profile && (
            <div className="flex items-center">
              <img
                src={props.user?.userPhoto}
                className="rounded-full h-10 w-10 border border-brand-medium"
              />

              <span className="mx-3 capitalize text-text-primary">
                {props.user?.name}
              </span>
            </div>
          )}
          <div className="flex gap-4 mt-5">
            <Button
              onClick={(e) => navigate(`/view-blog/${props.id}`)}
              variant="primary"
              size="md"
              className="inline-flex items-center justify-center gap-2"
            >
              Read Full Post
              <MoveRight />
            </Button>
            {!props.hideDelete && (
              <Button
                onClick={(e) => navigate(`/edit-blog/${props.id}`)}
                variant="secondary"
                size="md"
                className="inline-flex items-center justify-center gap-2"
              >
                Edit Post
                <Pencil size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* </a> */}
    </div>
  );
}
