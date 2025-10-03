import React, { useState } from "react";
import axios from "axios";


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
        <h2>REGISTER PAGE</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <br />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">REGISTER</button>
        </form>

        {message && <p>{message}</p>}
        </div>
    )
}


export default Register;