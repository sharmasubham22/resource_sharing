import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

export default function ViewResource() {
    const params = useParams();
    const firebase = useFirebase();
    const [resourceData, setResourceData] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [rating, setRating] = useState(3.5);
    
        useEffect(() => {
            if (resourceData) {
                const imgURL = resourceData.coverPhoto;
                firebase.getResourceImg(imgURL).then(url => setImgUrl(url));
            }
        }, [resourceData]);

    useEffect(() => {
        firebase.viewResource(params.id).then(resource => {
            setResourceData(resource.data());
        })
    }, []);

    if(resourceData == null) {
        return <div>Loading...</div>
    }

    const valuetext = (event) => {
      const value = event.target.value;
      setRating(value);
    };
    return (
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <h1 className="text-3xl md:text-6xl font-bold text-center mt-10">
          {resourceData.title}
        </h1>
        <p className="text-body mt-5 text-center">
          Author: {resourceData.userName}
        </p>
        {Array.isArray(resourceData.tags) && resourceData.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 my-5">
            {resourceData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center bg-brand-softer border border-brand-soft text-fg-brand-strong text-xs font-medium px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <img
          className="rounded-base mb-10 h-full mx-auto"
          src={imgUrl}
          alt=""
        />

        <p className="text-body">{resourceData.description}</p>
        <div className="mt-5">
          <label className="block mb-2.5 text-sm font-medium text-heading">
            Leave a Review:{rating}
          </label>
          <input
            className="rating mb-5"
            max="5"
            step="0.5"
            type="range"
            defaultValue="3.5"
            onChange={valuetext}
          />

          <label className="block mb-2.5 text-sm font-medium text-heading">
            Add a Comment
          </label>
          <textarea
            className="bg-neutral-secondary-medium focus:bg-brand-softer border border-default-medium text-heading text-sm rounded-base focus:ring-fg-brand focus:border-fg-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            rows={5}
            placeholder="Enter your comment"
          />
          <button className="text-white mt-5 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-fg-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
            Post Your Review
          </button>
        </div>
        {/* <iframe src={""} title="shared link" width="100%" height="300px" /> */}
      </div>
    );
}
