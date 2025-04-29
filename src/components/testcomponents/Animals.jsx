import { useState, useEffect } from 'react';

export default function Animals({ onAnimalSelect }) {
  const [animals, setAnimals] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch animal types on component mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/types');
        const data = await response.json();
        setTypes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  // Fetch animals when type or query changes
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        const url = new URL('/animals', window.location.origin);
        if (selectedType) url.searchParams.append('type', selectedType);
        if (searchQuery) url.searchParams.append('query', searchQuery);
        
        const response = await fetch(url);
        const data = await response.json();
        setAnimals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [selectedType, searchQuery]);

  if (loading) return <div className="loading">Loading animals...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  return (
    <div className="animals">
      <div className="animal-list">
        {animals.map(animal => (
          <div 
            key={animal.id} 
            className="animal-card"
            onClick={() => onAnimalSelect(animal.id)}
          >
            <h3>{animal.name}</h3>
            {animal.photos?.[0]?.small ? (
      <img src={animal.photos[0].small} alt={animal.name} />
    ) : (
      <p>No image available</p>
    )}
            <p>Type: {animal.type}</p>
            <p>Location: {animal.contact.address.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}