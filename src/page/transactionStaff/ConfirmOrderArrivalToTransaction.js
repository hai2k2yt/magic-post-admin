import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
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
import { useNavigate, useParams } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Navbar from '../../component/layout/Navbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
    confirmMultiP2PTransactionArrival,
    listP2PTransactionOrders
} from "../../api/transport";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import Sidebar from "../../component/layout/Sidebar";

const ConfirmOrderArrivalToTransaction = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem('pointId')
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
                const response = await listP2PTransactionOrders(id);
                const data = response?.map(item => (
                    {
                        id: item.id,
                        sendFrom: item.from.name,
                        sendTo: item.to.name,
                        departureTime: item.departureTime,
                        // arrivalTime: item.arrivalTime,
                        status: (() => {
                            switch (item?.status) {
                                case 'POSTED':
                                    return 'Điểm giao dịch đã nhận hàng';
                                case 'TRANSPORTING_FROM_SRC_TRANSACTION':
                                    return 'Trung chuyển đến điểm tập kết';
                                case 'TRANSPORTED_TO_SRC_GATHERING':
                                    return 'Đến điểm tập kết';
                                case ' TRANSPORTING_FROM_SRC_GATHERING':
                                    return 'Trung chuyển đến điểm tập kết';
                                case 'TRANSPORTED_TO_DES_GATHERING':
                                    return 'Đến điểm tập kết đích';
                                case 'TRANSPORTING_FROM_DES_GATHERING':
                                    return 'Trung chuyển đến giao dịch đích';
                                case 'TRANSPORTED_TO_DES_TRANSACTION':
                                    return 'Đến điểm giao dịch đích';
                                case 'SHIPPING':
                                    return 'Đang giao hàng'
                                case 'DELIVERED':
                                    return 'Giao hàng thành công'
                                case 'CANCELING':
                                    return 'Người nhận không nhận hàng'
                                case 'CANCELED':
                                    return 'Đơn hàng đã hủy'
                                default:
                                    return 'Không xác định';
                            }
                        })()
                    }
                ))
                setOrders(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])

    // const handleViewDetail = (orderId) => {
    //     navigate(`/order-detail/${orderId}`);
    // };

    const confirmTransactionArrival = async () => {
        await confirmMultiP2PTransactionArrival(id, orderSelection)
        setSendOrderDialog(false)
        setOrders(orders.filter(item => !orderSelection.includes(item.id)))
        setOrderSelection([])
        
    }




    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, sortable: false },
        { field: 'sendFrom', headerName: 'Nơi gửi', flex: 2, sortable: false },
        { field: 'sendTo', headerName: 'Nơi nhận', flex: 2, sortable: false },
        { field: 'departureTime', headerName: 'Thời gian gửi', flex: 2, sortable: false },
        // { field: 'arrivalTime', headerName: 'Thời gian nhận', flex: 2, sortable: false },
        { field: 'status', headerName: 'Trạng thái đơn hàng', flex: 1, sortable: true },
        // {
        //     field: 'action',
        //     headerName: 'Action',
        //     flex: 1,
        //     sortable: false,
        //     renderCell: (params) => (
        //         <>
        //             <IconButton onClick={() => handleViewDetail(params.row.id)}>
        //                 <VisibilityIcon />
        //             </IconButton>
        //         </>

        //     ),
        // },
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
                        {/* <div class='mt-10'></div> */}
                        {/* <div>
                            Search Fields
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
                                    <Grid item xs={6} sm={3}>
                                        <FormControl fullWidth>
                                            <InputLabel>Tỉnh thành</InputLabel>
                                            <Select
                                                value={selectedProvince}
                                                onChange={(e) => setSelectedProvince(e.target.value)}
                                            >
                                                Address options
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControl fullWidth>
                                            <InputLabel>Quận/Huyện</InputLabel>
                                            <Select
                                                value={selectedDistrict}
                                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                            >
                                                Address options
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <FormControl fullWidth sx={{ marginRight: 2, marginBottom: 2 }}>
                                            <InputLabel>Trạng thái</InputLabel>
                                            <Select
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                        
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </div> */}
                        <Typography variant='h4' fontWeight={700} my={5}>
                            Đơn hàng mới tới điểm giao dịch
                        </Typography>
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
                        <div class="flex justify-end mt-5">
                            <Button variant="contained" sx={{ bgcolor: 'primary.main' }} disabled={!orderSelection.length} onClick={() => setSendOrderDialog(true)}>
                                Xác nhận đến
                            </Button>
                        </div>
                        <Dialog
                            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 500 } }}
                            maxWidth="xs"
                            open={sendOrderDialog}
                        >
                            <DialogTitle>Xác nhận đơn hàng</DialogTitle>
                            <DialogContent dividers>
                                <Typography>
                                    Xác nhận {orderSelection.length} đơn hàng đã đến điểm giao dịch?
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setSendOrderDialog(false)}>
                                    Hủy
                                </Button>
                                <Button onClick={confirmTransactionArrival}>Xác nhận</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>

                <Sidebar />
            </div>
        </ThemeProvider>
    );
};

export default ConfirmOrderArrivalToTransaction;
