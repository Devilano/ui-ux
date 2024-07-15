import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createPropertyApi, deletePropertyApi, getAllPropertyApi } from '../../apis/Api';
import { Link } from 'react-router-dom';

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
      <div className='m-4'>
        <div className='d-flex justify-content-between' style={{ marginTop: "180px" }}>
          <h2>Property Details</h2>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Details
          </button>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">List</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form className='form-control m-2 p-2'>
                    <input type="text" onChange={changePropertyName} className='form-control mb-2' placeholder='Property Name' />
                    <input type="text" onChange={changePrice} className='form-control mb-2' placeholder='Price' />
                    <input type="text" onChange={changeLocation} className='form-control mb-2' placeholder='Location' />
                    <input type="text" onChange={changeCity} className='form-control mb-2' placeholder='City' />

                    <select name="Types" onChange={changeType} className='form-control mb-2'>
                      <option value="Rent">Rent</option>
                      <option value="Sell">Sell</option>
                    </select>
                    <textarea onChange={changeDetails} className='form-control mb-2' cols='3' placeholder='Details'></textarea>

                    <input type="file" onChange={handleImageUpload} alt="image" width="48" height="48" />

                    {previewImage && <img className='img-fluid rounded object-fit-fit' src={previewImage} alt='propertyImage' height={50} width={50} />}
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary rounded" onClick={handleSubmit}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped mt-2">
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
                <td><img src={item.personImageUrl} height={20} width={20} alt="" /></td>
                <td>{item.propertyName}</td>
                <td>{item.location}</td>
                <td>{item.city}</td>
                <td>{item.price}</td>
                <td>{item.type}</td> 
                <td>{item.details}</td>
                <td>
                  <div className='btn-group' role='group'>
                    <Link to={`/admin/edit/${item._id}`} className='btn btn-success'>Edit</Link>
                    <button onClick={() => handleDelete(item._id)} className='btn rounded btn-danger'>Delete</button>
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
