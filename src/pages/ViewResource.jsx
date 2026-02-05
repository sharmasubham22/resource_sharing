import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

export default function ViewResource() {
    const params = useParams();
    const firebase = useFirebase();
    const [resourceData, setResourceData] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    
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
    return (
      <div>
        <h1 className="text-6xl font-bold">{resourceData.title}</h1>
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
        <img className="rounded-base mb-10 h-100 mx-auto" src={imgUrl} alt="" />

        <p className="text-body">{resourceData.description}</p>

        <p className='text-body mt-5'>Author: {resourceData.userName}</p>
      </div>
    );
}
