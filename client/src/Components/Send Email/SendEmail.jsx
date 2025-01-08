import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SendEmail = () => {
    const [value, setValue] = useState('');
    const [recipientType, setRecipientType] = useState('office');
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const changeRecipient = (value) => {
        setRecipientType(value);
    }

    return (
        <div className="w-full bg-gray-200 px-4 py-8">
            <div className="w-[94%] h-16 bg-white absolute left-[3%] top-[11%] rounded-md py-2 px-4 border-4 border-yellow-400 flex items-center justify-between">
                <h2 className="text-3xl font-semibold">Send Email</h2>
            </div>

            <div className="bg-white w-full rounded-md p-4 border-4 border-yellow-400 mb-4">
                <p className="mb-2 font-semibold">Who do you want to send the message to?</p>
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded-md border-2 ${recipientType === 'office' ? 'bg-sky-400 text-white border-yellow-400' : 'bg-white'} duration-200`}
                        onClick={() => setRecipientType('office')}
                    >
                        Office Employee
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md border-2 ${recipientType === 'other' ? 'bg-sky-400 text-white border-yellow-400' : 'bg-white'} duration-200`}
                        onClick={() => setRecipientType('other')}
                    >
                        Other Person
                    </button>
                </div>
            </div>

            <form className="bg-white w-full rounded-md p-4 border-4 border-yellow-400">
                {/* Category Field */}
                {recipientType == "office" &&
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="category" className="px-4">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="category"
                            className="border-2 border-gray-300 h-10 px-2 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                        >
                            <option value="">Select a category</option>
                            <option value="general">General</option>
                            <option value="feedback">Feedback</option>
                            <option value="complaint">Complaint</option>
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
                            className="border-2 border-gray-300 h-10 px-2 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                        >
                            <option value="">Select a Person</option>
                            <option value="general">Adam</option>
                            <option value="feedback">Eve</option>
                            <option value="complaint">BOB</option>
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
                            className="border-2 border-gray-300 h-10 px-2 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                        />
                    </div>
                }

                {recipientType == "other" &&
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="email" className="px-4">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your name"
                            className="border-2 border-gray-300 h-10 px-2 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                        />
                    </div>
                }

                {/* Subject Field */}
                <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="subject" className="px-4">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        placeholder="Enter email subject"
                        className="border-2 border-gray-300 h-10 px-2 rounded-md outline-none focus:ring-2 focus:ring-sky-400 focus:border-none"
                    />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1 mb-14">
                    <label htmlFor="message" className="px-4">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        className='h-[50vh]'
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-500"
                >
                    Send Email
                </button>
            </form>
        </div>
    );
};

export default SendEmail;
