import React, { useState, useEffect } from 'react';
import { getAllPropertyApi, createVoteApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../style/homepage.css';

const Forrent = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredProperties = properties
    .filter((item) => item.type === 'Rent')
    .filter((item) =>
      item.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handlePropertyClick = (propertyId) => {
    navigate(`/realstate/${propertyId}`);
  };

  const handleCityClick = (cityName) => {
    console.log(`Clicked on city: ${cityName}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-section1">
          <h1>Property for Rent</h1>
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
      <section className="properties">
        {filteredProperties.map((item) => (
          <div key={item.id} className="property-card" onClick={() => handlePropertyClick(item.id)}>
            <Link to={`/realstate/${item.id}`}>
              <img src={item.personImageUrl} alt="Property" />
              <div className="property-info">
                <h4>{item.propertyName}</h4>
                <p>{item.location} | {item.city}</p>
                <h3>{item.price} | {item.type}</h3>
              </div>
            </Link>
            <button onClick={() => handleVote(item._id)}>Request</button>
          </div>
        ))}
      </section>
      <button className="show-more">Show more</button>
      <section className="categories">
        <h2>Properties for rent & buy</h2>
        <div className="category-list">
        <div className="city-card" onClick={() => handleNavigation('/types')}>
            <img src="assets/house2.jpg" alt="House" />
            <div className="city-name">House</div>
          </div>
          <div className="city-card"  onClick={() => handleNavigation('/types')}>
            <img src="assets/manson.jpg" alt="Manson" />
            <div className="city-name">Manson</div>
          </div>
          <div className="city-card"  onClick={() => handleNavigation('/types')}>
            <img src="assets/jg2.jpeg" alt="K" />
            <div className="city-name">Land</div>
          </div>
          <div className="city-card"  onClick={() => handleNavigation('/types')}>
            <img src="assets/appartment.jpg" alt="Appartment" />
            <div className="city-name">Appartment</div>
          </div>


        </div>
      </section>
      <section className="cities">
        <h2>Properties by Cities</h2>
        <div className="city-list">
          <div className="city-card" onClick={() => handleNavigation('/city')}>
            <img src="assets/kathmandu.jpeg" alt="Kathmandu" />
            <div className="city-name">Kathmandu</div>
          </div>
          <div className="city-card"  onClick={() => handleNavigation('/city')}>
            <img src="assets/dharan.jpg" alt="Lalitpur" />
            <div className="city-name">Dharan</div>
          </div>
          <div className="city-card"  onClick={() => handleNavigation('/city')}>
            <img src="assets/butwal.jpg" alt="Butwal" />
            <div className="city-name">Butwal</div>
          </div>
          <div className="city-card"  onClick={() => handleNavigation('/city')}>
            <img src="assets/pokhara.jpg" alt="Pokhara" />
            <div className="city-name">Pokhara</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forrent;
