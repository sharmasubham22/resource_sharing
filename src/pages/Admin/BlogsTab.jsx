import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../context/Firebase';
import Button from '../../components/Button';
import { Trash2 } from 'lucide-react';

export default function BlogsTab(props) {
    const firebase = useFirebase();
      const [imgUrl, setImgUrl] = useState(null);
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
          firebase.deleteBlog(props.id).then(() => {
            // Call the onDelete callback to update the parent state
            if (props.onDelete) {
              props.onDelete();
            }
          });
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
      <a
        href="#"
        className="flex flex-col items-center bg-card border border-border shadow-xs lg:flex-row lg:max-w-screen"
      >
        <img
          className="object-cover w-full h-64 md:h-80 lg:h-72 lg:w-90 mb-4 md:mb-0"
          src={imgUrl}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 md:p-6 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-text-primary">
            {props.title}
          </h5>
          <p className="mb-6 text-body">
            <span
              className="text-text-secondary"
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
          {!props.profile && (
            <div className="flex items-center">
              <img
                src={props.user?.userPhoto}
                className="rounded-full h-10 w-10 border border-brand-medium"
              />

              <span className="mx-3 capitalize text-text-primary font-body text-lg">
                {props.user?.name}
              </span>
            </div>
          )}
          <div className="flex justify-between mt-5">
            <div className="inline-flex gap-2">
              <Button variant="primary" size="md">
                Read
              </Button>
              <Button variant="secondary" size="md">
                Edit
              </Button>
            </div>
            <Button variant="danger" size="md" onClick={deleteBlog}>
              <Trash2 />
            </Button>
          </div>
        </div>
      </a>
    </div>
  );
}
