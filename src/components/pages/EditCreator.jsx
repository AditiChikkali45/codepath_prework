

import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../client';
import './AddCreator.css'; 

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    
    description: '',
    imageURL: '',
    youtube: '',
    twitter: '',
    instagram: '',
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from('creators').select('*').eq('id', id).single();
      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };
    fetchCreator();
  }, [id]);

  const handleInputChange = (e) => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        
        description: creator.description,
        imageURL: creator.imageURL,
        youtube: creator.youtube,
        twitter: creator.twitter,
        instagram: creator.instagram,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate(`/creator/${id}`);
    }
  };

  return (
    <div>
      <h1>Edit Creator</h1>
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
        <button type="submit">Update Creator</button>
      </form>
    </div>
  );
}

export default EditCreator;
