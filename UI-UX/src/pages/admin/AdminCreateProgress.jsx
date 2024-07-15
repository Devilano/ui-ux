import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createProgressApi, deleteProgressApi, getAllProgressApi } from '../../apis/Api';
import { Link } from 'react-router-dom';

const AdminCreateProgress = () => {
    const [progress, setProgress] = useState([]);
    const [approvedItems, setApprovedItems] = useState([]); // State to track approved items

    useEffect(() => {
        getAllProgressApi().then((res) => {
            console.log(res.data);
            setProgress(res.data.progress);
        });
    }, []);

    const handleApprove = (id) => {
        setApprovedItems([...approvedItems, id]);
        toast.success('Approved');
    };

    const handleDelete = (id) => {
        const confirmDialog = window.confirm("Are you sure want to delete?");
        if (!confirmDialog) {
            return;
        } else {
            // Make API call
            deleteProgressApi(id).then((res) => {
                if (res.data.success === true) {
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
                    <h2>Sell Req From User</h2>
                    <Link to="/adminP" className="btn btn-secondary">
                        Back
                    </Link>
                </div>
                <table className="table table-striped mt-2">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">House Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">City</th>
                            <th scope="col">Type</th>
                            <th scope="col">For</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Rooms</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {progress.map((item) => (
                            <tr key={item._id}>
                                <td><img src={item.newsImageUrl} height={20} width={20} alt="" /></td>
                                <td>{item.propertyName}</td>
                                <td>{item.location}</td>
                                <td>{item.city}</td>
                                <td>{item.type}</td>
                                <td>{item.whatFor}</td>
                                <td>{item.contact}</td>
                                <td>{item.rooms}</td>
                                <td>{item.price.slice(0, 10)}</td>
                                <td>
                                    <div className='btn-group' role='group'>
                                        <button 
                                            onClick={() => handleApprove(item._id)} 
                                            className='btn'
                                            style={{
                                                backgroundColor: approvedItems.includes(item._id) ? 'green' : '#072b5a',
                                                color: 'white'
                                            }}
                                        >
                                            Approve
                                        </button>
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

export default AdminCreateProgress;
