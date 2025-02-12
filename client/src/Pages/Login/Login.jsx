import React, { useState } from 'react';
import { Building2, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loginpic from "../../assets/Login.png"
import Input from '../../Components/Input';

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempted with:', { email, password });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-full w-full p-10  gap-2 bg-purple-300">
            <div className='w-full h-full flex justify-between bg-white rounded-lg'>
                <div className='w-[60%] h-full '>
                    <img src={Loginpic} alt="" />
                </div>
                <div className='w-[40%] h-full p-10 flex flex-col justify-center items-center'>
                    {/* Header */}
                    <div className=" w-full text-center flex items-center justify-center gap-4 text-white bg-purple-400 rounded-lg py-3">
                        <Building2 className="h-12 w-12" />
                        <h2 className=" text-3xl font-semibold">Login</h2>
                    </div>

                    {/* Login Form */}
                    <form className="mt-8 space-y-2 w-full" onSubmit={handleSubmit}>
                        <Input text="Email" type="email" value={formData.email} handleChange={handleChange} icon={<Mail className="h-5 w-5 text-gray-400" />} placeholder={"Enter Email"} id="email" />

                        <Input text="Password" type="password" value={formData.password} handleChange={handleChange} icon={<Lock className="h-5 w-5 text-gray-400" />} placeholder={"Enter Password"} id={"password"} />

                        <button
                            type="submit"
                            className="w-full h-12 bg-purple-500 mt-4 text-xl text-white font-semibold rounded-lg"
                        >
                            Sign in
                        </button>
                    </form>
                    <Link
                     to="/forget_password"
                     className='w-full bg-white mt-2 text-lg text-gray-600 font-semibold rounded-lg flex items-center justify-center cursor-pointer hover:text-blue-300  '>
                        Forget Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;