import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

// Updated icons from Lucide
import {
    ClipboardPlus,
    List,
    CalendarCheck, // Used for History
} from "lucide-react";

function TrainingRequirement() {
    const navigate = useNavigate();

    const cardStyle =
        "w-64 h-48 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-white text-[#1F3C88] border border-gray-200";
    const iconStyle = "w-10 h-10 text-[#1F3C88]";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
            <Link
                to='/landing1'
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                ← Go Back
            </Link>

            <h1 className="text-3xl font-bold text-center text-[#1F3C88] mb-10">
                Training Requirement Management
            </h1>

            <div className="flex flex-wrap gap-10 justify-center">
                {/* Add Requirement */}
                <Card className={cardStyle}>
                    <Link to="/clientrequirement" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6 cursor-pointer">
                            <ClipboardPlus className={iconStyle} />
                            <span className="text-xl font-semibold mt-4">Add Requirement</span>
                            <Button
                                variant="ghost"
                                className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition"
                            >
                                ➕ Add
                            </Button>
                        </CardContent>
                    </Link>
                </Card>

                {/* View Requirements */}
                <Card className={cardStyle}>
                    <Link to="/viewrequirements" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                            <List className={iconStyle} />
                            <span className="text-xl font-semibold mt-4">View Requirements</span>
                            <Button
                                variant="ghost"
                                className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition"
                            >
                                📜 View
                            </Button>
                        </CardContent>
                    </Link>
                </Card>

                {/* Trainer Responses */}
                <Card className={cardStyle}>
                    <Link to="/trainerresponses" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                            <List className={iconStyle} />
                            <span className="text-xl font-semibold mt-4">Trainer Responses</span>
                            <Button
                                variant="ghost"
                                className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition"
                            >
                                🧑‍🏫 View
                            </Button>
                        </CardContent>
                    </Link>
                </Card>

                {/* Assignment Details */}
                <Card className={cardStyle}>
                    <Link to="/combined-details" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                            <List className={iconStyle} />
                            <span className="text-xl font-semibold mt-4">Program Execution</span>
                            <Button
                                variant="ghost"
                                className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition"
                            >
                                Assignment Details
                            </Button>
                        </CardContent>
                    </Link>
                </Card>

                {/* History */}
                {/* <Card className={cardStyle}>
                    <Link to="/history" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                            <CalendarCheck className={iconStyle} />
                            <span className="text-xl font-semibold mt-4">History</span>
                            <Button
                                variant="ghost"
                                className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition"
                            >
                                🕘 History
                            </Button>
                        </CardContent>
                    </Link>
                </Card> */}
            </div>
        </div>
    );
}

export default TrainingRequirement;
