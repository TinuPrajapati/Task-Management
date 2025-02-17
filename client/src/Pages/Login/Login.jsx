import React, { useState } from 'react';
import { Mail, Lock, Building2, Eye, EyeOff } from 'lucide-react';
import Input from '../../Components/Input';
import {useMutation} from "@tanstack/react-query"
import { login } from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { changeState } from "../../Features/loaderSlice"
import { changeUser } from '../../Features/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function App() {
 const [formData,setFormData] = useState({email:"",password:""});
 const dispatch = useDispatch();
 const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  // const mutation = useMutation({
  //   mutationFn:login,
  //   onSuccess:(data)=>{
  //       dispatch(changeState(false));
  //       dispatch(changeUser({username:data.username,email:data.email,role:data.role}));
  //       localStorage.setItem("user",JSON.stringify({username:data.username,email:data.email,role:data.role}));
  //       toast.success(data.message);
  //       navigate("/");
  //   },
  //   onError:(error)=>{
  //       console.log(error)
  //   }
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeState(true));
    // mutation.mutate(formData)
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-300 to-purple-200 flex items-center justify-center">
      <div className="bg-white rounded-xl overflow-hidden flex flex-col md:flex-row w-[90%] h-[90%]">
        {/* Left Side - Illustration */}
        <div className="w-full md:w-1/2 bg-purple-100 p-12 flex flex-col justify-center items-center">
          <div className="animate-float">
            <img 
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600"
              alt="Task Management"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
          <div className="mt-8 text-center animate-slide-in">
            <h2 className="text-3xl font-bold text-purple-800 flex items-center justify-center gap-2">
              <Building2 className="h-8 w-8" />
              Task Management Pro
            </h2>
            <p className="mt-4 text-gray-600">Streamline your workflow with our powerful task management solution</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-12">
            <div className="text-center mb-10 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <Input text="Email" icon={<Mail className="h-5 w-5" />} handleChange={handleChange} value={formData.email} type="email" id="email" placeholder="Enter your email" />

                <Input text="Password" icon={<Lock className="h-5 w-5" />} handleChange={handleChange} value={formData.password} type={'password'} id="password" placeholder="Enter your password" />

              <div className="flex items-center justify-between animate-slide-in" style={{ animationDelay: '0.8s' }}>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-800">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white text-lg py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 animate-slide-in"
                style={{ animationDelay: '1s' }}
              >
                Login
              </button>

            </form>
        </div>
      </div>
    </div>
  );
}

export default App;