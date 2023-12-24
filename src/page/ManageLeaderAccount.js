import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate } from "react-router-dom";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../component/layout/Navbar';
import Footer from '../component/layout/Footer';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddLocationAlt from '@mui/icons-material/AddLocationAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddLocationIconAlt from '@mui/icons-material/AddLocationAlt';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Full name', width: 130 },
    {
        field: 'leaderPlace',
        headerName: 'Leader Place',
        type: 'number',
        width: 160,
    },
    {
        field: 'type',
        headerName: 'Place type',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
    },
    {
        field: 'action',
        headerName: 'Action',
        description: 'Action column',
        sortable: false,
        width: 160,
        renderCell: RenderCellWithViewButton
    }
];

const rows = [
    { id: 1, fullName: 'Snow', leaderPlace: 'Jon', type: 1, createdAt: '12-11-2023' },
    { id: 2, fullName: 'Lannister', leaderPlace: 'Cersei', type: 1, createdAt: '12-11-2023' },
    { id: 3, fullName: 'Lannister', leaderPlace: 'Jaime', type: 1, createdAt: '12-11-2023' },
    { id: 4, fullName: 'Stark', leaderPlace: 'Arya', type: 1, createdAt: '12-11-2023' },
    { id: 5, fullName: 'Targaryen', leaderPlace: 'Daenerys', type: 0, createdAt: '12-11-2023' },
    { id: 6, fullName: 'Melisandre', leaderPlace: null, type: 0, createdAt: '12-11-2023' },
    { id: 7, fullName: 'Clifford', leaderPlace: 'Ferrara', type: 0, createdAt: '12-11-2023' },
    { id: 8, fullName: 'Frances', leaderPlace: 'Rossini', type: 0, createdAt: '12-11-2023' },
    { id: 9, fullName: 'Roxie', leaderPlace: 'Harvey', type: 0, createdAt: '12-11-2023' },
];

function RenderCellWithViewButton(params) {
    const navigate = useNavigate();
    return <PageviewIcon onClick={() => handleView(navigate, params.row.id)} />;
}

const handleView = (navigate, id) => {
    navigate(`/leader/manage/${id}`);
};
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
export default function ManageLeaderAccount() {

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
                                Quản lý tài khoản trưởng điểm
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

                    </div>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        <li><a href='/dashboard'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                        <li><a href='/manage-transactionPoint'><AddLocationIcon />Quản lý điểm giao dịch</a></li>
                        <li><a href='/manage-gatheringPoint'><AddLocationIconAlt /> Quản lý điểm tập kết</a></li>
                        <li><a href='/leader/create'><PersonAddIcon />Tạo tài khoản trưởng điểm</a></li>
                        <li><a class="bg-neutral text-primary" href='/leader/manage'><ManageAccountsIcon />Quản lý tài khoản trưởng điểm</a></li>
                        <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                    </ul>
                </div>
            </div>
        </ThemeProvider>

    );
}


