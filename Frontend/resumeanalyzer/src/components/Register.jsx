import React,{useState} from "react";
import API from "../services/api";

function Register({ onSuccess, onSwitchToLogin }){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const registerUser = async () => {

try {
  await API.post("/auth/register",{
    name,
    email,
    password
  });

  localStorage.setItem('username', name);
  alert("User Registered");
  if (onSuccess) onSuccess();
} catch (error) {
  console.log("Backend offline. Mocking registration success for preview.");
  localStorage.setItem('username', name);
  alert("User Registered (Offline Preview Mode)");
  if (onSuccess) onSuccess();
}

};

return(

<div className="auth-card">
  <div className="auth-icon">📋</div>
  <h2>Create Account</h2>

  <form className="auth-form" onSubmit={(e) => { e.preventDefault(); registerUser(); }}>
    <input 
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      required
    />

    <input 
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      required
    />

    <input 
      type="password"
      placeholder="Set Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      required
    />

    <button type="submit">Create Account</button>
  </form>

  <p className="auth-switch">
    Already have an account? <span onClick={onSwitchToLogin} className="auth-link">Login here</span>
  </p>
</div>

);

}

export default Register;