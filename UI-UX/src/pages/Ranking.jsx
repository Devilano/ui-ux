import React, { useEffect, useState } from 'react';
import { getVoteApi } from '../apis/Api';
import '../style/ranking.css'; // Import CSS file

const Ranking = () => {
  const [votes, setVotes] = useState([]);
  const [candidateVotes, setCandidateVotes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getVoteApi().then((res) => {
      console.log(res.data);
      setVotes(res.data.votes);

      // Calculate total votes for each candidate
      const candidateVoteCounts = {};
      res.data.votes.forEach((vote) => {
        const candidateName = vote.to && vote.to.personName;
        const candidateParty = vote.to && vote.to.personParty;
        const candidateImageUrl = vote.to && vote.to.personImageUrl;
        
        if (candidateName) {
          candidateVoteCounts[candidateName] = {
            voteCount: (candidateVoteCounts[candidateName]?.voteCount || 0) + 1,
            party: candidateParty,
            imageUrl: candidateImageUrl
          };
        }
      });

      // Convert to array for sorting
      const candidateVoteArray = Object.entries(candidateVoteCounts);

      // Sort candidates by vote count in descending order
      candidateVoteArray.sort((a, b) => b[1].voteCount - a[1].voteCount);

      setCandidateVotes(candidateVoteArray);
    });
  }, []);

  const colo = {
    backgroundColor: isHovered ? 'green' : 'lightgreen',
    padding: '10px',
    borderRadius: '40px',
    transition: 'background-color 0.3s',
    float: 'left',
    cursor: 'pointer',
    color: isHovered ? 'white' : 'black'
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="container mt-5" style={{ paddingTop: '170px' }}>
      <h1>Overall Ranking</h1>
      <h1 style={colo} onMouseEnter={handleHover} onMouseLeave={handleLeave} onClick={handleClick}>
        Leading
      </h1>
      {candidateVotes.map(([candidate, { voteCount, party, imageUrl }], index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body d-flex align-items-center">
            <div className="ranking mr-3">{index + 1}</div>
            <div className="image-container">
              <img src={imageUrl} className="rounded" alt={`Candidate ${index + 1}`} />
            </div>
            <div className="media-body ml-3">
              <h5 className="party-name">{candidate}</h5>
              <p className="position">{party}</p>
              <p className="position">Vote Count: {voteCount}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ranking;
