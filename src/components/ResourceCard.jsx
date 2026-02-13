import {React, useState, useEffect} from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function ResourceCard(props) {
    const firebase = useFirebase();
    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        firebase.getResourceImg(props.coverPhoto).then(url => setImgUrl(url));
    }, []);

    const navigate = useNavigate();
  return (
    <div>
      <div className="bg-neutral-secondary-soft rounded-base block shadow-md relative">
        {/* <img className="h-60 w-full rounded-t-base" src={imgUrl} alt="" /> */}
        {!props.hideDelete && (
          <button
            className="cursor-pointer"
            onClick={() => firebase.deleteResource(props.id)}
          >
            <span className="absolute inline-flex top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Delete
              <svg
                className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5 text-white"
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

        <div className="p-6 text-center">
          <h5 className="mb-6 text-2xl font-semibold tracking-tight text-heading">
            {props.title}
          </h5>
          <p className="mb-6 text-body">
            {(typeof props.description === "string"
              ? props.description.slice(0, 100)
              : Array.isArray(props.description)
                ? props.description.slice(0, 100).join(" ")
                : "") + "..."}
          </p>
          {Array.isArray(props.tags) && props.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {props.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center bg-neutral-200 capitalize text-xs font-medium px-2 py-0.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div class="flex mt-4 md:mt-6 gap-4 items-center justify-center">
            <button
              type="button"
              onClick={(e) => navigate(`/view-resource/${props.id}`)}
              className="inline-flex items-center cursor-pointer text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Read Full Article
              <svg
                class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
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
