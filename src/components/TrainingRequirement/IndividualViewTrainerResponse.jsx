import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function IndividualViewTrainerResponse() {
    const { id } = useParams();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/trainerresponses/${id}`);
                setResponse(res.data);
            } catch (error) {
                console.error('Error fetching individual trainer response:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponse();
    }, [id]);

    if (loading) {
        return <div className="p-6 text-center text-lg font-semibold">Loading...</div>;
    }

    if (!response) {
        return (
            <div className="p-6 text-center text-red-500 font-semibold">
                Trainer response not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 relative">
            <Link
                to="/trainerresponses"
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                ← Back
            </Link>

            <h2 className="text-2xl font-bold text-[#1F3C88] mb-4">Trainer Response Details</h2>

            <div className="space-y-2 text-gray-800">
                <p><strong>Submission ID:</strong> {response._id}</p>
                <p><strong>Submitted By:</strong> {response.submittedBy}</p>
                <p><strong>Training Name:</strong> {response.trainingName}</p>
                <p><strong>Contact Number:</strong> {response.contactNumber}</p>
                <p><strong>Email:</strong> {response.email}</p>
                <p><strong>Pre-Requisites:</strong> {response.preRequisites}</p>
                <p><strong>Schedule:</strong> {response.schedule}</p>
                <p><strong>Program Agenda:</strong> {response.programAgenda}</p>
                <p><strong>Execution Approach:</strong> {response.executionApproach}</p>
                <p><strong>Lab Requirements:</strong> {response.labRequirements}</p>
                <p><strong>Case Studies:</strong> {response.caseStudies}</p>
                <p><strong>Expected Outcome:</strong> {response.expectedOutcome}</p>
                <p><strong>Deliverables:</strong> {response.deliverables}</p>
                <p><strong>Profile Summary:</strong> {response.profileSummary}</p>
                <p><strong>Commercials:</strong> {response.commercials}</p>
                <p><strong>Available for Scoping Call:</strong> {response.availableForScopingCall}</p>
                <p><strong>Available for Training Execution:</strong> {response.availableForTrainingExecution}</p>

            </div>
        </div>
    );
}

export default IndividualViewTrainerResponse;
