import React, { useEffect, useState } from 'react';
// import { TextField, Button, IconButton, Grid, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createP2PGatheringOrder, listP2PGatheringOrders } from "../../api/transport";
import { listGatheringPoints } from "../../api/point";

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
const CreateDeliveryToGatheringPoint = () => {
    let { id } = useParams();
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [gatheringPoints, setGatheringPoints] = useState([])
    const [selectedPoint, setSelectedPoint] = useState(null)
    const [selectedRows, setSelectedRows] = useState([]);

    const handleViewDetail = (orderId) => {
        navigate(`/order-detail/${orderId}`);
    };

    const handleSelectionChange = (selectionModel) => {
        setSelectedRows(selectionModel);
    };

    const handleCreateDelivery = async () => {
        try {
            const res = await createP2PGatheringOrder(id, {
                expressOrderIdList: selectedRows,
                destinationPointId: selectedPoint
            })
        } catch (e) {
            console.error(e)
        }
    }

    const handleChangeSelectedPoint = (e) => {
        setSelectedPoint(e.target.value)
    }


    const columns = [
        { field: 'id', headerName: 'ID', flex: 2, sortable: false },
        { field: 'sendFrom', headerName: 'Nơi gửi', flex: 2, sortable: false },
        { field: 'sendTo', headerName: 'Nơi nhận', flex: 2, sortable: false },
        { field: 'arrivalTime', headerName: 'Ngày nhận', flex: 2, sortable: false },
        { field: 'status', headerName: 'Trạng thái đơn hàng', flex: 1, sortable: true },
        {
            field: 'action',
            headerName: 'Action',
            flex: 2,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleViewDetail(params.row.OrderID)}>
                        <VisibilityIcon />
                    </IconButton>
                </>

            ),
        },
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listP2PGatheringOrders(id);
                const data = response?.map(item => (
                    {
                        id: item.id,
                        sendFromId: item.from.id,
                        sendFrom: item.from.name,
                        sendTo: item.to.name,
                        arrivalTime: item.arrivalTime,
                        status: item.status
                    }
                ))
                setOrders(data);

                const gatherPlace = await listGatheringPoints();
                const dataPlace = gatherPlace?.map(item => (
                    {
                        id: item.id,
                        address: `${item.address.street}, ${item.address.zipcode}/${item.address.commune}-${item.address.district}-${item.address.province}`
                    }
                ))
                setGatheringPoints(dataPlace)
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
                                    {gatheringPoints.map(i => (
                                        <MenuItem disabled={i.id === id} value={i.id}>{i.address}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div class='flex justify-end mt-5'>
                            <Button onClick={handleCreateDelivery} variant="contained" color="secondary">
                                Chuyến giao hàng
                            </Button>
                        </div>

                    </div>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        <li><a href='/gathering/order/:id'><AddIcon />Đơn mới</a></li>
                        <li><a class="bg-neutral text-primary" ><SwapHorizIcon />Tạo đơn đến điểm tập kết</a></li>
                        <li><a href='/order/delivery/transaction/:id'>Tạo đơn đến điểm giao dịch đích</a></li>
                    </ul>
                </div>
            </div>
        </ThemeProvider >
        //     <div>
        //         {gatheringPoints.map((gatheringPoint, gatheringPointIndex) => (
        //             <Paper key={gatheringPointIndex} style={{ padding: '16px', marginBottom: '16px' }}>
        //                 <Grid container>
        //                     <Grid item xs={6}>
        //                         <Grid container spacing={2}>
        //                             <Grid item xs={8}>
        //                                 <TextField
        //                                     fullWidth
        //                                     label={`Gathering Point ${gatheringPointIndex + 1} ID`}
        //                                     value={gatheringPoint.id}
        //                                     onChange={(e) => handleInputChange(e, gatheringPointIndex)}
        //                                 />
        //                             </Grid>
        //                             <Grid item xs={4}>
        //                                 <IconButton onClick={() => handleRemoveGatheringPoint(gatheringPointIndex)}>
        //                                     <DeleteIcon />
        //                                 </IconButton>
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>

        //                     <Grid item xs={6}>
        //                         <Grid container spacing={2}>
        //                             {gatheringPoint.orderIds.map((orderId, orderIdIndex) => (
        //                                 <React.Fragment key={orderIdIndex}>
        //                                     <Grid item xs={8}>
        //                                         <TextField
        //                                             fullWidth
        //                                             label={`Order ${orderIdIndex + 1} ID`}
        //                                             value={orderId}
        //                                             onChange={(e) => handleInputChange(e, gatheringPointIndex, orderIdIndex)}
        //                                         />
        //                                     </Grid>
        //                                     <Grid item xs={4}>
        //                                         <IconButton onClick={() => handleRemoveOrderId(gatheringPointIndex, orderIdIndex)}>
        //                                             <DeleteIcon />
        //                                         </IconButton>
        //                                     </Grid>
        //                                 </React.Fragment>
        //                             ))}
        //                         </Grid>

        //                         <Button onClick={() => handleAddOrderId(gatheringPointIndex)}>Add Order ID</Button>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         ))}

        //         <Button onClick={handleAddGatheringPoint}>Add Gathering Point</Button>
        //     </div>
    );
};

export default CreateDeliveryToGatheringPoint;
