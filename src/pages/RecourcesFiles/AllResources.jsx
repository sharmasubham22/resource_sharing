import { React, useState, useEffect } from 'react';
import { useFirebase } from '../../context/Firebase'
import ResourceCard from '../../components/ResourceCard';

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
        .then((res) => {
          const docs = res.docs;
          setResources(docs);
          setFilterResources(docs); // initialize filtered data
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
        const data = resource.data();
        
        // adjust fields based on your schema
        const title = data.title?.toLowerCase() || "";
        const category = data.category?.toLowerCase() || "";
        const description = data.description?.toLowerCase() || "";
        const tagsMatch = data.tags?.some((tag) =>
          tag.toLowerCase().includes(term),
        );

        return (
          title.includes(searchItem.toLowerCase()) ||
          category.includes(searchItem.toLowerCase()) ||
          description.includes(searchItem.toLowerCase()) ||
          tagsMatch
        );
      });

      setFilterResources(filtered);
    }, [searchItem, resources]);

    if (loading) {
      return <div>Loading...</div>;
    }

     const handleInputChange = (e) => {
       const searchTerm = e.target.value;
       setSearchItem(searchTerm);
       
     };
  return (
    <div className="mt-15">
      <h1 className="text-3xl md:text-5xl pl-2 mx-10 my-2 border-l-8  font-sans font-bold border-brand ">
        Resources
      </h1>
      <div className="max-w-xl mt-10 mx-10">
        <label
          for="search"
          className="block mb-2.5 text-sm font-medium text-heading sr-only "
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-body"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder="Search"
            value={searchItem}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-10">
        {filterResources.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No resources found
          </p>
        ):(
        filterResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            hideDelete={true}
            {...resource.data()}
          />
        ))
        )}
      </div>
    </div>
  );
}
