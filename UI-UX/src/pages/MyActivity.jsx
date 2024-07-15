import React, { useState, useEffect } from 'react';
import { getVoteApi } from '../apis/Api';
import { Link } from 'react-router-dom';
import '../style/votedashboard.css';

function MyActivity() {
    const [votes, setVotes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage when component mounts
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            // Parse storedUserData if it exists
            setCurrentUser(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            getVoteApi()
                .then((res) => {
                    console.log('Response data:', res.data); // Log the response data to inspect its structure
                    if (res.data && res.data.votes && Array.isArray(res.data.votes)) {
                        const userVotes = res.data.votes.filter(vote => vote.by._id === currentUser._id);
                        setVotes(userVotes);
                    } else {
                        console.error('Invalid response data format:', res.data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching vote data:', error);
                });
        }
    }, [currentUser]);

    return (
        <div style={{ marginTop: "160px", position: 'relative' }}>
            <Link 
                className="btn btn-secondary" 
                style={{ position: 'absolute', top: '20px', right: '20px' }}
                to="/profile"
            >
                Back
            </Link>
            <h1>My Requested Properties</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Property Name</th>
                            <th>City</th>
                            <th>Image</th>
                            <th>Requested Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.map((vote) => (
                            <tr key={vote._id}>
                                <td>{vote.to && vote.to.propertyName}</td>
                                <td>{vote.to && vote.to.city}</td>
                                <td>
                                    {vote.to && vote.to.personImageUrl && (
                                        <img
                                            src={vote.to.personImageUrl}
                                            alt="Voted Property"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                    )}
                                </td>
                                <td>{vote.createdAt && new Date(vote.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyActivity;
