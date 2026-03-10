import { useFirebase } from "../../context/Firebase";
import { useState, useRef, useMemo } from "react";
import { options, categories } from '../../data/addResourceData';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

export default function AddResource() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [uploadFile, setUploadFile] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const nav = useNavigate();

    const editor = useRef(null);
    const codeEditor = useRef(null);

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

    const config2 = useMemo(
      () => ({
        defaultMode: "source",
        buttons: ["source"],
        toolbarAdaptive: false,
      }),
      [],
    );

    const toggleTag = (val) => {
      setSelectedTags((prev) => (prev.includes(val) ? prev.filter((t) => t !== val) : [...prev, val]));
    }; 

    const firebase = useFirebase();
    const handleCategory =  (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const currentCategory = categories.find((c) => c.value === selectedCategory);

      const create = (e) => {
        e.preventDefault();
        const result = firebase.addResource(title, desc, coverPhoto, selectedValue, link, codeSnippet, uploadFile, selectedCategory, selectedTags);
        console.log("Success");
        // nav('/my-dashboard');
        Swal.fire({
          title: "Success!",
          text: "Resource created successfully!",
          icon: "success",
        });
      };

    
  return (
    <div className="text-left mt-15">
      <h2 className="text-3xl md:text-5xl pl-2   mx-5 md:mx-10 my-2 border-l-8  font-sans font-bold border-brand ">
        Add a Resource
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
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Select Category
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategory}
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
          {currentCategory?.tags && (
            <div className="mb-5">
              <label
                htmlFor="tags"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Select Tags
              </label>
              <div id="tags" className="flex flex-wrap gap-2">
                {currentCategory.tags.map((tag) => {
                  const selected = selectedTags.includes(tag.val);
                  return (
                    <button
                      type="button"
                      key={tag.val}
                      onClick={() => toggleTag(tag.val)}
                      className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded ${selected ? "bg-brand text-white ring-2 ring-brand" : "bg-brand-softer ring-1 ring-inset ring-brand-medium text-brand-strong"}`}
                      aria-pressed={selected}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="type"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Type
            </label>
            <select
              value={selectedValue}
              onChange={handleChange}
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
          {(selectedValue === "document" ||
            selectedValue === "video" ||
            selectedValue === "tools" ||
            selectedValue === "template" ||
            selectedValue === "collectionFile") && (
            <div className="mb-5">
              <label
                htmlFor="file"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Upload File
              </label>
              <input
                onChange={(e) =>
                  setUploadFile(e.target.files ? e.target.files[0] : null)
                }
                id="file"
                className="cursor-pointer bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
                type="file"
              />
            </div>
          )}
          {selectedValue === "link" && (
            <div className="mb-5">
              <label
                htmlFor="link"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Link
              </label>
              <input
                onChange={(e) => setLink(e.target.value)}
                value={link}
                id="link"
                className="bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                type="text"
                placeholder="Enter link"
              />
            </div>
          )}
          {selectedValue === "codeSnippet" && (
            <div className="mb-5">
              <label
                htmlFor="code"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Code Snippet
              </label>
              <JoditEditor
                ref={codeEditor}
                config={config2}
                onChange={(e) => setCodeSnippet(e.target.value)}
                value={codeSnippet}
                id="code"
                className="bg-neutral-secondary-medium rounded-base border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand block w-full shadow-xs placeholder:text-body"
              />
            </div>
          )}

          <button
            onClick={create}
            className="text-white bg-brand rounded-base hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5  text-sm px-4 py-2.5 focus:outline-none"
          >
            Create Resource
          </button>
        </div>
      </form>
    </div>
  );
}
