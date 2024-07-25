import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {


    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();

    const CollectData = async () =>{
        console.log(name,password,email);
        let result  = await fetch('http://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({ name, password, email }),
            headers:{
              'Content-Type': 'application/json'
            },
        })
   
        result = await result.json
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result));
        if(result){
          navigate('/');
        }
    }


  return (
    <div className="signup-container">
      <h1 className="signup-title">Register</h1>
      <div className="input-group">
        <label htmlFor="name" className="signup-label">Name</label>
        <input type="text" id="name" className="signup-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" />
      </div>
      <div className="input-group">
        <label htmlFor="email" className="signup-label">Email</label>
        <input type="text" id="email" className="signup-input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Email" />
      </div>
      <div className="input-group">
        <label htmlFor="password" className="signup-label">Password</label>
        <input type="password" id="password" className="signup-input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Password" />
      </div>
      <button type="submit" className="signup-button" onClick={CollectData}>Sign Up</button>
    </div>
  );
}

export default SignUp;
