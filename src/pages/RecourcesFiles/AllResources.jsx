import { React, useState, useEffect } from 'react';
import { useFirebase } from '../../context/Firebase'
import ResourceCard from '../../components/ResourceCard';
import { Search } from 'lucide-react';

export default function AllResources() {
    const firebase = useFirebase();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchItem, setSearchItem] = useState("");
    const [filterResources, setFilterResources] = useState([]);

    useEffect(() => {
      setLoading(true);
      firebase
        .getAllResources()
        .then((resources) => {
          setResources(resources);
          setFilterResources(resources); // initialize filtered data
        })
        .catch((err) => {
          console.error("Failed to fetch resources:", err);
          setResources([]);
          setFilterResources([]);
        })
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
      const term = searchItem.toLowerCase().trim();

      if (!term) {
        setFilterResources(resources);
        return;
      }

      const filtered = resources.filter((resource) => {
        const title = resource.title?.toLowerCase() || "";
        const category = resource.category?.toLowerCase() || "";
        const description = resource.description?.toLowerCase() || "";

        const tagsMatch = resource.tags?.some((tag) =>
          tag.toLowerCase().includes(term),
        );

        return (
          title.includes(term) ||
          category.includes(term) ||
          description.includes(term) ||
          tagsMatch
        );
      });

      setFilterResources(filtered);
    }, [searchItem, resources]);

    if (loading) {
      return (
        <div className="text-center mt-50">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-brand-softer animate-spin fill-brand"
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
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

     const handleInputChange = (e) => {
       const searchTerm = e.target.value;
       setSearchItem(searchTerm);
     };

     console.log(resources);
  return (
    <div className='mt-30'>
      <h1 className="text-4xl md:text-5xl lg:text-6xl pl-2 mx-5 md:mx-10 my-2 border-l-8 text-text-primary font-heading border-brand ">
        Resources
      </h1>
      <div className="max-w-xl mt-10 mx-5 md:mx-10">
        <label
          for="search"
          className="block mb-2.5 text-sm font-medium text-text-primary sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute text-input-placeholder inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className='pr-2'/>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 ps-9 bg-input-bg border border-input-border text-input-text text-sm rounded-base focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder"
            placeholder="Search"
            value={searchItem}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-5 md:p-10">
        {filterResources.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No resources found
          </p>
        ) : (
          filterResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              hideDelete={true}
              {...resource}
            />
          ))
        )}
      </div>
    </div>
  );
}
