import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

function TrainersManagement() {
    const cardStyle = "w-64 h-48 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-white text-[#1F3C88] border border-gray-200";

    const iconStyle = "text-4xl";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
            <div className="absolute top-4 right-4">
                <Link
                    to="/landing1"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    ← Go Back
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-center text-[#1F3C88] mb-10">Trainer Management Portal</h1>

            <div className="flex flex-wrap gap-10 justify-center">
                <Card className={cardStyle}>
                    <Link to="/addtrainer" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6 cursor-pointer">
                            <div className={iconStyle}>👨‍🏫</div>
                            <span className="text-xl font-semibold mt-4">Add Trainers</span>
                            <Button variant="ghost" className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition">
                                ➕ Add
                            </Button>
                        </CardContent>
                    </Link>
                </Card>

                <Card className={cardStyle}>
                    <Link to="/searchtrainer" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                            <div className={iconStyle}>🔍</div>
                            <span className="text-xl font-semibold mt-4">Search Trainers</span>
                            <Button variant="ghost" className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition">
                                Search
                            </Button>
                        </CardContent>
                    </Link>
                </Card>

                <Card className={cardStyle}>
                    <Link to="/trainerslist" className="h-full w-full block">
                        <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
                            <div className={iconStyle}>📋</div>
                            <span className="text-xl font-semibold mt-4">List of Trainers</span>
                            <Button variant="ghost" className="mt-4 px-6 py-2 text-[#1F3C88] font-semibold border border-[#1F3C88] hover:bg-[#1F3C88] hover:text-white transition">
                                View List
                            </Button>
                        </CardContent>
                    </Link>
                </Card>
            </div>
        </div>
    );
}

export default TrainersManagement;
