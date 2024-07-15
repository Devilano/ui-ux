import React, { useState, useEffect } from 'react';
import { getVoteApi } from '../../apis/Api';
import '../../style/votedashboard.css';

function VoteList() {
    const [votes, setVotes] = useState([]);
    const [candidateVotes, setCandidateVotes] = useState([]);


    useEffect(() => {
        getVoteApi()
            .then((res) => {
                console.log('Response data:', res.data); // Log the response data to inspect its structure
                if (res.data && res.data.votes && Array.isArray(res.data.votes)) {
                    setVotes(res.data.votes);
    
                    const candidateVotesMap = {};
                    res.data.votes.forEach((vote) => {
                        const candidateName = vote.to && vote.to.propertyName;
                        if (candidateName) {
                            candidateVotesMap[candidateName] = (candidateVotesMap[candidateName] || 0) + 1;
                        }
                    });
    
                    const candidateVoteArray = Object.entries(candidateVotesMap);
                    candidateVoteArray.sort((a, b) => b[1] - a[1]);
    
                    setCandidateVotes(candidateVoteArray);
                } else {
                    console.log('Response data:', res.data);

                    console.error('Invalid response data format:', res.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching vote data:', error);
            });
    }, []);

    return (
        <div style={{ marginTop: "160px" }}>
            <h1>Cantidated Vote summmary</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Total Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidateVotes.map(([candidate, voteCount], index) => (
                            <tr key={candidate}>
                                <td>{candidate}</td>
                                <td>{voteCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="candidate-vote-summary">
                <h2>Latest Voted Data</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Voter</th>
                            <th>Candidate Voted For</th>
                            <th>Date Voted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.map((vote) => (
                            <tr key={vote._id}>
                                <td>{vote.by && vote.by.email}</td>
                                <td>{vote.to && vote.to.propertyName}</td>
                                <td>{vote.createdAt && new Date(vote.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VoteList;
