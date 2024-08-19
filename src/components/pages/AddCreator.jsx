import  { useState } from 'react';
import { supabase } from '../../client';
import './AddCreator.css';

function AddCreator() {

  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
    youtube:'',
    twitter:'',
    instagram:'',
  });

  const handleInputChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!creator.youtube && !creator.twitter && !creator.instagram) {
      alert('Please provide at least one social media link (YouTube, Twitter, or Instagram).');
      return;
    }

    
    const { data, error } = await supabase
      .from('creators') 
      .insert([
        {
          name: creator.name,
          url: creator.url,
          description: creator.description,
          imageURL: creator.imageURL,
          youtube: creator.youtube,
          twitter: creator.twitter,
          instagram: creator.instagram,
        },
      ]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      console.log('Creator added successfully:', data);
      
      setCreator({
        name: '',
        url: '',
        description: '',
        imageURL: '',
        youtube: '',
        twitter: '',
        instagram: '',
      });
    }
  };
  return (
    <div>
      <h1>Add Creator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={creator.name}
          onChange={handleInputChange}
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={creator.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={creator.imageURL}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="youtube"
          placeholder="YouTube Handle (without @)"
          value={creator.youtube}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="twitter"
          placeholder="Twitter Handle (without @)"
          value={creator.twitter}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram Handle (without @)"
          value={creator.instagram}
          onChange={handleInputChange}
        />
        
        <button type="submit">Add Creator</button>
      </form>
    </div>
  )
}

export default AddCreator