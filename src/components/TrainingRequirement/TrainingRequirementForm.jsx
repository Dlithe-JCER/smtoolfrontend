import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import dlitheLogo from '../../assets/logo.png'

function TrainingRequirementForm() {
    const [formData, setFormData] = useState({
        submittedBy: "",
        trainingName: "",
        contactNumber: "",
        email: "",
        preRequisites: "",
        schedule: "",
        programAgenda: "",
        executionApproach: "",
        labRequirements: "",
        caseStudies: "",
        expectedOutcome: "",
        deliverables: "",
        profileSummary: "",
        commercials: "",
        availableForScopingCall: "",
        availableForTrainingExecution: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const startListening = (fieldName) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setFormData((prev) => ({ ...prev, [fieldName]: transcript }));
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}trainerresponses`, formData);

            Swal.fire({
                icon: "success",
                title: "Response Recorded",
                text: "Thank you! Your response has been successfully recorded.",
                confirmButtonColor: "#1F3C88",
            });

            setFormData({
                submittedBy: "",
                trainingName: "",
                contactNumber: "",
                email: "",
                preRequisites: "",
                schedule: "",
                programAgenda: "",
                executionApproach: "",
                labRequirements: "",
                caseStudies: "",
                expectedOutcome: "",
                deliverables: "",
                profileSummary: "",
                commercials: "",
                availableForScopingCall: "",
                availableForTrainingExecution: "",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.response?.data?.error || "Something went wrong!",
                confirmButtonColor: "#d33",
            });
        }
    };

    const inputClass = "w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300";

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-8 mt-10">
            <h2 className="text-2xl font-bold text-center text-[#1F3C88] mb-6">Training Requirement Form</h2>
            <form onSubmit={handleSubmit}>
                {[
                    "submittedBy",
                    "trainingName",
                    "contactNumber",
                    "email",
                    "preRequisites",
                    "schedule",
                    "programAgenda",
                    "executionApproach",
                    "labRequirements",
                    "caseStudies",
                    "expectedOutcome",
                    "deliverables",
                    "profileSummary",
                    "commercials",
                ].map((name) => (
                    <div key={name} className="relative">
                        <label className="block font-semibold mb-1 text-[#1F3C88]">
                            {name.replace(/([A-Z])/g, " $1")}
                        </label>
                        <div className="relative">
                            <input
                                type={name === "email" ? "email" : "text"}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className={`${inputClass} pr-10`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => startListening(name)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
                            >
                                <FontAwesomeIcon icon={faMicrophone} />
                            </button>
                        </div>
                    </div>
                ))}

                <div>
                    <label className="block font-semibold mb-1 text-[#1F3C88]">Available Date for Scoping Call</label>
                    <input
                        type="text"
                        name="availableForScopingCall"
                        value={formData.availableForScopingCall}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1 text-[#1F3C88]">Available Date for Training Execution</label>
                    <input
                        type="text"
                        name="availableForTrainingExecution"
                        value={formData.availableForTrainingExecution}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1F3C88] text-white font-semibold py-2 rounded hover:bg-[#163179] transition"
                >
                    Submit
                </button>
            </form>

            {/* Footer Section */}
            <footer className="mt-8 flex items-center justify-center border-t pt-4 text-sm text-gray-600">
                <img src={dlitheLogo} alt="DLithe Logo" className="h-7 mr-4" />
                <span>Powered by <a href="https://www.dlithe.com" target="_blank" rel="noopener noreferrer" className="text-[#1F3C88] underline">www.dlithe.com</a></span>
            </footer>
        </div>
    );
}

export default TrainingRequirementForm;
