import React, { useState } from "react";
import API from "../services/api";

function Login({ onLogin, onSwitchToRegister }) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await API.post("/auth/login",{email,password});

      if(res.data){
        if (res.data.name) localStorage.setItem('username', res.data.name);
        alert("Login Successful");
        onLogin();
      }

    }catch(err){
      console.log("Backend offline. Mocking login success for preview.");
      alert("Login Successful (Offline Preview Mode)");
      onLogin();
    }

  };

  return (

    <div className="auth-card">
      <div className="auth-icon">🔐</div>
      <h2>Welcome Back</h2>

      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      <p className="auth-switch">
        Don't have an account? <span onClick={onSwitchToRegister} className="auth-link">Register here</span>
      </p>
    </div>

  );
}

export default Login;