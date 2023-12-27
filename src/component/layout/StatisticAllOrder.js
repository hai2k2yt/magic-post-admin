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
import {useNavigate} from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import {getPointInventory} from "../../api/point";
import {createP2PTransactionOrder} from "../../api/transport";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ManageOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [orderSelection, setOrderSelection] = useState([])
    const [searchOrder, setSearchOrder] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [sortModel, setSortModel] = useState([]);

    const [sendOrderDialog, setSendOrderDialog] = useState(false)

    useEffect( () => {
        async function fetchData() {
            const response = await getPointInventory(2);
            const data = response.length && response?.map(item => (
                {
                    id: item.id,
                    senderName: item.sender.name,
                    receiverName: item.receiver.name,
                    sendTo: `${item.receiver.address.street},${item.receiver.address.commune}-${item.receiver.address.district}-${item.receiver.address.province}`,
                    sendTime: item.sendTime,
                    status: item.status
                }
            ))
            setOrders(data);
        }
        fetchData();
    }, [])

    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const sendOrdersToTransaction = async () => {
        await createP2PTransactionOrder(2, {
            expressOrderIdList: orderSelection,
            destinationPointId: 1
        })
        navigate('/order/manage');
    }


    const columns = [
        { field: 'id', headerName: 'Order ID', flex: 2, sortable: false },
        { field: 'senderName', headerName: 'Sender Name', flex: 2, sortable: false },
        { field: 'receiverName', headerName: 'Receiver Name', flex: 2, sortable: false },
        { field: 'sendTo', headerName: 'Send to (Address)', flex: 2, sortable: false },
        { field: 'sendTime', headerName: 'Created Time', flex: 2, sortable: true },
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
            <Button variant="contained" disabled={!orderSelection.length} onClick={() => setSendOrderDialog(true)}>
                Send order
            </Button>
            <DataGrid
                align='center'
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
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 500 } }}
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

export default ManageOrder;
