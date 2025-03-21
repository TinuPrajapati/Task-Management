import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import useAuthStore from '../../api/Store/useAuthStore';
import useEmailStore from '../../api/Store/useEmailStore';
import toast from 'react-hot-toast';

const SendEmail = () => {
    const { getRoleByUsers, roleUser } = useAuthStore();
    const {sendEmails,sendEmailToOther} = useEmailStore();
    const { person } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: "",
        name: "",
        email: "",
        subject: "",
        msg: ""
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id == "role") {
            getRoleByUsers(value);
            setFormData({ ...formData, email: "" })
        }
        if (person == "office") {
            if (id == "name") {
                const email = roleUser.find(item => item.name == value).email
                setFormData({ ...formData, email: email })
            }
        }
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const changeRecipient = () => {
        setFormData({
            role: "",
            name: "",
            email: "",
            subject: "",
            msg: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !formData.name || !formData.email || !formData.subject || !formData.msg) return toast.error("All fields are required");
        if (person == "office") {
            sendEmails(formData,navigate);
        } else {
            sendEmailToOther(formData,navigate);
        }
        setFormData({
            role: "",
            name: "",
            email: "",
            subject: "",
            msg: ""
        })
    }

    useEffect(() => {
        changeRecipient()
    }, [person])

    return (
        <div className="w-full">

            <form className="w-full p-4 bg-white border-2 border-yellow-400 rounded-md" onSubmit={handleSubmit}>
                {/* Category Field */}
                {person == "office" &&
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="role" className="px-4">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="role"
                            className="h-10 px-2 border-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Select a Category</option>
                            {["Admin", "HR", "Manager", "Web Developer", "Android Developer", "IOS Developer", "Graphic Designer", "UI/UX Designer"].map((value, index) => (
                                <option value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                }

                {/* Name Field */}
                {person == "office" ?
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="name" className="px-4">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="name"
                            className="h-10 px-2 border-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                            value={formData.name}
                            onChange={handleChange}
                        >
                            {formData.role === "" ? (
                                <option>Choose role first</option>
                            ) : roleUser.length > 0 ? (
                                <>
                                    <option>Choose User</option>
                                    {roleUser.map((user) => (
                                        <option key={user._id} value={user.name}>
                                            {user.name}
                                        </option>
                                    ))}
                                </>
                            ) : (
                                <option>This role has no employee</option>
                            )}
                        </select>
                    </div> :
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="name" className="px-4">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className="h-10 px-2 border-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                }

                <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email" className="px-4">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your name"
                        className="h-10 px-2 border-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="subject" className="px-4">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        placeholder="Enter email subject"
                        className="h-10 px-2 border-2 border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1 h-[40vh] mb-4">
                    <label htmlFor="message" className="px-4">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <Editor id="description" className='h-[70%]' value={formData.msg} onTextChange={(e) => setFormData({ ...formData, msg: e.htmlValue })} />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-4 py-2 font-semibold text-white bg-yellow-400 rounded-md hover:bg-yellow-500 active:scale-90"
                >
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default SendEmail;
