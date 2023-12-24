//Manage transaction place, gathering place

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { createTheme, ThemeProvider } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddLocationIconAlt from '@mui/icons-material/AddLocationAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Paper from '@mui/material/Paper';
import { useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { redirect, useNavigate } from "react-router-dom";
import Navbar from '../../component/layout/Navbar';

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
//copy từ Sorting & selecting:  https://mui.com/material-ui/react-table/
function createData(id, name, code, address, leader) {
    return {
        id,
        name,
        code,
        address,
        leader,
    };
}

const rows = [
    createData(1, 'Cupcake', 305, 'ha noi', 'test leader'),
    createData(2, 'Donut', 452, 'ha noi', 'test leader'),
    createData(3, 'Eclair', 262, 'ha noi', 'test leader'),
    createData(4, 'Frozen yoghurt', 159, 'ha noi', 'test leader'),
    createData(5, 'Gingerbread', 356, 'ha noi', 'test leader'),
    createData(6, 'Honeycomb', 408, 'ha noi', 'test leader'),
    createData(7, 'Ice cream sandwich', 237, 'ha noi', 'test leader'),
    createData(8, 'Jelly Bean', 375, 'ha noi', 'test leader'),
    createData(9, 'KitKat', 518, 'ha noi', 'test leader'),
    createData(10, 'Lollipop', 392, 'ha noi', 'test leader'),
    createData(11, 'Marshmallow', 318, 'ha noi', 'test leader'),
    createData(12, 'Nougat', 360, 'ha noi', 'test leader'),
    createData(13, 'Oreo', 437, 'ha noi', 'test leader'),
];

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

const headCells = [
    {
        id: 'id',
        label: 'STT',
    },
    {
        id: 'name',
        label: 'Tên điểm tập kết',
    },
    {
        id: 'code',
        label: 'Mã điểm tập kết',
    },
    {
        id: 'address',
        label: 'Địa chỉ',
    },
    {
        id: 'leader',
        label: 'Tên trưởng điểm',
    },
    {
        id: 'action',
        label: 'Chỉnh sửa'
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };



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

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};



export default function ManagePlace() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

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

    const editPlace = (id) => {
        navigate(`/place/edit/${id}`);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navbar/>
            </div>
            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    {/* <!-- Page content here --> */}
                    <div class="m-10">
                        <Box sx={{ width: '100%' }}>
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
                                                        <TableCell>{row.code}</TableCell>
                                                        <TableCell>{row.address}</TableCell>
                                                        <TableCell>{row.leader}</TableCell>
                                                        <TableCell>
                                                            <EditIcon onClick={() => editPlace(row.id)} />
                                                        </TableCell>
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
                <div class="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                        <li><a href='/dashboard'><SpaceDashboardIcon />Bảng điều khiển</a></li>
                        <li><a href='/manage-transactionPoint'><AddLocationIcon />Quản lý điểm giao dịch</a></li>
                        <li><a class="bg-neutral text-primary"  href='/manage-gatheringPoint'><AddLocationIconAlt /> Quản lý điểm tập kết</a></li>
                        <li><a href='/leader/manage'><PersonAddIcon />Quản lý tài khoản trưởng điểm</a></li>
                        <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                    </ul>
                </div>
            </div>
        </ThemeProvider>
    );
}