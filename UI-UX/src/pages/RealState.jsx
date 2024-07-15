// PropertyModal.js
import React from 'react';
import Modal from 'react-modal';

const RealEastate = ({ isOpen, onClose, property }) => {
  if (!property) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Property Details">
      <div>
        <h1>{property.propertyName}</h1>
        <img src={property.personImageUrl} alt={property.propertyName} />
        <p>Location: {property.location}</p>
        <p>City: {property.city}</p>
        <p>Price: {property.price}</p>
        <p>Type: {property.type}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default RealEastate;
