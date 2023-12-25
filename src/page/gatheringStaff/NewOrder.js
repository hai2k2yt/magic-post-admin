import React, { useState } from 'react';
// import { TextField, Button, IconButton, Grid, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
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
const AddNewOrder = () => {
    //     const [gatheringPoints, setGatheringPoints] = useState([{ id: '', orderIds: [''] }]);

    //     const handleAddGatheringPoint = () => {
    //         setGatheringPoints([...gatheringPoints, { id: '', orderIds: [''] }]);
    //     };

    //     const handleRemoveGatheringPoint = (index) => {
    //         const newGatheringPoints = [...gatheringPoints];
    //         newGatheringPoints.splice(index, 1);
    //         setGatheringPoints(newGatheringPoints);
    //     };

    //     const handleAddOrderId = (gatheringPointIndex) => {
    //         const newGatheringPoints = [...gatheringPoints];
    //         newGatheringPoints[gatheringPointIndex].orderIds.push('');
    //         setGatheringPoints(newGatheringPoints);
    //     };

    //     const handleRemoveOrderId = (gatheringPointIndex, orderIdIndex) => {
    //         const newGatheringPoints = [...gatheringPoints];
    //         newGatheringPoints[gatheringPointIndex].orderIds.splice(orderIdIndex, 1);
    //         setGatheringPoints(newGatheringPoints);
    //     };

    //     const handleInputChange = (e, gatheringPointIndex, orderIdIndex) => {
    //         const newGatheringPoints = [...gatheringPoints];
    //         if (orderIdIndex !== undefined) {
    //             newGatheringPoints[gatheringPointIndex].orderIds[orderIdIndex] = e.target.value;
    //         } else {
    //             newGatheringPoints[gatheringPointIndex].id = e.target.value;
    //         }
    //         setGatheringPoints(newGatheringPoints);
    //     };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'actualWeight', headerName: 'Cân nặng hàng hóa', width: 130 },
        {
            field: 'currentPoint',
            headerName: 'Nơi gửi',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            destinationPoint: 'string',
            width: 160,
        },
        {
            field: 'destinationPoint',
            headerName: 'Nơi nhận',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'status',
            headerName: 'Trạng thái đơn hàng',
            description: 'Status column',
            width: 160,
        }
    ];

    const rows = [
        { id: 1, actualWeight: '3', currentPoint: 'JonPO Box 61354', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 2, actualWeight: '5.4', currentPoint: 'PO Box 19454', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 3, actualWeight: '3.3', currentPoint: 'Suite 71', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 4, actualWeight: '2.2', currentPoint: 'Apt 1287', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 5, actualWeight: '2.2', currentPoint: 'Xuân Thủy', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 6, actualWeight: '3.1', currentPoint: 'Nguyên Hoàng Tôn', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 7, actualWeight: '3.4', currentPoint: 'Hoàng Mai', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 8, actualWeight: '9', currentPoint: 'Long Biên', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
        { id: 9, actualWeight: '9.4', currentPoint: 'Cầu Giấy', destinationPoint: 'Hà Nội', status: 'Đang vận chuyển' },
    ];

    // function RenderCellWithViewButton(params) {
    //     const navigate = useNavigate();
    //     return <PageviewIcon onClick={() => handleView(navigate, params.row.id)} />;
    // }

    // const handleView = (navigate, id) => {
    //     navigate(`/leader/manage/${id}`);
    // };
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
                                Đơn hàng mới tới điểm tập kết
                            </Typography>
                        </div>
                        <div>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>
                        <div class='flex justify-end mt-5'>
                            <Button variant="contained" color="secondary">
                                Xác nhận đơn hàng
                            </Button>
                        </div>

                    </div>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        <li><a class="bg-neutral text-primary"><AddIcon/>Đơn mới</a></li>
                        <li><a href='/order/delivery/gathering'><SwapHorizIcon/>Tạo đơn chuyển đi</a></li>
                        <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                    </ul>
                </div>
            </div>
        </ThemeProvider>
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

export default AddNewOrder;
