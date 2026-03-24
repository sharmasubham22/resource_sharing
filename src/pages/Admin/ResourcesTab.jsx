import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import { MoveRight, Trash2 } from "lucide-react";
import Button from "../../components/Button";
import Rating from "../../components/Rating";
import Swal from "sweetalert2";

export default function ResourcesTab(props) {
  const [imgUrl, setImgUrl] = useState(null);
  const [user, setUser] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
        if (!props.user_id) return;
  
        let isMounted = true;
  
        const fetchUser = async () => {
          const data = await firebase.getUserById(props.user_id);
  
          if (isMounted) {
            setUser(data);
          }
        };
  
        fetchUser();
  
        return () => {
          isMounted = false; // prevents memory leak
        };
      }, [props.user_id]);


useEffect(() => {
  firebase.getResourceImg(props.coverPhoto).then((url) => setImgUrl(url));
}, []);

  const deleteResource = () => {
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
              firebase.deleteResource(props.id).then(() => {
                // Call the onDelete callback to update the parent state
                if (props.onDelete) {
                  props.onDelete();
                }
              });
              Swal.fire({
                title: "Deleted!",
                text: "The resource has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
  }

  return (
    <div>
      <div className="bg-card flex flex-col justify-between h-full max-w-sm border border-border rounded-base shadow-xs">
        <img
          src={imgUrl}
          alt=""
          className="rounded-t-base h-50 object-cover w-full"
        />
    
          <div className="p-4 pb-0 md:p-6">
            <h5 className="text-xl font-bold font-mono tracking-tight text-text-primary">
              {props.title}
            </h5>
            <div className="inline-flex gap-4 my-3">
              <Rating rating={props.ratingAverage} />
              <p className="text-text-secondary text-sm">{props.ratingCount}</p>
            </div>
            <p className="text-text-secondary">
              <span
                className="text-text-secondary text-md font-mono"
                dangerouslySetInnerHTML={{
                  __html:
                    typeof props.description === "string"
                      ? props.description
                          .replace(/<[^>]+>/g, " ")
                          .replace(/\s+/g, " ")
                          .trim()
                          .slice(0, 100) + "..."
                      : "",
                }}
              />
            </p>
          </div>
          <div className="mt-auto p-4 pt-0 md:p-6 md:pt-0">
            <div className="flex items-center my-5">
              <img
                src={user?.userPhoto}
                className="w-10 h-10 rounded-full border border-brand-soft"
              />

              <span className="mx-3 capitalize text-text-primary font-mono">
                {user?.name}
              </span>
            </div>
            <div className="flex justify-between ">
              <div className="inline-flex gap-2">
                <Button variant="primary" size="md">
                  Read
                </Button>
                <Button variant="secondary" size="md">
                  Edit
                </Button>
              </div>
              <Button variant="danger" size="md" onClick={deleteResource}>
                <Trash2 />
              </Button>
            </div>
          </div>
        </div>
      </div>
 
  );
}
