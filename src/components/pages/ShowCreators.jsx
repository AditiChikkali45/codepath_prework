
import { useNavigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import { supabase } from '../../client'; // Make sure this is correctly imported
import './ShowCreator.css'; // Add custom styles

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch creators from the database
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    };
    fetchCreators();
  }, []);
  const handleInfo = (id) => {
    navigate(`/creator/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit-creator/${id}`);
  };

  return (
    <div className="creators-container">
      {creators.map((creator) => (
        <div key={creator.id} className="creator-box">
          <div
            className="creator-image"
            style={{ backgroundImage: `url(${creator.imageURL})` }}
          ></div>
          <div className="creator-content">
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
          </div>
          <button onClick={() => handleInfo(creator.id)}>Info</button>
          <button onClick={() => handleEdit(creator.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default ShowCreators;
