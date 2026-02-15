import { React, useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function EditResource() {
    const firebase = useFirebase();
    const params = useParams();
    const navigate = useNavigate();
    const [resourceData, setResourceData] = useState(null);
    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
      firebase
        .viewResource(params.id)
        .then((resource) => {
          const data = resource.data();
          setResourceData(data);
          setUpdateData(data); 
        })
        .catch((err) => console.error(err));
    }, [params.id, firebase]);

    if (!resourceData) {
      return <div className="mt-15 p-10">Loading your resource...</div>;
    }

    const handleUpdate = (e) => {
      setResourceData({
        ...resourceData,
        [e.target.name]: e.target.value,
      });

      setUpdateData({
        ...updateData,
        [e.target.name]: e.target.value,
      });
    };

    const updateResources = () => {
        firebase.updateResource(params.id, updateData);
        navigate('/my-dashboard');
        navigate(0);
    }

  return (
    <div className="text-left mt-15">
      <h2 className="text-3xl md:text-5xl pl-2  mx-10 my-2 border-l-8  font-sans font-bold border-brand ">
        Edit Resource
      </h2>
      <form className="max-w-3xl p-10">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Title
          </label>
          <input
            onChange={handleUpdate}
            value={resourceData.title}
            name="title"
            id="title"
            className="border border-default-medium text-heading text-sm  bg-neutral-secondary-medium focus:bg-brand-softer focus:ring-fg-brand focus:border-fg-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            type="text"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Description
          </label>
          <textarea
            onChange={handleUpdate}
            name="description"
            value={resourceData.description}
            id="description"
            className="bg-neutral-secondary-medium focus:bg-brand-softer border border-default-medium text-heading text-sm  focus:ring-fg-brand focus:border-fg-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            rows={10}
          />
        </div>
        <button
          type="button"
          onClick={updateResources}
          className="bg-brand text-white px-4 py-2 rounded"
        >
          Update Resource
        </button>
      </form>
    </div>
  );
}
