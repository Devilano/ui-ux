import React, { useState, useEffect } from 'react';
import { getAllPropertyApi, createVoteApi, getSinglePropertyApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RealEastate from './RealState';
import '../style/homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Homepage = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handlePropertyClick = (id) => {
    console.log('Clicked property ID:', id);
    getSinglePropertyApi(id).then((res) => {
      setSelectedProperty(res.data.property);
      setIsModalOpen(true);
    }).catch((error) => {
      console.error('Error fetching property:', error);
    });
  };
  

  const filteredProperties = properties.filter((item) =>
    item.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-section1">
          <h1>Search for a Property</h1>
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
            <button style={{ backgroundColor: '#072b5a' }}>Search</button>
          </div>
        </div>
      </header>
      <section className="properties">
        {filteredProperties.map((item) => (
          <div key={item.id} className="property-card">
            <img
              src={item.personImageUrl}
              alt="Property"
              onClick={() => handlePropertyClick(item.id)}
            />
            <div className="property-info" onClick={() => handlePropertyClick(item.id)}>
              <h4>{item.propertyName}</h4>
              <p>{item.location} | {item.city}</p>
              <h3>{item.price} | {item.type}</h3>
            </div>
            <button className="show-more" style={{ backgroundColor: '#e0ac1c' }}onClick={() => handleVote(item._id)}>Request</button>
          </div>
        ))}
      </section>
      <button className="show-more" style={{ backgroundColor: '#072b5a' }}onClick={() => handleNavigation('/city')}>
      <FontAwesomeIcon icon={faArrowRight} />
    </button>      <section className="categories">
        <h2>Properties for rent & buy</h2>
        <div className="category-list">
          <div className="city-card" onClick={() => handleNavigation('/types')}>
            <img src="assets/house2.jpg" alt="House" />
            <div className="city-name">House</div>
          </div>
          <div className="city-card" onClick={() => handleNavigation('/types')}>
            <img src="assets/manson.jpg" alt="Manson" />
            <div className="city-name">Manson</div>
          </div>
          <div className="city-card" onClick={() => handleNavigation('/types')}>
            <img src="assets/jg2.jpeg" alt="K" />
            <div className="city-name">Land</div>
          </div>
          <div className="city-card" onClick={() => handleNavigation('/types')}>
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
          <div className="city-card" onClick={() => handleNavigation('/city')}>
            <img src="assets/dharan.jpg" alt="Lalitpur" />
            <div className="city-name">Dharan</div>
          </div>
          <div className="city-card" onClick={() => handleNavigation('/city')}>
            <img src="assets/butwal.jpg" alt="Butwal" />
            <div class="city-name">Butwal</div>
          </div>
          <div className="city-card" onClick={() => handleNavigation('/city')}>
            <img src="assets/pokhara.jpg" alt="Pokhara" />
            <div className="city-name">Pokhara</div>
          </div>
        </div>
      </section>
      <RealEastate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
      />
    </div>
  );
};

export default Homepage;
