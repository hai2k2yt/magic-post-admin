import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel, MenuItem,
    Select,
    TextField, Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Navbar from '../../component/layout/Navbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
    confirmMultiP2PTransactionArrival, createP2CTransactionOrder,
    listP2PTransactionOrders
} from "../../api/transport";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import {getPointInventory, listGatheringPoints} from "../../api/point";
import {listTransactionShippers} from "../../api/actor";
import Sidebar from "../../component/layout/Sidebar";

const CreateDeliveryToCustomer = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem('pointId')
    const [orders, setOrders] = useState([]);
    const [orderSelection, setOrderSelection] = useState([])
    const [searchOrder, setSearchOrder] = useState('');
    const [shippers, setShippers] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState([])
    const [sortModel, setSortModel] = useState([]);

    const [sendOrderDialog, setSendOrderDialog] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getPointInventory(id);
                const data = response?.map(item => (
                    {
                        id: item.id,
                        senderName: item.sender.name,
                        senderAddress: item.sender.address.street,
                        receiverName: item.receiver.name,
                        receiverAddress: item.receiver.address.street,
                        COD: item.totalCOD
                    }
                ))
                setOrders(data);
                const listShippers = await listTransactionShippers(id);
                const listShippersData = listShippers?.map(item => (
                    {
                        id: item.id,
                        name: item.name
                    }
                ))
                setShippers(listShippersData)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])

    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const createTransactionToCustomer = async () => {
        await createP2CTransactionOrder(id, {
            expressOrderIdList: orderSelection,
            shipperId: selectedShipper
        })
        navigate(`/order/transaction/${id}/customer`);
    }




    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, sortable: false },
        { field: 'senderName', headerName: 'Người gửi', flex: 2, sortable: false },
        { field: 'senderAddress', headerName: 'Địa chỉ gửi', flex: 2, sortable: false },
        { field: 'receiverName', headerName: 'Người nhận', flex: 2, sortable: false },
        { field: 'receiverAddress', headerName: 'Địa chỉ nhận', flex: 2, sortable: false },
        { field: 'COD', headerName: 'COD', flex: 1, sortable: true },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleViewDetail(params.row.id)}>
                        <VisibilityIcon />
                    </IconButton>
                </>

            ),
        },
    ];
    const theme = createTheme({
        typography: {
            "fontFamily": '"Montserrat", "sans-serif"',
        },
        palette: {
            primary: {
                main: '#161A30',
            },
            secondary: {
                main: '#31304D',
            },
            third: '#B6BBC4'
        }

    })
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
            </div>
            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    {/* <!-- Page content here --> */}
                    <div class="mx-10">
                        <div class='mt-10'></div>
                        <div>
                            {/* Search Fields */}
                            <div class='mb-5'>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            fullWidth
                                            label="Nhập mã vận đơn"
                                            value={searchOrder}
                                            onChange={(e) => setSearchOrder(e.target.value)}
                                        />
                                    </Grid>

                                </Grid>
                            </div>

                            <DataGrid
                                rows={orders}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[5, 10, 15]}
                                sortModel={sortModel}
                                onSortModelChange={(model) => setSortModel(model)}
                                checkboxSelection
                                onRowSelectionModelChange={(item) => {
                                    setOrderSelection(item);
                                }}
                                rowSelectionModel={orderSelection}
                            />
                            <div className='flex justify-end mt-5'>
                                <FormControl fullWidth>
                                    <InputLabel id="gathering-point-select-label">Chọn shipper</InputLabel>
                                    <Select
                                        className="w-full max-w-xs"
                                        labelId="gathering-point-select-label"
                                        id="gathering-point-select"
                                        value={selectedShipper}
                                        label="Select shipper"
                                        onChange={(e) => {
                                            setSelectedShipper(e.target.value)
                                        }}
                                    >
                                        {shippers.map(i => (
                                            <MenuItem disabled={i.id === id} value={i.id}>{i.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div class="flex justify-end mt-5">
                                <Button variant="contained" sx={{ bgcolor: 'primary.main' }} disabled={!orderSelection.length} onClick={() => setSendOrderDialog(true)}>
                                    Tạo đơn gửi
                                </Button>
                            </div>
                            <Dialog
                                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 500 } }}
                                maxWidth="xs"
                                open={sendOrderDialog}
                            >
                                <DialogTitle>Send Order</DialogTitle>
                                <DialogContent dividers>
                                    <Typography>
                                        Tạo {orderSelection.length} đơn gửi cho shipper ?
                                    </Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setSendOrderDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={createTransactionToCustomer}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                </div>
                <Sidebar />
            </div>
        </ThemeProvider>
    );
};

export default CreateDeliveryToCustomer;
