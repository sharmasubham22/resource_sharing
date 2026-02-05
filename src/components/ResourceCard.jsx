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
      <div className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
        <a href="#">
          <img className="rounded-t-base h-full" src={imgUrl} alt="" />
        </a>
        <div className="p-6 text-center">
          <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
            {props.title}
          </h5>
          <p className="mb-6 text-body">
            {(typeof props.description === "string"
              ? props.description.slice(0, 100)
              : Array.isArray(props.description)
              ? props.description.slice(0, 100).join(" ")
              : ""
            ) + "..."}
          </p>
          {Array.isArray(props.tags) && props.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {props.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center bg-brand-softer border border-brand-soft text-fg-brand-strong text-xs font-medium px-2 py-0.5 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button
            onClick={e => navigate(`/view-resource/${props.id}`)}
            className="mt-3 inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Read more
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
        </div>
      </div>
    </div>
  );
}
