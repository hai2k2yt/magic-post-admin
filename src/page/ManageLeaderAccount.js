import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate } from "react-router-dom";
import Navbar from '../component/layout/Navbar';
import { Drawer } from '@mui/material';
import DrawerSideAdmin from '../component/layout/DrawerSideAdmin';

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
export default function ManageLeaderAccount() {

    return (
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


    );
}