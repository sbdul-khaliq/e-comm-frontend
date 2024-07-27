import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   useEffect(()=>{
    const auth = localStorage.getItem('users');
    if(auth){
        navigate('/');
    }
   })
    const handleLogin = async () => {
        console.log('login', email, password);
            let result = await fetch("http://localhost:5000/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json' // Corrected 'Content-Type' typo
                }
            });
    
            result = await result.json();

            if(result.name){
            localStorage.setItem('users',JSON.stringify(result));
            navigate('/');
            }else{
                alert('please enter correct details');
            }
    };
    

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="button" className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
