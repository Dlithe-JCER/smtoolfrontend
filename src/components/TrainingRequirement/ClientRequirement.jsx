import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function ClientRequirement() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        clientName: '',
        requirements: '',
        modeOfTraining: '',
        tentativeSchedule: '',
        numberOfBatches: '',
        numberOfParticipants: '',
        trainingDates: '',
        trainingLocation: '',
        participantBackground: '',
        labRequirement: '',
        proposalStatus: '',
        proposalValue: '',
        remarks: '',
        assignmentCode: ''
    });

    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/client-requirements`);
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, []);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                // Changed from POST to GET
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/client-requirements`);
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to load clients",
                    text: error.response?.data?.message || "Please try again later.",
                    confirmButtonColor: "#d33"
                });
            }
        };
        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'clientName') {
            const filtered = clients.filter(client =>
                client.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredClients(filtered);
        }
    };

    const startListening = (fieldName) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setFormData(prev => ({ ...prev, [fieldName]: transcript }));
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/client-requirements`, formData);

            Swal.fire({
                icon: "success",
                title: "Submitted Successfully",
                text: "Client requirement recorded!",
                confirmButtonColor: "#1F3C88"
            });

            setFormData({
                clientName: '',
                requirements: '',
                modeOfTraining: '',
                tentativeSchedule: '',
                numberOfBatches: '',
                numberOfParticipants: '',
                trainingDates: '',
                trainingLocation: '',
                participantBackground: '',
                labRequirement: '',
                proposalStatus: '',
                proposalValue: '',
                remarks: '',
                assignmentCode: ''
            });

            setFilteredClients([]);
        } catch (error) {
            console.error('Submission error:', error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Please try again later.",
                confirmButtonColor: "#d33"
            });
        }
    };

    const inputClass = "w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300";

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10 relative">
            <Link
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                to={'/trp'}
            >
                ← Go Back
            </Link>
            <h2 className="text-2xl font-bold text-[#1F3C88] mb-6 text-center">Client Requirement Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <label className="font-semibold text-[#1F3C88]">Client Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                className={`${inputClass} pr-10`}
                                placeholder="Start typing..."
                            />
                            <button
                                type="button"
                                onClick={() => startListening("clientName")}
                                className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </div>
                        {filteredClients.length > 0 && (
                            <div className="absolute bg-white border rounded mt-1 w-full max-h-40 overflow-y-auto z-10">
                                {filteredClients.map((client) => (
                                    <p
                                        key={client.id}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setFormData({ ...formData, clientName: client.name })}
                                    >
                                        {client.name}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Mode of Training</label>
                        <select name="modeOfTraining" value={formData.modeOfTraining} onChange={handleChange} className={inputClass}>
                            <option value="">Select Mode</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Tentative Schedule</label>
                        <input type="date" name="tentativeSchedule" value={formData.tentativeSchedule} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Training Dates</label>
                        <input type="date" name="trainingDates" value={formData.trainingDates} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Number of Batches</label>
                        <input type="number" name="numberOfBatches" value={formData.numberOfBatches} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Number of Participants</label>
                        <input type="number" name="numberOfParticipants" value={formData.numberOfParticipants} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Training Location</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="trainingLocation"
                                value={formData.trainingLocation}
                                onChange={handleChange}
                                className={`${inputClass} pr-10`}
                            />
                            <button
                                type="button"
                                onClick={() => startListening("trainingLocation")}
                                className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Participant Background</label>
                        <div className="relative">
                            <textarea
                                name="participantBackground"
                                value={formData.participantBackground}
                                onChange={handleChange}
                                className={`${inputClass} pr-10`}
                                rows={2}
                            />
                            <button
                                type="button"
                                onClick={() => startListening("participantBackground")}
                                className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Requirements */}
                <div>
                    <label className="font-semibold text-[#1F3C88]">Elaborated Requirements</label>
                    <div className="relative">
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            className={`${inputClass} pr-10`}
                            rows={3}
                        />
                        <button
                            type="button"
                            onClick={() => startListening("requirements")}
                            className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                        >
                            <FontAwesomeIcon icon={faMicrophone} />
                        </button>
                    </div>
                </div>

                {/* Lab Requirement */}
                <div>
                    <label className="font-semibold text-[#1F3C88]">Lab Requirement</label>
                    <select name="labRequirement" value={formData.labRequirement} onChange={handleChange} className={inputClass}>
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="optional">Optional</option>
                    </select>
                </div>

                {/* Proposal Status & Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Proposal Status</label>
                        <select name="proposalStatus" value={formData.proposalStatus} onChange={handleChange} className={inputClass}>
                            <option value="">Select Status</option>
                            <option value="open">Open</option>
                            <option value="inprogress">In Progress</option>
                            <option value="submitted">Submitted</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Proposal Value (₹)</label>
                        <input type="number" name="proposalValue" value={formData.proposalValue} onChange={handleChange} className={inputClass} placeholder="Enter in INR" />
                    </div>
                </div>

                {/* Remarks */}
                {formData.proposalStatus === 'rejected' && (
                    <div>
                        <label className="font-semibold text-[#1F3C88]">Remarks</label>
                        <div className="relative">
                            <textarea
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                className={`${inputClass} pr-10`}
                                rows={2}
                                placeholder="Reason for rejection"
                            />
                            <button
                                type="button"
                                onClick={() => startListening("remarks")}
                                className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Assignment Code */}
                <div>
                    <label className="font-semibold text-[#1F3C88]">Assignment Code (Optional)</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="assignmentCode"
                            value={formData.assignmentCode}
                            onChange={handleChange}
                            className={`${inputClass} pr-10`}
                            placeholder="Enter Assignment Code if any"
                        />
                        <button
                            type="button"
                            onClick={() => startListening("assignmentCode")}
                            className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                        >
                            <FontAwesomeIcon icon={faMicrophone} />
                        </button>
                    </div>
                </div>

                <button type="submit" className="w-full bg-[#1F3C88] text-white font-semibold py-2 rounded mt-6 hover:bg-[#163179] transition">
                    Submit Requirement
                </button>
            </form>
        </div>
    );
}

export default ClientRequirement;