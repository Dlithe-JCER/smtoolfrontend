import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function ClientRequirementList() {
    const [requirementsGrouped, setRequirementsGrouped] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGroups, setFilteredGroups] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/client-requirements`);
                const filtered = response.data.filter(req => req.isActive !== false);

                const grouped = filtered.reduce((acc, curr) => {
                    const key = curr.clientName || 'Unknown';
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(curr);
                    return acc;
                }, {});

                setRequirementsGrouped(grouped);
                setFilteredGroups(grouped);
            } catch (error) {
                console.error('Error fetching requirements:', error);
            }
        };

        fetchRequirements();
    }, []);

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setFilteredGroups(requirementsGrouped);
            return;
        }

        const filtered = Object.keys(requirementsGrouped)
            .filter(clientName => clientName.toLowerCase().includes(searchTerm.toLowerCase()))
            .reduce((acc, clientName) => {
                acc[clientName] = requirementsGrouped[clientName];
                return acc;
            }, {});

        setFilteredGroups(filtered);
    };

    const handleAction = (req) => {
        navigate(`/clientrequirementupdate/${req._id}`);
    };

    const downloadExcel = () => {
        const allData = Object.values(filteredGroups).flat();

        const formattedData = allData.map(req => ({
            Client: req.clientName,
            Requirements: req.requirements,
            'Mode of Training': req.modeOfTraining,
            'Training Dates': req.trainingDates,
            'No. of Batches': req.numberOfBatches,
            'No. of Participants': req.numberOfParticipants,
            'Training Location': req.trainingLocation,
            'Participant Background': req.participantBackground,
            'Lab Requirement': req.labRequirement,
            'Proposal Status': req.proposalStatus,
            Remarks: req.remarks || '—',
            'Proposal Value (₹)': req.proposalValue,
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Client Requirements');

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}${minutes}${seconds}${ampm}`;

        const timestamp = `client_requirement-${day}-${month}-${year}-${timeString}`;

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, `${timestamp}.xlsx`);
    };

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-blue-700">Client Requirements</h2>
                    <div className="flex gap-2">
                        <Link to="/trp" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            &larr; Go Back
                        </Link>
                        <button
                            onClick={downloadExcel}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Download Excel
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search by client name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded w-80"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>

                <div className="overflow-x-auto">
                    {Object.keys(filteredGroups).length > 0 ? (
                        Object.entries(filteredGroups).map(([clientName, reqList]) => (
                            <div key={clientName} className="mb-8">
                                <h3 className="text-xl font-semibold mb-2">{clientName}</h3>
                                <table className="min-w-full bg-white border border-gray-300 text-sm mb-4">
                                    <thead>
                                        <tr className="bg-gray-200 text-left">
                                            <th className="py-2 px-4 border">Requirements</th>
                                            <th className="py-2 px-4 border">Mode of Training</th>
                                            <th className="py-2 px-4 border">Training Dates</th>
                                            <th className="py-2 px-4 border">No. of Batches</th>
                                            <th className="py-2 px-4 border">No. of Participants</th>
                                            <th className="py-2 px-4 border">Training Location</th>
                                            <th className="py-2 px-4 border">Participants Background</th>
                                            <th className="py-2 px-4 border">Lab Requirement</th>
                                            <th className="py-2 px-4 border">Proposal Status</th>
                                            {reqList.some(req => req.proposalStatus === 'Rejected') && (
                                                <th className="py-2 px-4 border">Remarks</th>
                                            )}
                                            <th className="py-2 px-4 border">Proposal Value (₹)</th>
                                            <th className="py-2 px-4 border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reqList.map(req => (
                                            <tr key={req._id} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border">{req.requirements}</td>
                                                <td className="py-2 px-4 border">{req.modeOfTraining}</td>
                                                <td className="py-2 px-4 border">{req.trainingDates}</td>
                                                <td className="py-2 px-4 border">{req.numberOfBatches}</td>
                                                <td className="py-2 px-4 border">{req.numberOfParticipants}</td>
                                                <td className="py-2 px-4 border">{req.trainingLocation}</td>
                                                <td className="py-2 px-4 border">{req.participantBackground}</td>
                                                <td className="py-2 px-4 border">{req.labRequirement}</td>
                                                <td className="py-2 px-4 border">{req.proposalStatus}</td>
                                                <td className="py-2 px-4 border">{req.proposalValue}</td>
                                                <td className="py-2 px-4 border">
                                                    <button
                                                        onClick={() => handleAction(req)}
                                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                    >
                                                        {req.proposalStatus === 'Approved' ? 'Proceed' : 'Edit'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-4 text-gray-500">No client requirements found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ClientRequirementList;
