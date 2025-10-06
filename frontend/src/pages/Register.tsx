import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {       
                name,
                email,
                password
            });

            setMessage(res.data.message);
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <h2 className="text-4xl font-bold text-center mb-6 mt-[100px]">REGISTER PAGE</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center mx-20">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-lvh px-4 py-2 mt-2 border justify-center rounded-lg focus:ring-2 focus:ring-blue-200"
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-lvh px-4 py-2 mt-2 border justify-center rounded-lg focus:ring-2 focus:ring-blue-200"
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-lvh px-4 py-2 mt-2 border justify-center rounded-lg focus:ring-2 focus:ring-blue-200"
                    />
                    <br />
                </div>

                <div className="flex flex-col items-center">
                    <button type="submit" className="border rounded-lg px-4 py-2 text-[#ffffff] bg-blue-400">REGISTER</button>
                </div>
            </form>

            {message && <p>{message}</p>}

            <p className="text-base text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 underline">Login here</Link>
            </p>
        </div>
    )
}


export default Register;