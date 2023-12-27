import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {
    Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Select,
    TextField, Typography,
} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from '@mui/icons-material/Check';

import {createP2PGatheringOrder, listP2PGatheringOrders} from "../../api/transport";

const ConfirmOrderArrival = () => {
    const navigate = useNavigate();
    let {id} = useParams();
    const [orders, setOrders] = useState([]);
    const [orderSelection, setOrderSelection] = useState([])
    const [searchOrder, setSearchOrder] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [sortModel, setSortModel] = useState([]);

    const [sendOrderDialog, setSendOrderDialog] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listP2PGatheringOrders(id);
                const data = response?.map(item => (
                    {
                        id: item.id,
                        sendFrom: item.from.name,
                        sendTo: item.to.name,
                        departureTime: item.departureTime,
                        arrivalTime: item.arrivalTime,
                        expressOrders: item.expressOrders,
                        status: item.status
                    }
                ))
                setOrders(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])

    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const sendOrdersToTransaction = async () => {
        await createP2PGatheringOrder(2, {
            expressOrderIdList: orderSelection,
            destinationPointId: 1
        })
        navigate('/order/manage');
    }


    const columns = [
        {field: 'id', headerName: 'Order ID', flex: 2, sortable: false},
        {field: 'sendFrom', headerName: 'Sender Name', flex: 2, sortable: false},
        {field: 'sendTo', headerName: 'Send To', flex: 2, sortable: false},
        {field: 'departureTime', headerName: 'Departure time', flex: 2, sortable: false},
        {field: 'arrivalTime', headerName: 'Arrival time', flex: 2, sortable: false},
        {field: 'expressOrders', headerName: 'Express order', flex: 2, sortable: false},
        {field: 'status', headerName: 'Status', flex: 1, sortable: true},
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
                        <VisibilityIcon/>
                    </IconButton>
                    <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
                        <CheckIcon/>
                    </IconButton>
                </>

            ),
        },
    ];

    return (
        <div>
            {/* Search Fields */}
            <div class='mb-10'>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <TextField
                            fullWidth
                            label="Nhập mã vận đơn"
                            value={searchOrder}
                            onChange={(e) => setSearchOrder(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Province</InputLabel>
                            <Select
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                            >
                                {/* Address options */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>District</InputLabel>
                            <Select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                            >
                                {/* Address options */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <FormControl fullWidth sx={{marginRight: 2, marginBottom: 2}}>
                            <InputLabel>Status</InputLabel>
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
            <Button variant="contained" disabled={!orderSelection.length} onClick={() => setSendOrderDialog(true)}>
                Send order
            </Button>
            <DataGrid
                rows={orders}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
                checkboxSelection
                onRowSelectionModelChange={(item) => {
                    setOrderSelection(item);
                }}
                rowSelectionModel={orderSelection}
            />
            <Dialog
                sx={{'& .MuiDialog-paper': {width: '80%', maxHeight: 500}}}
                maxWidth="xs"
                open={sendOrderDialog}
            >
                <DialogTitle>Send Order</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        Are you want to send {orderSelection.length} items?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSendOrderDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={sendOrdersToTransaction}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmOrderArrival;
