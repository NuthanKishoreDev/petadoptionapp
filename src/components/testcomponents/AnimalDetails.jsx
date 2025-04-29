import { useState, useEffect } from 'react';

export default function AnimalDetails({ animalId }) {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      if (!animalId) return;
      
      try {
        setLoading(true);
        const baseUrl = process.env.NODE_ENV === 'production' ? '/pet-adoption-app' : '';
        const response = await fetch(`${baseUrl}/animals/${animalId}`);
        if (!response.ok) {
          throw new Error('Animal not found');
        }
        const data = await response.json();
        setAnimal(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [animalId]);

  if (!animalId) return <div className="placeholder">Select an animal to see details</div>;
  if (loading) return <div className="loading">Loading animal details...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="animal-details">
      <h2>{animal.name}</h2>
      <img 
  src={animal?.photos?.medium || '/placeholder-image.jpg'} 
  alt={animal?.name || 'Animal'} 
/>
      <p><strong>Type:</strong> {animal.type}</p>
      <p><strong>Breed:</strong> {animal.breeds.primary}</p>
      <p><strong>Age:</strong> {animal.age}</p>
      <p><strong>Gender:</strong> {animal.gender}</p>
      <p><strong>Location:</strong> {animal.contact.address.city}, {animal.contact.address.state}</p>
      <p><strong>Description:</strong> {animal.description}</p>
    </div>
  );
}