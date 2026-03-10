import {React, useState, useRef, useMemo} from 'react'
import { useFirebase } from "../../context/Firebase";
import Swal from 'sweetalert2'
import JoditEditor from "jodit-react";

export default function AddBlog() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);
    const firebase = useFirebase();

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

    const create = (e) => {
            e.preventDefault();
            const result = firebase.addBlog(title, desc, coverPhoto);
            console.log("Success added blog");
            // nav('/my-dashboard');
            // Swal.fire({
            //   title: "Success!",
            //   text: "Resource created successfully!",
            //   icon: "success",
            // });
          };
  return (
    <div className="text-left mt-15">
      <h2 className="text-3xl md:text-5xl pl-2   mx-5 md:mx-10 my-2 border-l-8  font-sans font-bold border-brand ">
        Add a Blog post
      </h2>
      <form className="max-w-3xl p-5 md:p-10">
        <div className="add-resource">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="title"
              className="border border-default-medium rounded-base text-heading text-sm  bg-neutral-secondary-medium  focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              type="text"
              required
              placeholder="Enter title"
            />
          </div>
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
              value={desc}
              onChange={(value) => setDesc(value)}
              id="description"
              className="bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="coverPhoto"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Upload Cover Photo
            </label>
            <input
              onChange={(e) =>
                setCoverPhoto(e.target.files ? e.target.files[0] : null)
              }
              id="coverPhoto"
              className="cursor-pointer bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
              type="file"
              accept="image/*"
            />
          </div>
          <button
            onClick={create}
            className="text-white bg-brand rounded-base hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5  text-sm px-4 py-2.5 focus:outline-none"
          >
            Create Blog Post
          </button>
        </div>
      </form>
    </div>
  );
}
