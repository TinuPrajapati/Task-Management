import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, Shield, Lock, Briefcase, Camera, MapPin } from 'lucide-react';
import { FaGenderless } from "react-icons/fa";
import Input from "../../Components/Input.jsx";
import Select from "../../Components/Select.jsx";
import toast from "react-hot-toast";
const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    number: "",
    photo: null,
    address: "",
    gender: "Male"
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
  };


  const submitForm = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role || !formData.password || !formData.number || !formData.address) return toast.error("All fields are required");
  };

  return (
    <div className="flex flex-col w-full gap-6">

      <form onSubmit={submitForm} className="p-6 space-y-6 bg-white rounded-lg">
        {/* Photo Upload */}
        <div className="flex items-center w-full gap-10 px-10 mb-6">
          <div className="relative">
            {formData.photo ? (
              <img src={URL.createObjectURL(formData?.photo)} alt="Profile preview" className="object-cover w-32 h-32 border-4 rounded-md border-sky-400" />
            ) : (
              <div className="flex items-center justify-center w-32 h-32 border-4 border-indigo-100 rounded-full bg-indigo-50">
                <Camera className="w-8 h-8 text-indigo-400" />
              </div>
            )}
            <label htmlFor="photo" className="absolute bottom-0 right-0 p-2 transition-colors bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-700">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                id="photo"
                name="photo"
                className="hidden"
                onChange={handleFileChange}
                placeholder="Photo URL"
                accept="image/*"
              />
            </label>
          </div>
          <div className="w-[60%]">
            <div className="flex items-center mb-4 ">
              <label htmlFor="name" className="block mb-1 text-xl font-bold text-gray-700 w-[20%]">Full Name</label>
              <div className="relative w-[80%]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full py-2 pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                  placeholder="Enter Name"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center">
              <label htmlFor="role" className="block mb-1 text-xl font-bold text-gray-700 w-[20%]">Role</label>
              <div className="relative w-[80%]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  name="role"
                  className="block w-full py-2 pl-10 pr-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:border-none outline-none focus:duration-200"
                  onChange={handleChange}
                >
                  <option>Choose role for new Employee</option>
                  {["Admin", "HR", "Manager", "Web Developer", "Android Developer", "IOS Developer", "Graphic Designer", "UI/UX Designer"].map((value, index) => (
                    <option value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Email */}
          <Input text="Email" icon={<Mail className="w-5 h-5 text-gray-400" />} handleChange={handleChange} value={formData.email} type="email" id="email" placeholder="Enter Email" />

          {/* Phone */}
          <Input text="Phone Number" icon={<Phone className="w-5 h-5 text-gray-400" />} handleChange={handleChange} value={formData.number} type="number" id="number" placeholder="Enter Phone Number" />

          {/* Position */}
          <Input text="Employee Password" icon={<Lock className="w-5 h-5 text-gray-400" />} handleChange={handleChange} value={formData.password} type="password" id="password" placeholder="Enter User password" />

          {/* Address */}
          <Input text="Address" icon={<MapPin className="w-5 h-5 text-gray-400" />} handleChange={handleChange} value={formData.address} type="text" id="address" placeholder="Enter Employee Address" />

          {/* Date of Birth */}
          <Input text="Date of Birth " handleChange={handleChange} value={formData.dob} type="date" id="dob" placeholder="Enter DOB" />

          <Select text="Gender" icon={<FaGenderless className="w-5 h-5 text-gray-400" />} options={['Male', 'Female']} handleChange={handleChange} value={formData.gender} id="gender" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-10 py-2 text-xl text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

