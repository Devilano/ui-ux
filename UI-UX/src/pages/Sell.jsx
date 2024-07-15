import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../style/sell.css';
import { createProgressApi } from '../apis/Api';

function Sell() {
  // useState hooks for input fields
  const [propertyName, setPropertyName] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [newsImage, setNewsImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [whatFor, setWhatFor] = useState('sale');
  const [rooms, setRooms] = useState(1);
  const [contact, setContact] = useState('');

  const handleIncrement = () => {
    setRooms(prevRooms => prevRooms + 1);
  };

  const handleDecrement = () => {
    setRooms(prevRooms => (prevRooms > 1 ? prevRooms - 1 : 1));
  };

  // Event handlers for input changes
  const changePropertyName = (e) => setPropertyName(e.target.value);
  const changeLocation = (e) => setLocation(e.target.value);
  const changeCity = (e) => setCity(e.target.value);
  const changePrice = (e) => setPrice(e.target.value);
  const changeType = (e) => setType(e.target.value);
  const changeWhatFor = (e) => setWhatFor(e.target.value);
  const changeContact = (e) => setContact(e.target.value);

  // Function for image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setNewsImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('propertyName', propertyName);
    formData.append('location', location);
    formData.append('city', city);
    formData.append('price', price);
    formData.append('type', type);
    formData.append('whatFor', whatFor);
    formData.append('contact', contact);
    formData.append('rooms', rooms);
    formData.append('newsImage', newsImage);

    // API call
    createProgressApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch(e => {
        toast.error("Server Error");
        console.log(e);
      });
  };

  return (
    <div className="App">
      <h1>Sell Property</h1>
      <form className="sell-property-form" onSubmit={handleSubmit}>
        <div className="form-left">
          <div className="photo-upload">
            <input type="file" onChange={handleImageUpload} />
            {previewImage && <img className='img-fluid rounded object-fit-fit' src={previewImage} alt='newsImage' height={50} width={50} />}
          </div>
          <input type="text" value={propertyName} onChange={changePropertyName} className='form-control mb-2' placeholder='Property Name' />
          <input type="text" value={location} onChange={changeLocation} className='form-control mb-2' placeholder='Location' />
          <input type="text" value={city} onChange={changeCity} className='form-control mb-2' placeholder='City' />
          <input type="text" value={price} onChange={changePrice} className='form-control mb-2' placeholder='Price' />
        </div>
        <div className="form-right">
          <input type="text" value={type} onChange={changeType} placeholder="Type" />
          <div className="dropdown">
            <select value={whatFor} onChange={changeWhatFor}>
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <input type="text" value={contact} onChange={changeContact} placeholder="Contact" />
          <div className="rooms">
            <label>Rooms: </label>
            <div className="room-controls">
              <button type="button" onClick={handleIncrement}>▲</button>
              <span>{rooms}</span>
              <button type="button" onClick={handleDecrement}>▼</button>
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">Submit Details</button>
      </form>
    </div>
  );
}

export default Sell;
