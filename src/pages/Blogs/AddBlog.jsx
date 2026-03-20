import {React, useState, useRef, useMemo} from 'react'
import { useFirebase } from "../../context/Firebase";
import Swal from 'sweetalert2'
import JoditEditor from "jodit-react";
import Button from '../../components/Button';

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
      <h2 className="text-3xl md:text-5xl pl-2 text-text-primary mx-5 md:mx-10 my-2 border-l-8  font-heading border-brand ">
        Add a Blog post
      </h2>
      <form className="max-w-3xl p-5 md:p-10">
        <div className="add-resource">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2.5 text-sm font-medium text-text-primary"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="title"
              className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
              type="text"
              required
              placeholder="Enter title"
            />
          </div>
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
              value={desc}
              onChange={(value) => setDesc(value)}
              id="description"
              className="block w-full bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="coverPhoto"
              className="block mb-2.5 text-sm font-medium text-text-primary"
            >
              Upload Cover Photo
            </label>
            <input
              onChange={(e) =>
                setCoverPhoto(e.target.files ? e.target.files[0] : null)
              }
              id="coverPhoto"
              className="block w-full bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
              type="file"
              accept="image/*"
            />
          </div>
          <Button
            onClick={create}
            variant="primary"
            size="md"
          >
            Create Blog Post
          </Button>
        </div>
      </form>
    </div>
  );
}
