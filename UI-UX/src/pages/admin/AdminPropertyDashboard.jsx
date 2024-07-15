import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createPropertyApi, deletePropertyApi, getAllPropertyApi } from '../../apis/Api';
import { Link } from 'react-router-dom';
import '../../style/adminDashboard.css'; // Make sure to create and import this CSS file

const AdminPropertyDashboard = () => {
  // State for property details
  const [propertyName, setPropertyName] = useState('');
  const [type, setType] = useState('Rent');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [personImage, setPersonImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // State for property list
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllPropertyApi().then((res) => {
      console.log(res.data);
      setProperties(res.data.property);
    });
  }, []);

  // Handlers for input changes
  const changePropertyName = (e) => {
    setPropertyName(e.target.value);
  };

  const changeType = (e) => {
    setType(e.target.value);
  };

  const changeLocation = (e) => {
    setLocation(e.target.value);
  };

  const changeCity = (e) => {
    setCity(e.target.value);
  };

  const changePrice = (e) => {
    setPrice(e.target.value);
  };

  const changeDetails = (e) => {
    setDetails(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPersonImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('propertyName', propertyName);
    formData.append('type', type);
    formData.append('location', location);
    formData.append('city', city);
    formData.append('price', price);
    formData.append('details', details);
    formData.append('personImage', personImage);

    createPropertyApi(formData).then((res) => {
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        window.location.reload();
      }
    }).catch(e => {
      toast.error("Server Error");
      console.log(e);
    });
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure want to delete?");
    if (!confirmDialog) {
      return;
    } else {
      deletePropertyApi(id).then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  return (
    <>
      <div className='dashboard-container m-4'>
        <div className='header d-flex justify-content-between align-items-center' style={{ marginTop: "20px" }}>
          <h2 className="title">Property Details</h2>
          <div className="actions">
            <Link to="/voteList" className="btn btn-primary custom-btn">
              Buy Request List
            </Link>
            <Link to="/progressAD" className="btn btn-primary custom-btn">
              Sell Request List
            </Link>
            <button type="button" className="btn btn-primary custom-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add Details
            </button>
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Property</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className='form-group' onSubmit={handleSubmit}>
                  <input type="text" onChange={changePropertyName} className='form-control mb-3' placeholder='Property Name' />
                  <input type="text" onChange={changePrice} className='form-control mb-3' placeholder='Price' />
                  <input type="text" onChange={changeLocation} className='form-control mb-3' placeholder='Location' />
                  <input type="text" onChange={changeCity} className='form-control mb-3' placeholder='City' />
                  <select name="Types" onChange={changeType} className='form-control mb-3'>
                    <option value="Rent">Rent</option>
                    <option value="Sell">Sell</option>
                  </select>
                  <textarea onChange={changeDetails} className='form-control mb-3' rows='3' placeholder='Details'></textarea>
                  <input type="file" onChange={handleImageUpload} className='form-control mb-3' />
                  {previewImage && <img className='img-fluid rounded' src={previewImage} alt='propertyImage' height={100} />}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary rounded" onClick={handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-hover mt-3">
          <thead className='table-dark'>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Property Name</th>
              <th scope="col">Location</th>
              <th scope="col">City</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Details</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item) => (
              <tr key={item._id}>
                <td><img src={item.personImageUrl} height={40} width={40} alt="" className="rounded" /></td>
                <td>{item.propertyName}</td>
                <td>{item.location}</td>
                <td>{item.city}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>{item.details}</td>
                <td>
                  <div className='btn-group' role='group'>
                    <Link to={`/admin/edit/${item._id}`} className='btn btn-success custom-btn'>Edit</Link>
                    <button onClick={() => handleDelete(item._id)} className='btn btn-danger custom-btn'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminPropertyDashboard;
