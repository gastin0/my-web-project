import React, { useState } from "react";
import axios from "axios";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            setMessage(res.data.message);
        } catch(err: any) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <h2>LOGIN PAGE</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">LOGIN</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Login;