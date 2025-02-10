import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const SendEmail = () => {
    const [user, setUser] = useState([]);
    const [value, setValue] = useState('');
    const [recipientType, setRecipientType] = useState('office');
    const [formData, setFormData] = useState({
        role: "",
        name: "",
        email: "",
        subject: ""
    })
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if(id=="role"){
            getUserDetails(value);
        }
        if (recipientType == "office") {
            if (id == "name") {
                const email = user.find(item => item.name == value).email
                console.log(email)
                setFormData({ ...formData, email: email })
            }
        }
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    const changeRecipient = (value) => {
        setRecipientType(value);
        setFormData({
            role: "",
            name: "",
            email: "",
            subject: ""
        })
        setValue("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="w-full py-2">

            <div className="w-full p-4 mb-4 bg-white border-2 border-yellow-400 rounded-md">
                <p className="mb-2 font-semibold">Who do you want to send the message to?</p>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded-md border-2 ${recipientType === 'office' ? 'bg-sky-400 text-white border-yellow-400' : 'bg-white'} duration-200`}
                        onClick={() => changeRecipient('office')}
                    >
                        Office Employee
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md border-2 ${recipientType === 'other' ? 'bg-sky-400 text-white border-yellow-400' : 'bg-white'} duration-200`}
                        onClick={() => changeRecipient('other')}
                    >
                        Other Person
                    </button>
                </div>
            </div>

            <form className="w-full p-4 bg-white border-2 border-yellow-400 rounded-md" onSubmit={handleSubmit}>
                {/* Category Field */}
                {recipientType == "office" &&
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
                            <option value="">Select a category</option>
                            <option value="Admin">Admin</option>
                            <option value="HR">HR</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="All">All Employee</option>
                        </select>
                    </div>
                }

                {/* Name Field */}
                {recipientType == "office" ?
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
                            <option value="">Select a Person</option>
                            {user.length > 0 ? user.map((el) => (
                                <option value={el.name} key={el._id}>{el.name}</option>
                            )) :
                                (<option value="">No User Found</option>)
                            }
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
                <div className="flex flex-col gap-1 mb-14">
                    <label htmlFor="message" className="px-4">
                        Message <span className="text-red-500">*</span>
                    </label>
                    {/* <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        className='h-[50vh]'
                    /> */}
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
