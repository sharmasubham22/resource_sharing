import { React, useState, useEffect, useRef, useMemo } from "react";
import { useFirebase } from "../../context/Firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

export default function EditBlog() {
    const firebase = useFirebase();
    const params = useParams();

    const [blogData, setBlogData] = useState(null);
    const [updateData, setUpdateData] = useState({});
    
    const editor = useRef(null);

    const config = useMemo(
              () => ({
                placeholder: "Enter description",
                height: 150,
                minHeight: 300,
                buttons: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "ul",
                  "ol",
                  "paragraph",
                  "lineHeight",
                  "source",
                  "spellcheck",
                  "cut",
                  "copy",
                  "paste",
                  "selectall",
                  "copyformat",
                  "hr",
                  "table",
                  "link",
                  "symbols",
                  "indent",
                  "outdent",
                  "left",
                  "undo",
                  "redo",
                  "find",
                  "fullsize",
                  "preview",
                  "print",
                ],
                toolbarAdaptive: false,
              }),
              [],
            );

    useEffect(() => {
          firebase.viewBlog(params.id)
            .then((blog) => {
              const data = blog.data();
              setBlogData(data);
              setUpdateData(data); 
            })
            .catch((err) => console.error(err));
        }, [params.id, firebase]);
    
        if (!blogData) {
          return <div className="mt-15 p-10">Loading your post...</div>;
        }
    
        const handleUpdate = (e) => {
          setBlogData({
            ...blogData,
            [e.target.name]: e.target.value,
          });
    
          setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value,
          });
        };
    
        // Handle JoditEditor change for description
        const handleDescriptionChange = (value) => {
          setBlogData({ ...blogData, description: value });
          setUpdateData({ ...updateData, description: value });
        };
    
        const updateBlog = () => {
            firebase.updateBlog(params.id, updateData);
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
        Edit Blog
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
            value={blogData.title}
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
            config={config}
            value={blogData.description}
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
        <button
          type="button"
          onClick={updateBlog}
          className="bg-brand text-white px-4 py-2 rounded"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
