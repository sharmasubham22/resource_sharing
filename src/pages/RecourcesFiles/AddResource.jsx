import { useFirebase } from "../../context/Firebase";
import { useState, useRef, useMemo } from "react";
import { options, categories } from '../../data/addResourceData';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Button from "../../components/Button";
import CodeEditor from "../../components/CodeEditor";

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
          showConfirmButton: false,
          timer: 1500,
        });
      };

    
  return (
    <div className="text-left">
      <h2 className="text-4xl md:text-5xl lg:text-6xl pl-2 text-text-primary mx-5 md:mx-10 my-2 border-l-8 font-heading border-brand ">
        Add a Resource
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
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2.5 text-sm font-medium text-text-primary"
            >
              Select Category
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategory}
              id="category"
              className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
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
                className="block mb-2.5 text-sm font-medium text-text-primary"
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
                      className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded ${selected ? "bg-brand text-white ring-2 ring-brand" : "bg-brand-softer ring-1 ring-inset ring-brand-medium text-text-secondary"}`}
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
              className="block mb-2.5 text-sm font-medium text-text-primary"
            >
              Type
            </label>
            <select
              value={selectedValue}
              onChange={handleChange}
              id="type"
              className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
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
                className="block mb-2.5 text-sm font-medium text-text-primary"
              >
                Upload File
              </label>
              <input
                onChange={(e) =>
                  setUploadFile(e.target.files ? e.target.files[0] : null)
                }
                id="file"
                className="block w-full bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
                type="file"
              />
            </div>
          )}
          {selectedValue === "link" && (
            <div className="mb-5">
              <label
                htmlFor="link"
                className="block mb-2.5 text-sm font-medium text-text-primary"
              >
                Link
              </label>
              <input
                onChange={(e) => setLink(e.target.value)}
                value={link}
                id="link"
                className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
                type="text"
                placeholder="Enter link"
              />
            </div>
          )}
          {selectedValue === "codeSnippet" && (
            <div className="mb-5">
              <label
                htmlFor="code"
                className="block mb-2.5 text-sm font-medium text-text-primary"
              >
                Code Snippet
              </label>
              <CodeEditor value={codeSnippet} onChange={setCodeSnippet} />
            </div>
          )}

          <Button onClick={create} variant="primary" size="md">
            Create Resource
          </Button>
        </div>
      </form>
    </div>
  );
}
