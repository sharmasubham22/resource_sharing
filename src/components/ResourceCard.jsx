import {React, useState, useEffect} from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Button from './Button';
import { MoveRight, Pencil, Trash2 } from 'lucide-react';
import Rating from './Rating';

export default function ResourceCard(props) {
    const firebase = useFirebase();
    const [imgUrl, setImgUrl] = useState(null);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     firebase.getResourceImg(props.coverPhoto).then(url => setImgUrl(url));
    // }, []);

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

    const navigate = useNavigate();

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
      <div className="bg-card rounded-base shadow-md relative flex flex-col justify-between h-full p-4 md:p-8">
        {/* <img className="h-60 w-full rounded-t-base" src={imgUrl} alt="" /> */}
        {!props.hideDelete && (
          <button className="cursor-pointer" onClick={deleteResource}>
            <span className="absolute inline-flex items-center justify-center top-3 right-3 bg-red-400 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-medium gap-1">
              Delete
              <Trash2 size={16} />
            </span>
          </button>
        )}

        <div className="mb-5">
          {Array.isArray(props.tags) && props.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {props.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center border border-brand-soft bg-brand-softer capitalize text-xs text-text-secondary font-medium font-mono px-2 py-0.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h5 className="mb-6 text-xl md:text-2xl tracking-tight text-text-primary font-mono font-bold">
            {props.title}
          </h5>
          <p className="text-text-secondary mb-5">
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
          <div className='inline-flex gap-4'>
            <Rating rating={props.ratingAverage} />
            <p className="text-text-secondary text-sm font-mono">({props.ratingCount})</p>
          </div>
        </div>

        <div className="mt-auto">
          {!props.profile && (
            <div className="flex items-center">
              <img
                src={user?.userPhoto}
                className="w-10 h-10 rounded-full border border-brand-soft"
              />

              <span className="mx-3 capitalize text-text-primary font-mono">
                {user?.name}
              </span>
            </div>
          )}
          <div className="mt-5">
            <Button
              onClick={(e) => navigate(`/view-resource/${props.id}`)}
              variant="primary"
              size="sm"
              className="w-full inline-flex items-center justify-center gap-2 font-mono"
            >
              Read Full Article
              <MoveRight />
            </Button>
            {!props.hideDelete && (
              <Button
                onClick={(e) => navigate(`/edit-resource/${props.id}`)}
                variant="secondary"
                size="sm"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 font-mono"
              >
                Edit Article
                <Pencil size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 