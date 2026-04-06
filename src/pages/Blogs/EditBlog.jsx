import { React, useState, useEffect, useRef, useMemo } from "react";
import { useFirebase } from "../../context/Firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

export default function EditBlog(props) {
    const firebase = useFirebase();
    const params = useParams();
    const blogId = props.blogId || params.id;
    const [blogData, setBlogData] = useState(null);
    const [updateData, setUpdateData] = useState({});
    
    const editor = useRef(null);

    const config = useMemo(
      () => ({
        placeholder: "Enter description",
        height: 150,
        minHeight: 400,
        theme: "editor",
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
          firebase.viewBlog(blogId)
            .then((blog) => {
              const data = blog;
              setBlogData(data);
              setUpdateData(data); 
            })
            .catch((err) => console.error(err));
        }, [blogId, firebase]);
    
        if (!blogData) {
          return (
            <div class="text-center mt-50">
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 text-brand-softer animate-spin fill-brand"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          );
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
              timer: 1500,
            })
            // navigate(0);
        }
  return (
    <div className="text-left mt-30">
      <h2 className="text-4xl md:text-5xl lg:text-6xl pl-2 mx-5 md:mx-10 my-2 border-l-8 text-text-primary font-heading border-brand ">
        Edit Blog
      </h2>
      <form className="max-w-3xl p-5 md:p-10">
        {/* Title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2.5 text-sm font-medium text-text-primary"
          >
            Title
          </label>
          <input
            onChange={handleUpdate}
            value={blogData.title}
            name="title"
            id="title"
            className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
            type="text"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2.5 text-sm font-medium text-text-primary"
          >
            Description
          </label>
          <JoditEditor
            ref={editor}
            config={config}
            value={blogData.description}
            onChange={handleDescriptionChange}
            id="description"
            className="bg-neutral-secondary-medium rounded-base border border-default-medium text-text-primary text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-text-secondary"
          />
        </div>
        {/* Cover Photo */}
        <div className="mb-5">
          <label
            htmlFor="coverPhoto"
            className="block mb-2.5 text-sm font-medium text-text-primary"
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
            className="block w-full bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
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
