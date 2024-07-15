import React, { useState, useEffect } from 'react';
import { getAllPropertyApi, createVoteApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../style/homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Typess = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''
    
  );
  const handleNavigation = (path) => {
    navigate(path);
  };
  useEffect(() => {
    getAllPropertyApi().then((res) => {
      console.log(res.data);
      setProperties(res.data.property);
    });
  }, []);

  const handleVote = (propertyId) => {
    createVoteApi({ PropertyId: propertyId })
      .then((res) => {
        if (res.data.success) {
          console.log('Vote successful:', res.data.message);
          toast.success(res.data.message);
        } else {
          console.error('Vote failed:', res.data.message);
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Vote failed:', error);
      });
  };

  const filteredProperties = properties.filter((item) =>
    item.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertyClick = (propertyId) => {
    navigate(`/realstate/${propertyId}`);
  };

  const categorizeProperties = (category) => {
    return filteredProperties.filter((item) =>
      item.propertyName.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-section1">
          <h1>Property By Category</h1>
          <p>Choose from the most advantageous offers</p>
        </div>
        <div className="header-section2">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter a keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </header>

      <main>
        <section className="property-category">
          <h2>Mansions</h2>
          <div className="properties">
            {categorizeProperties('Mansion').map((item) => (
              <div key={item.id} className="property-card" onClick={() => handlePropertyClick(item.id)}>
                <Link to="#">
                  <img src={item.personImageUrl} alt="Property" />
                  <div className="property-info">
                    <h3>{item.propertyName}</h3>
                    <p>{item.location} | {item.city}</p>
                    <p>{item.price} | {item.type}</p>
                  </div>
                </Link>
                <button onClick={() => handleVote(item._id)}>Request</button>
              </div>
            ))}
          </div>
        </section>

        <section className="property-category">
          <h2>Apartments</h2>
          <div className="properties">
            {categorizeProperties('Apartment').map((item) => (
              <div key={item.id} className="property-card" onClick={() => handlePropertyClick(item.id)}>
                <Link to="#">
                  <img src={item.personImageUrl} alt="Property" />
                  <div className="property-info">
                    <h3>{item.propertyName}</h3>
                    <p>{item.location} | {item.city}</p>
                    <p>{item.price} | {item.type}</p>
                  </div>
                </Link>
                <button onClick={() => handleVote(item._id)}>Request</button>
              </div>
            ))}
          </div>
        </section>

        <section className="property-category">
          <h2>Houses</h2>
          <div className="properties">
            {categorizeProperties('House').map((item) => (
              <div key={item.id} className="property-card" onClick={() => handlePropertyClick(item.id)}>
                <Link to="#">
                  <img src={item.personImageUrl} alt="Property" />
                  <div className="property-info">
                    <h3>{item.propertyName}</h3>
                    <p>{item.location} | {item.city}</p>
                    <p>{item.price} | {item.type}</p>
                  </div>
                </Link>
                <button onClick={() => handleVote(item._id)}>Request</button>
              </div>
            ))}
          </div>
        </section>

        <section className="property-category">
          <h2>Land</h2>
          <div className="properties">
            {categorizeProperties('Land').map((item) => (
              <div key={item.id} className="property-card" onClick={() => handlePropertyClick(item.id)}>
                <Link to="#">
                  <img src={item.personImageUrl} alt="Property" />
                  <div className="property-info">
                    <h3>{item.propertyName}</h3>
                    <p>{item.location} | {item.city}</p>
                    <p>{item.price} | {item.type}</p>
                  </div>
                </Link>
                <button onClick={() => handleVote(item._id)}>Request</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
      <button className="show-more" onClick={() => handleNavigation('/home')}>
      <FontAwesomeIcon icon={faArrowRight} />
    </button>      </footer>
    </div>
  );
};

export default Typess;
