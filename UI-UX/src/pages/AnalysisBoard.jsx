import React, { useState, useEffect } from 'react';
import { getVoteApi } from '../apis/Api';
import '../style/analysis.css';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Ensure Chart.js is imported for react-chartjs-2 to work

function VoteList() {
    const [votes, setVotes] = useState([]);
    const [partyVotes, setPartyVotes] = useState([]);
    const [crossVotesInfo, setCrossVotesInfo] = useState({ totalCrossVotes: 0, crossVotesDetails: [] });
    const [candidateVotes, setCandidateVotes] = useState([]);
    const [candidateCrossVotes, setCandidateCrossVotes] = useState([]);

    useEffect(() => {
        getVoteApi().then((res) => {
            console.log(res.data);
            setVotes(res.data.votes);

            const partyVoteCounts = {};
            let crossVotes = [];
            let candidateVoteCounts = {};
            let candidateCrossVoteCounts = {};

            res.data.votes.forEach((vote) => {
                const partyName = vote.to && vote.to.personParty;
                const personName = vote.to && vote.to.personName;
                if (partyName) {
                    partyVoteCounts[partyName] = (partyVoteCounts[partyName] || 0) + 1;
                }

                // Check for cross voting
                if (vote.by.party !== vote.to.personParty) {
                    crossVotes.push({
                        voter: vote.by.email,
                        voterParty: vote.by.party,
                        candidateParty: partyName,
                        candidateName: personName,
                        dateVoted: vote.createdAt,
                    });

                    // Count cross votes for each candidate
                    if (personName) {
                        candidateCrossVoteCounts[personName] = (candidateCrossVoteCounts[personName] || 0) + 1;
                    }
                }

                // Count votes for each candidate
                if (personName) {
                    candidateVoteCounts[personName] = (candidateVoteCounts[personName] || 0) + 1;
                }
            });

            const partyVoteArray = Object.entries(partyVoteCounts);
            partyVoteArray.sort((a, b) => b[1] - a[1]);
            setPartyVotes(partyVoteArray);

            // Set cross vote info
            setCrossVotesInfo({
                totalCrossVotes: crossVotes.length,
                crossVotesDetails: crossVotes,
            });

            // Set candidate vote info
            setCandidateVotes(Object.entries(candidateVoteCounts));

            // Set candidate cross vote info
            setCandidateCrossVotes(Object.entries(candidateCrossVoteCounts));
        });
    }, []);

    // Calculate most cross-voted party
    let crossVoteCountsByParty = {};
    crossVotesInfo.crossVotesDetails.forEach(vote => {
        const { candidateParty } = vote;
        if (candidateParty) {
            crossVoteCountsByParty[candidateParty] = (crossVoteCountsByParty[candidateParty] || 0) + 1;
        }
    });

    let maxCrossVotes = 0;
    let partyWithMostCrossVotes = '';
    Object.entries(crossVoteCountsByParty).forEach(([party, count]) => {
        if (count > maxCrossVotes) {
            maxCrossVotes = count;
            partyWithMostCrossVotes = party;
        }
    });

    // Prepare data for the chart with partyVotes
    const chartData = {
        labels: partyVotes.map(([party]) => party),
        datasets: [{
            label: 'Total Votes by Party',
            data: partyVotes.map(([, votes]) => votes),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Prepare data for the cross vote chart
    const crossVoteChartData = {
        labels: Object.keys(crossVoteCountsByParty),
        datasets: [{
            label: 'Cross Votes by Party',
            data: Object.values(crossVoteCountsByParty),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Prepare data for the candidate vote chart
    const candidateChartData = {
        labels: candidateVotes.map(([candidate]) => candidate),
        datasets: [{
            label: 'Total Votes by Candidate',
            data: candidateVotes.map(([, votes]) => votes),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Prepare data for the candidate cross vote chart
    const candidateCrossVoteChartData = {
        labels: candidateCrossVotes.map(([candidate]) => candidate),
        datasets: [{
            label: 'Total Cross Votes by Candidate',
            data: candidateCrossVotes.map(([, votes]) => votes),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div style={{ marginTop: "180px" }}>
            <h1>Party Vote Summary</h1>
            {/* Chart */}
            <div style={{ width: '600px', height: '400px', margin: '0 auto', marginBottom: '40px' }}>
                <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
            {/* Party Vote Summary Table */}
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Party</th>
                            <th>Total Votes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partyVotes.map(([party, voteCount], index) => (
                            <tr key={index}>
                                <td>{party}</td>
                                <td>{voteCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Cross Vote Summary */}
            <div style={{ width: '600px', height: '400px', margin: '0 auto', marginBottom: '40px' }}>
                <Bar data={crossVoteChartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
            <div className="table-responsive" style={{ marginTop: '20px' }}>
                <h2>Cross Vote Summary</h2>
                <p>Total Cross Votes: {crossVotesInfo.totalCrossVotes}</p>
                <p>Party with Most Cross Votes: {partyWithMostCrossVotes} ({maxCrossVotes} votes)</p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Voter Email</th>
                            <th>Voter Party</th>
                            <th>Candidate Party</th>
                            <th>Candidate Name</th>
                            <th>Date Voted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crossVotesInfo.crossVotesDetails.map((crossVote, index) => (
                            <tr key={index}>
                                <td>{crossVote.voter}</td>
                                <td>{crossVote.voterParty}</td>
                                <td>{crossVote.candidateParty}</td>
                                <td>{crossVote.candidateName}</td>
                                <td>{new Date(crossVote.dateVoted).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div><h1>Individual Analysis</h1></div>
            {/* Candidate Vote Summary */}
            <div style={{ width: '600px', height: '400px', margin: '0 auto', marginBottom: '40px' }}>
                <Bar data={candidateChartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
            {/* Candidate Cross Vote Summary */}
            <div style={{ width: '600px', height: '400px', margin: '0 auto', marginBottom: '40px' }}>
                <Bar data={candidateCrossVoteChartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
            </div>
        </div>
    );
}

export default VoteList;
