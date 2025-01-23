import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginRegister() {
    const [isActive, setIsActive] = useState(false);
    const toggleActiveState = () => setIsActive(!isActive);

    // Registration State
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle Register
    const register = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/register", { username, email, password })
            .then(res => {
                console.log(res.data);
                navigate("/home");
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err);
                alert("Error during registration.");
            });
    };

    // Handle Login
    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/login", { email, password })
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    navigate("/home");
                } else {
                    alert(res.data.message || "Invalid credentials");
                }
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err);
                alert("Error during login.");
            });
    };

    return (
        <div className={`content justify-content-center align-items-center shadow-lg ${isActive ? "active" : ""}`}>
            {/* Left Section (Register Form) */}
            <div className="left-box">
                {!isActive ? (
                    <form onSubmit={register}>
                        <div className="header-text mb-4">
                            <h1>Create Account</h1>
                        </div>
                        <input type="text" placeholder="Name" onChange={e => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit">Register</button>
                    </form>
                ) : (
                    <form onSubmit={login}>
                        <div className="header-text mb-4">
                            <h1>Sign In</h1>
                        </div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <input type="checkbox" />
                                <label className="ms-2">Remember Me</label>
                            </div>
                            <a href="#" className="forgot">Forgot Password?</a>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>

            {/* Right Section (Login Form) */}
            <div className="right-box">
                {isActive && (
                    <form onSubmit={login}>
                        <div className="header-text mb-4">
                            <h1>Sign In</h1>
                        </div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <input type="checkbox" />
                                <label className="ms-2">Remember Me</label>
                            </div>
                            <a href="#" className="forgot">Forgot Password?</a>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>

            {/* Switch Panel */}
            <div className="switch-content">
                {!isActive ? (
                    <>
                        <h1>Welcome!</h1>
                        <p>Enter your personal details and start your journey with us.</p>
                        <button onClick={toggleActiveState}>Sign In</button>
                    </>
                ) : (
                    <>
                        <h1>Hello, Again!</h1>
                        <p>We are happy to see you back.</p>
                        <button onClick={toggleActiveState}>Register</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginRegister;
