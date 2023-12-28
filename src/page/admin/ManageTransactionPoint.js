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
import { useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { redirect, useNavigate } from "react-router-dom";
import Navbar from '../../component/layout/Navbar';
import { listGatheringPoints, listTransactionPoints } from "../../api/point";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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

const headCells = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'name',
        label: 'Tên điểm giao dịch',
    },
    {
        id: 'code',
        label: 'Mã điểm giao dịch',
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
        id: 'gatheringPoint',
        label: 'Điểm tập kết',
    },

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
    const [rows, setRows] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await listTransactionPoints();
                const data = response?.map(item => (
                    {
                        id: item.id,
                        name: item.name,
                        code: item.address.zipcode,
                        address: `${item.address.street}, ${item.address.commune}-${item.address.district}-${item.address.province}`,
                        leader: item.transactionLeaderId,
                        gatheringPoint: item.gatheringPointId
                    }
                ))
                setRows(data);
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])

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
                                                        <TableCell>{row.gatheringPoint}</TableCell>

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
                        <li><a class="bg-neutral text-primary" href='/manage-transactionPoint'><AddLocationIcon />Quản lý điểm giao dịch</a></li>
                        <li><a href='/manage-gatheringPoint'><AddLocationIconAlt /> Quản lý điểm tập kết</a></li>
                        <li><a href='/leader/create'><PersonAddIcon />Tạo tài khoản trưởng điểm</a></li>
                        <li><a href='/leader/manage'><ManageAccountsIcon />Quản lý tài khoản trưởng điểm</a></li>

                    </ul>
                </div>
            </div>
        </ThemeProvider>
    );
}