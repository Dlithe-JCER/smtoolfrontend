import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchTrainer = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/trainers");
                setTrainers(response.data);
            } catch (error) {
                console.error("Error fetching trainers:", error);
            }
        };

        fetchTrainers();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === "") {
            setSuggestions([]);
            return;
        }

        const filteredTrainers = trainers.filter(trainer =>
            trainer.name.toLowerCase().includes(term.toLowerCase()) ||
            trainer.skills?.some(skill => skill.toLowerCase().includes(term.toLowerCase())) ||
            trainer.experience?.toString().includes(term)
        );

        setSuggestions(filteredTrainers);
    };

    const handleSelectTrainer = (trainer) => {
        setSelectedTrainer(trainer);
        setSearchTerm(trainer.name);
        setSuggestions([]);
    };

    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                ← Go Back
            </button>

            <div className="search-trainer p-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto mt-16">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Search Trainer</h2>

                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search by Name, Skills, or Experience..."
                    value={searchTerm}
                    onChange={handleSearch}
                />

                {suggestions.length > 0 && (
                    <div className="suggestions mt-4 p-4 bg-gray-100 rounded-md shadow-md max-h-72 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-2">Suggestions:</h3>
                        <ul className="space-y-2">
                            {suggestions.map((trainer) => (
                                <li
                                    key={trainer._id}
                                    className="border p-2 rounded shadow-sm cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSelectTrainer(trainer)}
                                >
                                    <strong>{trainer.name}</strong> - {trainer.experience} years - {trainer.skills?.join(", ")}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedTrainer && (
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Trainer Details</h3>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 p-2">Name</th>
                                    <th className="border border-gray-300 p-2">Email</th>
                                    <th className="border border-gray-300 p-2">Phone</th>
                                    <th className="border border-gray-300 p-2">Experience</th>
                                    <th className="border border-gray-300 p-2">Skills</th>
                                    <th className="border border-gray-300 p-2">Base Location</th>
                                    <th className="border border-gray-300 p-2">LinkedIn</th>
                                    <th className="border border-gray-300 p-2">Download Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-center">
                                    <td className="border border-gray-300 p-2">{selectedTrainer.name}</td>
                                    <td className="border border-gray-300 p-2">{selectedTrainer.email}</td>
                                    <td className="border border-gray-300 p-2">{selectedTrainer.phone}</td>
                                    <td className="border border-gray-300 p-2">{selectedTrainer.experience} years</td>
                                    <td className="border border-gray-300 p-2">{selectedTrainer.skills?.join(", ")}</td>
                                    <td className="border border-gray-300 p-2">{selectedTrainer.baseLocation}</td>
                                    <td className="border border-gray-300 p-2">
                                        <a
                                            href={selectedTrainer.linkedInProfile}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            LinkedIn
                                        </a>
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {selectedTrainer.resume && (
                                            <a
                                                href={`http://localhost:5000/uploads/${selectedTrainer.resume}`}
                                                download
                                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
                                            >
                                                Download Resume
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchTrainer;
