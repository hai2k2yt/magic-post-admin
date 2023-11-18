import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const CreateTransactionAccount = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        name: '',
        transactionPlace: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic to handle form submission, e.g., send data to server
        console.log('Form submitted:', userInfo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    value={userInfo.username}
                    onChange={handleChange}
                    required
                />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={userInfo.password}
                    onChange={handleChange}
                    required
                />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={userInfo.name}
                    onChange={handleChange}
                    required
                />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="transaction-place-label">Transaction Place</InputLabel>
                <Select
                    labelId="transaction-place-label"
                    label="Transaction Place"
                    name="transactionPlace"
                    value={userInfo.transactionPlace}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value="place1">Place 1</MenuItem>
                    <MenuItem value="place2">Place 2</MenuItem>
                    {/* Add more places as needed */}
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
                Create Account
            </Button>
        </form>
    );
};

export default CreateTransactionAccount;
