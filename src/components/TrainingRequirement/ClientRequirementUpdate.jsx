import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ClientRequirementUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        _id: '',
        clientName: '',
        requirements: '',
        modeOfTraining: '',
        tentativeSchedule: '',
        trainingDates: '',
        numberOfBatches: 1,
        numberOfParticipants: 1,
        trainingLocation: '',
        participantBackground: '',
        labRequirement: '',
        proposalStatus: 'pending',
        proposalValue: 0,
        remarks: '',
        assignmentCode: ''
    });

    useEffect(() => {
        const fetchRequirement = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/client-requirements/${id}`);
                setFormData(res.data);
            } catch (error) {
                console.error('Failed to fetch requirement:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch the requirement.'
                });
            }
        };
        fetchRequirement();
    }, [id]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/client-requirements/${id}`, formData);

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Requirement updated successfully.',
                timer: 2000,
                showConfirmButton: false
            });

            setTimeout(() => {
                navigate('/viewrequirements', { state: { updatedId: id } });
            }, 2000);

        } catch (error) {
            console.error('Failed to update requirement:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Please try again.'
            });
        }
    };

    return (
        <>
            <button
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => navigate(-1)}
            >
                ← Go Back
            </button>

            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Update Client Requirement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Record ID</label>
                        <input
                            type="text"
                            name="_id"
                            value={formData._id || ''}
                            readOnly
                            className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {[
                        ['Client Name', 'clientName'],
                        ['Requirement', 'requirements'],
                        ['Mode of Training', 'modeOfTraining'],
                        ['Tentative Schedule', 'tentativeSchedule'],
                        ['Training Dates', 'trainingDates'],
                        ['Number of Batches', 'numberOfBatches'],
                        ['Number of Participants', 'numberOfParticipants'],
                        ['Training Location', 'trainingLocation'],
                        ['Participant Background', 'participantBackground'],
                        ['Lab Requirement', 'labRequirement'],
                        ['Proposal Status', 'proposalStatus'],
                        ['Proposal Value (₹)', 'proposalValue'],
                        ['Remarks', 'remarks'],
                        ['Assignment Code', 'assignmentCode']
                    ].map(([label, name]) => (
                        <div key={name}>
                            <label className="block mb-1 font-medium">{label}</label>
                            <input
                                type={['numberOfBatches', 'numberOfParticipants', 'proposalValue'].includes(name) ? 'number' : 'text'}
                                name={name}
                                value={formData[name] || ''}
                                onChange={handleChange}
                                required={['clientName', 'requirements', 'modeOfTraining', 'tentativeSchedule'].includes(name)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}

export default ClientRequirementUpdate;
