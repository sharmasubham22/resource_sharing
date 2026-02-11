import { React, useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase'
import ResourceCard from '../components/ResourceCard';

export default function AllResources() {
    const firebase = useFirebase();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        firebase.getAllResources()
          .then(resources => setResources(resources.docs))
          .catch((err) => {
            console.error('Failed to fetch resources:', err);
            setResources([]);
          })
          .finally(() => setLoading(false));
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }
  return (
    <div className="mt-30">
      <h1 class="text-3xl md:text-5xl pl-2 mx-10 my-2 border-l-8  font-sans font-bold border-brand ">
        Resources
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            {...resource.data()}
          />
        ))}
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            {...resource.data()}
          />
        ))}
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            {...resource.data()}
          />
        ))}
      </div>
    </div>
  );
}
