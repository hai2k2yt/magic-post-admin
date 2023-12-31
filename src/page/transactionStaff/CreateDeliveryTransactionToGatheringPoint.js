import React, { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import { createP2PGatheringOrder, createP2PTransactionOrder, listP2PGatheringOrders } from "../../api/transport";
import { getPointInventory, listGatheringPoints } from "../../api/point";
import Sidebar from "../../component/layout/Sidebar";
import { getGatherDetail } from '../../api/point';
import { getTransactionDetail } from '../../api/point';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
const CreateDeliveryTransactionToGatheringPoint = () => {
    const id = localStorage.getItem('pointId')
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [gatheringPoint, setGatheringPoint] = useState(null)
    const [selectedPoint, setSelectedPoint] = useState(null)
    const [selectedRows, setSelectedRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    // const handleViewDetail = (orderId) => {
    //     navigate(`/order-detail/${orderId}`);
    // };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSelectionChange = (selectionModel) => {
        setSelectedRows(selectionModel);
    };

    const handleCreateDelivery = async () => {
        try {
            const res = await createP2PTransactionOrder(id, {
                expressOrderIdList: selectedRows,
                destinationPointId: selectedPoint
            })
            setOrders(orders.filter(item => !selectedRows.includes(item.id)))
            setSelectedRows([])
            setOpen(true);
            console.log(res)
        } catch (e) {
            console.error(e)
        }
    }

    const handleChangeSelectedPoint = (e) => {
        setSelectedPoint(e.target.value)
    }


    const columns = [
        { field: 'id', headerName: 'Mã đơn hàng', flex: 2, sortable: false },
        { field: 'sendFromAddress', headerName: 'Nơi gửi', flex: 2, sortable: false },
        { field: 'sendToAddress', headerName: 'Nơi nhận', flex: 2, sortable: false },
        { field: 'type', headerName: 'Loại hàng', flex: 1, sortable: false },
        { field: 'sendTime', headerName: 'Thời gian gửi', flex: 1, sortable: true },
        { field: 'status', headerName: 'Trạng thái đơn hàng', flex: 2, sortable: true },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getPointInventory(id);
                const res = await getTransactionDetail(id);
                const gatheringId = res?.gatheringPointId;
                console.log(gatheringId)
                const gather = await getGatherDetail(gatheringId);
                console.log(gather)
                setGatheringPoint(gather)

                const data = response?.map(item => (
                    {
                        id: item.id,
                        sendFromAddress: item?.sender?.address?.street,
                        sendToAddress: item?.receiver?.address?.street,
                        type: item?.type === 'DOCUMENT' ? "Tài Liệu" : "Hàng hóa",
                        sendTime: item.sendTime,
                        status:
                            (() => {
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

                // const gatherPlace = await listGatheringPoints();
                // const dataPlace = gatherPlace?.map(item => (
                //     {
                //         id: item.id,
                //         name: item.name,
                //         address: `${item.address.street}, ${item.address.commune}-${item.address.district}-${item.address.province}`
                //     }
                // ))
                // setGatheringPoints(dataPlace)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])


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
                        <div class='mt-10'>
                            <Typography variant='h4' fontWeight={700} my={5}>
                                Chuyển hàng tới điểm tập kết
                            </Typography>
                        </div>
                        <div>
                            <DataGrid
                                rows={orders}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                rowSelectionModel={selectedRows}
                                onRowSelectionModelChange={handleSelectionChange}
                            />
                        </div>
                        <div class='flex justify-end mt-5'>
                            <FormControl fullWidth>
                                <InputLabel id="gathering-point-select-label">Select point</InputLabel>
                                <Select
                                    className="w-full max-w-xs"
                                    labelId="gathering-point-select-label"
                                    id="gathering-point-select"
                                    value={selectedPoint}
                                    label="Select point"
                                    onChange={handleChangeSelectedPoint}
                                >

                                    <MenuItem required disabled={gatheringPoint?.id === id} value={gatheringPoint?.id}>{[gatheringPoint?.name]}</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        <div class='flex justify-end mt-5'>
                            <Button onClick={handleCreateDelivery} variant="contained" color="secondary">
                                Chuyến giao hàng
                            </Button>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Gửi hàng thành công!"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Ấn "Đóng" để đóng hộp thoại.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} autoFocus>
                                    Đóng
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </div>

                </div>
                <Sidebar />
            </div>
        </ThemeProvider>
    );
}
    ;

export default CreateDeliveryTransactionToGatheringPoint;
