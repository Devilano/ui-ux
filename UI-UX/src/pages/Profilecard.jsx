import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVoteApi } from '../apis/Api';
import "../style/profile.css"; // Make sure to create this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCamera, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Profilecard = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [userData, setUserData] = useState(null); // Initialize userData state
  const [votes, setVotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage when component mounts
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      // Parse storedUserData if it exists
      setUserData(JSON.parse(storedUserData));
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    if (userData) {
      getVoteApi()
        .then((res) => {
          console.log('Response data:', res.data); // Log the response data to inspect its structure
          if (res.data && res.data.votes && Array.isArray(res.data.votes)) {
            const userVotes = res.data.votes.filter(vote => vote.by._id === userData._id);
            setVotes(userVotes);
          } else {
            console.error('Invalid response data format:', res.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching vote data:', error);
        });
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to "/login" page
    window.location.href = "/login";    
    setShowLogoutPopup(false); // Close the logout popup
    console.log("Logout function called");
  };

  const handleEditProfile = () => {
    // Show the approval popup
    setShowApprovalPopup(true);
  };

  const handleRecentActivityClick = () => {
    navigate('/activity');
  };

  return (
    <section className="profile-section">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="row g-0">
                {userData && ( // Check if userData exists before rendering
                  <React.Fragment>
                    <div className="col-md-12 text-center text-white profile-header">
                      <h1 style={{color:"white", backgroundColor:"#072b5a"}}>My Profile</h1>
                    </div>
                    <div className="col-md-12 text-center text-white">
                      <div className="profile-image-container">
                        <img src="assets/profile.jpg" // Replace with your image URL
                          alt="Profile"
                          className="profile-image" />
                        <div className="edit-icon">
                          <FontAwesomeIcon icon={faCamera} />
                        </div>
                      </div>
                      <h2 className="profile-name">{userData.firstName} {userData.lastName}</h2>
                      <p className="profile-phone">{userData.email}</p>
                      <p className="profile-location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {userData.address}
                      </p>
                      <div className="profile-buttons">
                        <button className="btn btn-primary me-3"style={{color:"white", backgroundColor:"#072b5a"}} onClick={() => setShowLogoutPopup(true)}>
                          <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                        <button className="btn btn-secondary"  style={{color:"white", backgroundColor:"#072b5a"}}onClick={handleEditProfile}>Edit Profile</button>
                      </div>
                      <h3 className="recent-activity-header">
                        <button className="btn  text-white"style={{color:"white", backgroundColor:"#e0ac1c"}} onClick={handleRecentActivityClick}>
                          Recent activity
                        </button>
                      </h3>
                      <div className="recent-activity-container">
                        {votes.map((vote) => (
                          <div key={vote._id}>
                            {vote.to && vote.to.personImageUrl && (
                              <img
                                src={vote.to.personImageUrl}
                                alt="Voted Property"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Logout</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogoutPopup(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowLogoutPopup(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Approval Popup */}
      {showApprovalPopup && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowApprovalPopup(false)}></button>
              </div>
              <div className="modal-body">
                <p>Sent to admin site for approval</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowApprovalPopup(false)}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profilecard;
