import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import {createUser} from "../../api/user";
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await createUser(type, {username, email, password, phone})
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    return (
        <form className="m-20" onSubmit={handleRegister}>
            <div className="mb-6">
                <label htmlFor="username"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username" value={username}
                       onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="mb-6">
                <label htmlFor="phone"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"
                       pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={phone} onChange={(e) => setPhone(e.target.value)}
                       required/>
            </div>
            <div className="mb-6">
                <label htmlFor="email"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" value={email}
                       onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="mb-6">
                <label htmlFor="password"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" value={password}
                       onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="mb-6">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required></input>
            </div>
            <div className="mb-6">
                <label htmlFor="type"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={type} onChange={handleTypeChange} required>
                    <option value="">Select type</option>
                    <option value="TransactionStaff">Transaction Staff</option>
                    <option value="TransactionLeader">Transaction Leader</option>
                    <option value="GatheringStaff">Gathering Staff</option>
                    <option value="GatheringLeader">Gathering Leader</option>
                    <option value="CompanyLeader">Admin</option>
                </select>
            </div>

            <button type="submit"
                    className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Submit
            </button>
        </form>
    );
};

export default Register;