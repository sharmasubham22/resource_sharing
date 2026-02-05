import { React, useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase'
import ResourceCard from '../components/ResourceCard';

export default function AllResources() {
    const firebase = useFirebase();
    const [resources, setResources] = useState([]);
    useEffect(() => {
        firebase.getAllResources().then(resources => 
        setResources(resources.docs));
    }, []);
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} id={resource.id} {...resource.data()} />
      ))}
    </div>
  );
}
