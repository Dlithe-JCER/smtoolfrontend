import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CombinedDetails = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('${import.meta.env.VITE_API_BASE_URL}/combined/combined-details')
            .then(res => {
                setCombinedData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching combined data:", err);
                setLoading(false);
            });
    }, []);

    const isUpcomingOrOngoing = (trainingDates) => {
        if (!trainingDates) return false;
        const parts = trainingDates.split('to').map(p => p.trim());
        let endDateStr = parts.length === 2 ? parts[1] : parts[0];
        const endDate = new Date(endDateStr);
        if (isNaN(endDate)) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return endDate >= today;
    };

    const getStartDate = (trainingDates) => {
        if (!trainingDates) return new Date(0);
        const parts = trainingDates.split('to').map(p => p.trim());
        return new Date(parts[0]);
    };

    const filteredData = combinedData.filter(item => isUpcomingOrOngoing(item.trainingDates));
    filteredData.sort((a, b) => getStartDate(a.trainingDates) - getStartDate(b.trainingDates));

    if (loading) return <p className="p-6 text-left">Loading...</p>;

    if (filteredData.length === 0) {
        return (
            <div className="p-6 flex justify-between items-center">
                <p className="text-left">No upcoming or ongoing training assignments found.</p>
                <Link to="/trp" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    &larr; Go Back
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-left">Combined Assignment and Trainer Responses</h2>
                <Link to="/trp" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    &larr; Go Back
                </Link>
            </div>

            {filteredData.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4 shadow-md text-left">
                    <h3 className="font-semibold text-lg">Assignment: {item.clientName}</h3>
                    <p className="whitespace-pre-line"><strong>Training Dates:</strong> {item.trainingDates}</p>
                    <p className="whitespace-pre-line"><strong>Mode:</strong> {item.modeOfTraining}</p>
                    <p className="whitespace-pre-line"><strong>Location:</strong> {item.trainingLocation}</p>
                    <p className="whitespace-pre-line"><strong>Assignment Code:</strong> {item.assignmentCode}</p>

                    <h4 className="mt-4 font-semibold">Trainer Response</h4>
                    <p className="whitespace-pre-line"><strong>Submitted By:</strong> {item.trainerResponse.submittedBy}</p>
                    <p className="whitespace-pre-line"><strong>Email:</strong> {item.trainerResponse.email}</p>
                    <p className="whitespace-pre-line"><strong>Training Name:</strong> {item.trainerResponse.trainingName}</p>
                    <p className="whitespace-pre-line"><strong>Execution Approach:</strong> {item.trainerResponse.executionApproach}</p>
                    <p className="whitespace-pre-line"><strong>Expected Outcome:</strong> {item.trainerResponse.expectedOutcome}</p>
                </div>
            ))}
        </div>
    );
};

export default CombinedDetails;
