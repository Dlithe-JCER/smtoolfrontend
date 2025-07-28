import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TrainerForm = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", experience: "", skills: "", resume: null,
        baseLocation: "", linkedInProfile: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allFilled = Object.values(formData).every(val => val);
        if (!allFilled) {
            MySwal.fire("Missing Fields", "Please fill in all the required details.", "warning");
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, val]) => data.append(key, val));

        try {
            const response = await axios.post("http://localhost:5000/api/trainers", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.exists) {
                MySwal.fire("Duplicate Entry", "Trainer with this email or phone already exists.", "error");
            } else {
                MySwal.fire({
                    title: "Success 🎉",
                    text: "Trainer added successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                setFormData({
                    name: "", email: "", phone: "", experience: "", skills: "",
                    resume: null, baseLocation: "", linkedInProfile: ""
                });
            }
        } catch (error) {
            console.error("Error adding trainer:", error);
            MySwal.fire("Server Error", "Trainer might already exist or server error occurred.", "error");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 relative font-sans">
            {/* Go Back */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                ← Go Back
            </button>

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
                <h2 className="text-3xl font-bold text-center text-[#1F3C88] mb-8">Add New Trainer</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Experience (in years)"
                        value={formData.experience}
                        onChange={e => setFormData({ ...formData, experience: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Skills (comma-separated)"
                        value={formData.skills}
                        onChange={e => setFormData({ ...formData, skills: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Base Location"
                        value={formData.baseLocation}
                        onChange={e => setFormData({ ...formData, baseLocation: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                    />

                    {/* LinkedIn Field with Rounded Font Awesome Icon */}
                    <div className="flex items-center space-x-3 col-span-1 md:col-span-2">
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full cursor-pointer hover:bg-blue-900 transition"
                        >
                            <i className="fa-brands fa-linkedin text-white text-xl"></i>
                        </a>
                        <input
                            type="text"
                            placeholder="LinkedIn Profile URL"
                            value={formData.linkedInProfile}
                            onChange={e => setFormData({ ...formData, linkedInProfile: e.target.value })}
                            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <input
                            type="file"
                            onChange={e => setFormData({ ...formData, resume: e.target.files[0] })}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                            required
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 text-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#1F3C88] hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Add Trainer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrainerForm;
