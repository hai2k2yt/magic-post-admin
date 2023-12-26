import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    IconButton,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ManageOrder = () => {
    const navigate = useNavigate();
    const [searchOrder, setSearchOrder] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [sortModel, setSortModel] = useState([]);

    const orders = [
        {
            id: '1',
            OrderID: '1',
            customerName: 'cus1',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-12-2023 14:00:00',
            status: '11'
        },
        {
            id: '2',
            OrderID: '2',
            customerName: 'cus2',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-11-2023 14:00:00',
            status: '11'
        },
        {
            id: '3',
            OrderID: '3',
            customerName: 'cus3',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-10-2023 14:00:00',
            status: '11'
        },
        {
            id: '4',
            OrderID: '4',
            customerName: 'cus4',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-14-2023 14:00:00',
            status: '11'
        },
        {
            id: '5',
            OrderID: '5',
            customerName: 'cus1',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-12-2023 14:00:00',
            status: '11'
        },
        {
            id: '6',
            OrderID: '6',
            customerName: 'cus2',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-11-2023 14:00:00',
            status: '11'
        },
        {
            id: '7',
            OrderID: '7',
            customerName: 'cus3',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-10-2023 14:00:00',
            status: '11'
        },
        {
            id: '8',
            OrderID: '8',
            customerName: 'cus4',
            transactionPlace: '123',
            sendTo: '321',
            createdAt: '13-14-2023 14:00:00',
            status: '11'
        },
    ];
    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const filteredOrders = orders.filter((order) => {
        return true;
    });

    const columns = [
        { field: 'OrderID', headerName: 'Order ID', flex: 1, sortable: false },
        { field: 'customerName', headerName: 'Customer Name', flex: 2, sortable: false },
        { field: 'transactionPlace', headerName: 'Transaction Place', flex: 2, sortable: false },
        { field: 'sendTo', headerName: 'Send to (Address)', flex: 2, sortable: false },
        { field: 'createdAt', headerName: 'Created Time', flex: 2, sortable: true },
        { field: 'status', headerName: 'Status', flex: 1, sortable: true },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
                    <VisibilityIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <div>
            {/* Search Fields */}
            <div class='mb-10'>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                            fullWidth
                            label="Nhập mã vận đơn"
                            value={searchOrder}
                            onChange={(e) => setSearchOrder(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth sx={{ marginRight: 2, marginBottom: 2 }}>
                            <InputLabel >Status</InputLabel>
                            <Select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                {/* Status options */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <DataGrid
                align='center'
                rows={filteredOrders}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
        </div>
    );
};

export default ManageOrder;
