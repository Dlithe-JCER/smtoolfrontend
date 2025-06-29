import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Navbar from '../Navbar/Navbar';
import illustration from '../../assets/landing.png';
import { useAuth } from '../Authentication/AuthContext';

const MySwal = withReactContent(Swal);

function LandingPage() {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = login(email, password);

        if (success) {
            await MySwal.fire({
                title: 'Login Successful!',
                text: 'Welcome back!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    MySwal.showLoading();
                }
            });

            // Remove `navigate('/')` to stay on the same page.
            // If you want to navigate after a delay, uncomment:
            // navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            // Optionally navigate or stay
            navigate('/landing1');
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row font-sans">
            {/* Illustration */}
            <div className="md:w-1/2 bg-white flex flex-col mt-20">

                <div className="flex-grow flex items-center justify-center px-10">
                    <img src={illustration} alt="illustration" className="max-w-full max-h-full object-contain" />
                </div>
            </div>

            {/* Login Form */}
            <div className=" md:w-1/2 w-full bg-[#1F3C88] text-white flex flex-col justify-between mt-20 ">
                <Navbar />
                <div className="flex-grow flex flex-col justify-center px-10 md:px-40">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold ml-2 md:ml-10 mb-10">Welcome back!</h2>
                        <p className="text-lg mb-6 ml-2 md:ml-10 mb-10">Let’s Login to Your Account</p>

                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-10 p-4 rounded-lg text-black focus:outline-none shadow-md bg-white"
                                placeholder="Enter your email"
                                required
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mb-10 p-4 rounded-lg text-black focus:outline-none shadow-md bg-white"
                                placeholder="Enter your password"
                                required
                            />
                            {error && <p className="text-red-400 mb-4">{error}</p>}
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
