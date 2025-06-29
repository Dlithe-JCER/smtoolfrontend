import React, { useState } from 'react';
import Swal from 'sweetalert2';

function TrainersRequirement() {
    const [formData, setFormData] = useState({
        preRequisites: '',
        schedule: '',
        programAgenda: '',
        executionApproach: '',
        labRequirements: '',
        caseStudies: '',
        expectedOutcome: '',
        deliverables: '',
        profileSummary: '',
        commercials: '',
        availability: '',
        submittedBy: '',
        trainingName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/trainerresponses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                Swal.fire("Success", "Trainer requirement submitted!", "success");
                setFormData({
                    preRequisites: '',
                    schedule: '',
                    programAgenda: '',
                    executionApproach: '',
                    labRequirements: '',
                    caseStudies: '',
                    expectedOutcome: '',
                    deliverables: '',
                    profileSummary: '',
                    commercials: '',
                    availability: '',
                    submittedBy: '',
                    trainingName: ''
                });
            } else {
                Swal.fire("Error", "Failed to submit requirement", "error");
            }
        } catch (err) {
            Swal.fire("Error", "Something went wrong", "error");
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Trainer Requirement Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {[
                    { label: "1. Pre-requisites", name: "preRequisites", placeholder: "Describe foundational knowledge..." },
                    { label: "2. Schedule", name: "schedule", placeholder: "Provide timeline..." },
                    { label: "3. Program Agenda", name: "programAgenda", placeholder: "Include key topics..." },
                    { label: "4. Execution Approach", name: "executionApproach", placeholder: "Describe key steps..." },
                    { label: "5. Lab Requirements", name: "labRequirements", placeholder: "Mention necessary hardware/software..." },
                    { label: "6. Case Studies", name: "caseStudies", placeholder: "Share past case studies..." },
                    { label: "7. Expected Outcome", name: "expectedOutcome", placeholder: "Mention outcomes..." },
                    { label: "8. Deliverables", name: "deliverables", placeholder: "List specific deliverables..." },
                    { label: "9. Your Profile Summary", name: "profileSummary", placeholder: "Write a short profile summary..." },
                    { label: "10. Your Commercials", name: "commercials", placeholder: "Mention cost and taxes..." },
                    { label: "11. Availability", name: "availability", placeholder: "Provide date/time options..." },
                    { label: "12. Submitted By", name: "submittedBy", placeholder: "Your full name or organization..." },
                    { label: "13. Training Name", name: "trainingName", placeholder: "Descriptive name for training..." }
                ].map(({ label, name, placeholder }) => (
                    <div key={name}>
                        <label htmlFor={name} className="block font-semibold text-gray-800 mb-1">{label}</label>
                        <textarea
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            rows={3}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                ))}
                <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default TrainersRequirement;
