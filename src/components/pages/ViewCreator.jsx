import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../client';
import './ViewCreator.css'; // Add custom styles

function ViewCreator() {
  const [creator, setCreator] = React.useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
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

  const handleDelete = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      navigate('/creators'); // Redirect to creators list after deletion
    }
  };

  const handleEdit = () => {
    navigate(`/edit-creator/${id}`);
  };

  if (!creator) return <div>Loading...</div>;

  return (
    <div className="creator-info-container">
      <div className="creator-info">
        <div className="creator-image" style={{ backgroundImage: `url(${creator.imageURL})` }}></div>
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        <div className="social-media-links">
          {creator.youtube && (
            <a href={`https://www.youtube.com/${creator.youtube}`} target="_blank" rel="noopener noreferrer">
              <img src="/src/utils/youtube_logo.png" alt="YouTube"   />
            </a>
          )}
          {creator.twitter && (
            <a href={`https://www.twitter.com/${creator.twitter}`} target="_blank" rel="noopener noreferrer">
              <img src="/src/utils/twitter_logo.png" alt="Twitter" />
            </a>
          )}
          {creator.instagram && (
            <a href={`https://www.instagram.com/${creator.instagram}`} target="_blank" rel="noopener noreferrer">
              <img src="/src/utils/instagram_logo.png" alt="Instagram" />
            </a>
          )}
        </div>
        <button onClick={handleEdit}>Edit Creator</button>
        <button onClick={handleDelete}>Delete Creator</button>
      </div>
    </div>
  );
}

export default ViewCreator