import { React, useState, useEffect, useRef } from 'react'
import { useFirebase } from '../../context/Firebase';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { options, categories } from '../../data/addResourceData';
import Swal from 'sweetalert2';
import JoditEditor from "jodit-react";

export default function EditResource() {
    const firebase = useFirebase();
    const params = useParams();
    const navigate = useNavigate();
    const [resourceData, setResourceData] = useState(null);
    const [updateData, setUpdateData] = useState({});

    const editor = useRef(null);

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

    // Handle JoditEditor change for description
    const handleDescriptionChange = (value) => {
      setResourceData({ ...resourceData, description: value });
      setUpdateData({ ...updateData, description: value });
    };

    const updateResources = () => {
        firebase.updateResource(params.id, updateData);
        // navigate('/my-dashboard');
        Swal.fire({
          title: "Success!",
          text: "Resource edited successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        // navigate(0);
    }

  return (
    <div className="text-left mt-15">
      <h2 className="text-3xl md:text-5xl pl-2  mx-10 my-2 border-l-8  font-sans font-bold border-brand ">
        Edit Resource
      </h2>
      <form className="max-w-3xl p-10">
        {/* Title */}
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
            className="border border-default-medium text-heading text-sm rounded-base bg-neutral-secondary-medium  focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            type="text"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Description
          </label>
          <JoditEditor
            ref={editor}
            value={resourceData.description}
            onChange={handleDescriptionChange}
            id="description"
            className="bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
          />
        </div>
        {/* Cover Photo */}
        <div className="mb-5">
          <label
            htmlFor="coverPhoto"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Upload Cover Photo
          </label>
          <input
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                coverPhoto: e.target.files ? e.target.files[0] : null,
              })
            }
            name="coverPhoto"
            id="coverPhoto"
            className="cursor-pointer bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
            type="file"
            accept="image/*"
          />
        </div>
        {/* Category */}
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Select Category
          </label>
          <select
            value={resourceData.category}
            onChange={handleUpdate}
            name="category"
            id="category"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        {/* Tags */}
        {resourceData.category &&
          categories.find((cat) => cat.value === resourceData.category)
            ?.tags && (
            <div className="mb-5">
              <label
                htmlFor="tags"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Select Tags
              </label>
              <div id="tags" className="flex flex-wrap gap-2">
                {categories
                  .find((cat) => cat.value === resourceData.category)
                  .tags.map((tag) => {
                    const selected = resourceData.tags?.includes(tag.val);
                    return (
                      <button
                        type="button"
                        key={tag.val}
                        className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded ${selected ? "bg-brand text-white ring-2 ring-brand" : "bg-brand-softer ring-1 ring-inset ring-brand-medium text-brand-strong"}`}
                        aria-pressed={selected}
                        onClick={() => {
                          const tags = resourceData.tags || [];
                          const newTags = selected
                            ? tags.filter((t) => t !== tag.val)
                            : [...tags, tag.val];
                          setResourceData({ ...resourceData, tags: newTags });
                          setUpdateData({ ...updateData, tags: newTags });
                        }}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        {/* Type */}
        <div className="mb-5">
          <label
            htmlFor="type"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Type
          </label>
          <select
            value={resourceData.type}
            onChange={handleUpdate}
            name="type"
            id="type"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/* File Upload for certain types */}
        {(resourceData.type === "document" ||
          resourceData.type === "video" ||
          resourceData.type === "tools" ||
          resourceData.type === "template" ||
          resourceData.type === "collectionFile") && (
          <div className="mb-5">
            <label
              htmlFor="file"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Upload File
            </label>
            <input
              onChange={(e) =>
                setUpdateData({
                  ...updateData,
                  file: e.target.files ? e.target.files[0] : null,
                })
              }
              name="file"
              id="file"
              className="cursor-pointer bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
              type="file"
            />
          </div>
        )}
        {/* Link for type=link */}
        {resourceData.type === "link" && (
          <div className="mb-5">
            <label
              htmlFor="link"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Link
            </label>
            <input
              onChange={handleUpdate}
              value={resourceData.link}
              name="link"
              id="link"
              className="bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              type="text"
              placeholder="Enter link"
            />
          </div>
        )}
        {/* Code Snippet for type=codeSnippet */}
        {resourceData.type === "codeSnippet" && (
          <div className="mb-5">
            <label
              htmlFor="codeSnippet"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Code Snippet
            </label>
            <textarea
              onChange={handleUpdate}
              value={resourceData.codeSnippet}
              name="codeSnippet"
              id="codeSnippet"
              className="bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              rows={10}
              placeholder="Enter code snippet"
            />
          </div>
        )}
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
