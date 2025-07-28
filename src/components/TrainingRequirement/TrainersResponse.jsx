import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrainerResponse = () => {
    const [responses, setResponses] = useState([]);
    const navigate = useNavigate();

    const fetchResponses = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/trainerresponses`);
            const data = res.data;

            // Sort alphabetically by submittedBy (case-insensitive)
            data.sort((a, b) =>
                a.submittedBy.toLowerCase() > b.submittedBy.toLowerCase() ? 1 : -1
            );

            setResponses(data);
        } catch (error) {
            console.error('Error fetching trainer responses:', error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this response?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/trainerresponses/${id}`);
                Swal.fire('Deleted!', 'Trainer response deleted.', 'success');
                fetchResponses();
            } catch (error) {
                Swal.fire('Error!', 'Failed to delete response.', 'error');
                console.error('Delete error:', error);
            }
        }
    };

    const handleView = (id) => {
        navigate(`/trainer-response/${id}`);
    };

    useEffect(() => {
        fetchResponses();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6 relative">
            {/* Go Back Button */}
            <Link
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                to={'/trp'}
            >
                ← Go Back
            </Link>

            <h2 className="text-2xl font-bold mb-6 text-[#1F3C88]">All Trainer Responses</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-3 py-2 border">Submission ID</th>
                            <th className="px-3 py-2 border">Submitted By</th>
                            <th className="px-3 py-2 border">Training Name</th>
                            <th className="px-3 py-2 border">Contact</th>
                            <th className="px-3 py-2 border">Email</th>
                            <th className="px-3 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.length > 0 ? (
                            responses.map((item) => (
                                <tr key={item._id} className="border-t">
                                    <td className="px-3 py-2 border font-mono text-xs">{item._id}</td>
                                    <td className="px-3 py-2 border">{item.submittedBy}</td>
                                    <td className="px-3 py-2 border">{item.trainingName}</td>
                                    <td className="px-3 py-2 border">{item.contactNumber}</td>
                                    <td className="px-3 py-2 border">{item.email}</td>
                                    <td className="px-3 py-2 border text-center space-x-2">
                                        <button
                                            onClick={() => handleView(item._id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500 font-medium">
                                    No trainer responses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrainerResponse;