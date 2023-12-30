import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate } from "react-router-dom";
import Navbar from '../../component/layout/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ROLES from '../auth/Role';
import { useState } from 'react';
import Sidebar from "../../component/layout/Sidebar";
import { useEffect } from 'react';
import { listLeaderInfo } from '../../api/actor';
import { TableRow, TableCell, TablePagination, TableBody, Button } from '@mui/material';
import { useMemo } from 'react';
import { TableContainer, Table, TableHead, TableSortLabel, Paper, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { deleteUser } from '../../api/user';
// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'Full name', width: 130 },
//     {
//         field: 'leaderPlace',
//         headerName: 'Leader Place',
//         type: 'number',
//         width: 160,
//     },
//     {
//         field: 'type',
//         headerName: 'Place type',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//     },
//     {
//         field: 'createdAt',
//         headerName: 'Created At',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//     },
//     {
//         field: 'action',
//         headerName: 'Action',
//         description: 'Action column',
//         sortable: false,
//         width: 160,
//         renderCell: RenderCellWithViewButton
//     }
// ];

// const rows = [
//     { id: 1, fullName: 'Snow', leaderPlace: 'Jon', type: 1, createdAt: '12-11-2023' },
//     { id: 2, fullName: 'Lannister', leaderPlace: 'Cersei', type: 1, createdAt: '12-11-2023' },
//     { id: 3, fullName: 'Lannister', leaderPlace: 'Jaime', type: 1, createdAt: '12-11-2023' },
//     { id: 4, fullName: 'Stark', leaderPlace: 'Arya', type: 1, createdAt: '12-11-2023' },
//     { id: 5, fullName: 'Targaryen', leaderPlace: 'Daenerys', type: 0, createdAt: '12-11-2023' },
//     { id: 6, fullName: 'Melisandre', leaderPlace: null, type: 0, createdAt: '12-11-2023' },
//     { id: 7, fullName: 'Clifford', leaderPlace: 'Ferrara', type: 0, createdAt: '12-11-2023' },
//     { id: 8, fullName: 'Frances', leaderPlace: 'Rossini', type: 0, createdAt: '12-11-2023' },
//     { id: 9, fullName: 'Roxie', leaderPlace: 'Harvey', type: 0, createdAt: '12-11-2023' },
// ];
const role = localStorage.getItem('role');
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
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const headCells = [
        {
            id: 'id',
            label: 'ID',
        },
        {
            id: 'name',
            label: 'Tên trưởng điểm',
        },
        {
            id: 'email',
            label: 'Email',
        },
        {
            id: 'phone',
            label: 'Số điện thoại',
        },
        {
            id: 'role',
            label: 'Chức vụ',
        },
        {
            id: 'delete',
            label: 'Xóa tài khoản',
        }
    ];

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function ManageLeaderAccount() {

    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listLeaderInfo();
                const data = response?.map(item => (
                    {
                        id: item.id,
                        name: item.username,
                        email: item.email,
                        phone: item.phone,
                        role: item.role
                    }
                ))
                setRows(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])
    const deleteLeader = async (id) => {
        try {
            const res = await deleteUser(id);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar />
            </div>
            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    {/* <!-- Page content here --> */}
                    <div class="m-10">
                        <Box sx={{ width: '100%' }}>
                            <Typography variant='h4' fontWeight={700} marginBottom={3}>
                                Quản lý tài khoản trưởng điểm
                            </Typography>
                            <Paper sx={{ width: '100%', mb: 2 }}>
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 750 }}
                                        aria-labelledby="tableTitle"
                                        size='medium'
                                    >
                                        <EnhancedTableHead
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                            rowCount={rows.length}
                                        />
                                        <TableBody>
                                            {visibleRows.map((row, index) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            padding="none"
                                                            align="center"
                                                        >
                                                            {row.id}
                                                        </TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{row.phone}</TableCell>
                                                        <TableCell>{row.role}</TableCell>
                                                        {/* <TableCell>
                                                            <button className="btn btn-ghost" onClick={() => document.getElementById('my_modal_1').showModal()}><HighlightOffIcon/></button>
                                                            <dialog id="my_modal_1" className="modal">
                                                                <div className="modal-box">
                                                                    <h3 className="font-bold text-lg">Chắc chắn muốn xóa tài khoản này?</h3>
                                                                    <p className="py-4">Ấn "Đồng ý" để xóa tài khoản.</p>
                                                                    <div className="modal-action">
                                                                        <form method="dialog">
                                                                            {/* if there is a button in form, it will close the modal 
                                                                            <Button >Hủy</Button>
                                                                            <button className="btn" onClick={() => deleteLeader(row.id)}>Đồng ý</button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </dialog>

                                                        </TableCell> */}
                                                        {/* <TableCell>
                                                            <EditIcon onClick={() => editPlace(row.id)} />
                                                        </TableCell> */}
                                                    </TableRow>
                                                );
                                            })}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (53) * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </Box>
                    </div>
                </div>
                <Sidebar />
            </div>
        </ThemeProvider>

    );
}


