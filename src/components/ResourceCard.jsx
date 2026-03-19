import {React, useState, useEffect} from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Button from './Button';
import { MoveRight, Pencil, Trash2 } from 'lucide-react';

export default function ResourceCard(props) {
    const firebase = useFirebase();
    const [imgUrl, setImgUrl] = useState(null);

    // useEffect(() => {
    //     firebase.getResourceImg(props.coverPhoto).then(url => setImgUrl(url));
    // }, []);

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
          firebase.deleteResource(props.id);
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
        {/* Author profile section */}
        {props.authorProfile && (
          <div className="flex flex-col items-center mb-4">
            <img
              src={props.authorProfile.userPhoto}
              alt={props.authorProfile.name}
              className="w-12 h-12 rounded-full mb-1 border border-brand"
            />
            <span className="text-text-secondary text-sm font-semibold">
              {props.authorProfile.name}
            </span>
          </div>
        )}
        {/* <img className="h-60 w-full rounded-t-base" src={imgUrl} alt="" /> */}
        {!props.hideDelete && (
          <button className="cursor-pointer" onClick={deleteResource}>
            <span className="absolute inline-flex items-center justify-center top-3 right-3 bg-red-400 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-medium gap-1">
              Delete
              <Trash2 size={16}/>
            </span>
          </button>
        )}

        <div>
          {Array.isArray(props.tags) && props.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {props.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center border border-brand-soft bg-brand-softer capitalize text-xs text-text-secondary font-medium px-2 py-0.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h5 className="mb-6 text-lg md:text-2xl font-semibold tracking-tight text-text-primary">
            {props.title}
          </h5>
          <p className="text-text-secondary mb-5">
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
                        .slice(0, 100) + "..."
                    : "",
              }}
            />
          </p>
        </div>

        <div className="mt-auto">
          {!props.profile && (
            <div className="flex items-center">
              <img
                src={props.user?.userPhoto}
                className="w-10 h-10 rounded-full border border-brand-soft"
              />

              <span className="mx-3 capitalize text-text-primary">
                {props.user?.name}
              </span>
            </div>
          )}
          <div className="mt-5">
            <Button
              onClick={(e) => navigate(`/view-resource/${props.id}`)}
              variant="primary"
              size="md"
              className="w-full inline-flex items-center justify-center gap-2"
            >
              Read Full Article
              <MoveRight />
            </Button>
            {!props.hideDelete && (
              <Button
                onClick={(e) => navigate(`/edit-resource/${props.id}`)}
                variant="secondary"
                size="md"
                className="w-full mt-2 inline-flex items-center justify-center gap-2"
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
 