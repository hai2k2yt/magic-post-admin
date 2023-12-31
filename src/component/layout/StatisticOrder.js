import * as React from 'react';
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { getAllStatistic, getGatheringStatistic, getTransactionStatistic } from "../../api/statistics";
import ROLES from '../../page/auth/Role';
import { useMemo } from "react";
import PropTypes from "prop-types";
import { TableHead, TableSortLabel } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { Table } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableBody } from "@mui/material";
import { TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";

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
export default function StatisticOrder() {
    // const role = localStorage.getItem('role');
    // const pointId = localStorage.getItem('pointId');
    const [rows, setRows] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllStatistic();
                const data = response?.map(item => (
                    {
                        id: item.id,
                        name: item.name,
                        sendOrder: item.totalSendOrders,
                        receiveOrder: item.totalReceiveOrders,
                        type: item.type
                    }
                ))
                console.log(data);
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

    // const editPlace = (id) => {
    //     navigate(`/place/edit/${id}`);
    // }

    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );
    const headCells = [
        {
            id: 'id',
            label: 'ID',
        },
        {
            id: 'name',
            label: 'Tên điểm',
        },
        // {
        //     id: 'code',
        //     label: 'Mã điểm tập kết',
        // },
        {
            id: 'sendOrder',
            label: 'Tổng đơn gửi',
        },
        {
            id: 'receiveOrder',
            label: 'Tổng đơn nhận',
        },
        {
            id: 'type',
            label: 'Loại điểm',
        }
        // {
        //     id: 'action',
        //     label: ''
        // }
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


    return (
        <>

            <div>
                <Typography gutterBottom variant="h3" fontWeight={700} component="div">
                    Toàn quốc
                </Typography>
                <div class='mb-10'>
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
                                                <TableCell>{row.sendOrder}</TableCell>
                                                <TableCell>{row.receiveOrder}</TableCell>
                                                <TableCell>{
                                                    row.type === "GatheringPoint" ? "Điểm tập kết" : "Điểm giao dịch"
                                                }</TableCell>
                                            </TableRow>
                                        );
                                    })}

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
                </div>

            </div>

        </>
    );
}