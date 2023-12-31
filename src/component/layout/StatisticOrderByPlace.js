import * as React from 'react';
import { useEffect, useState } from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import { listGatheringPoints, listTransactionPoints } from "../../api/point";
import { getAllStatistic, getGatheringStatistic, getTransactionStatistic } from "../../api/statistics";
import ROLES from '../../page/auth/Role';
import { TableHead, TableSortLabel } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import { Table } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableBody } from "@mui/material";
import { TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";


export default function StatisticOrder() {
    const [listTransactionPoint, setListTransactionPoint] = useState([]);
    const [listGatheringPoint, setListGatheringPoint] = useState([]);
    const [transactionPoint, setTransactionPoint] = useState('');
    const [gatheringPoint, setGatheringPoint] = useState('');
    const [transactionPointData, setTransactionPointData] = useState(null);
    const [gatheringPointData, setGatheringPointData] = useState({});
    const role = localStorage.getItem('role');
    const pointId = localStorage.getItem('pointId');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        async function fetchData() {
            try {
                // if (role === ROLES[2]) {
                //     const response = await getTransactionStatistic(pointId);
                //     setTransactionPointData(response);
                //     console.log(transactionPointData)
                // } else if (role === ROLES[1]) {
                if (role === ROLES[1]) {
                    const response = await getGatheringStatistic(pointId);
                    console.log(response)
                    setGatheringPointData(response);
                    console.log(gatheringPointData)
                } else {
                    const response = await getTransactionStatistic(pointId);
                    setTransactionPointData(response);
                }
                // }
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])

    const headCells = [
        {
            id: 'id',
            label: 'ID',
        },
        {
            id: 'name',
            label: 'Tên điểm',
        },

        {
            id: 'sendOrder',
            label: 'Tổng đơn gửi',
        },
        {
            id: 'receiveOrder',
            label: 'Tổng đơn nhận',
        },
    ];

    return (
        <>
            <div>
                <Typography variant='h4' fontWeight={700} mb={5}>
                    Thống kê đơn hàng
                </Typography>
                <div class='mb-10'>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size='medium'
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell >Tên Điểm</TableCell>
                                        <TableCell >Tổng đơn gửi</TableCell>
                                        <TableCell >Tổng đơn nhận</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={
                                            role === ROLES[1] ?
                                                gatheringPointData?.id : transactionPointData?.id}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="none"
                                            align="center"
                                        >
                                            {role === ROLES[1] ?
                                                gatheringPointData?.id : transactionPointData?.id}
                                        </TableCell>
                                        <TableCell>{role === ROLES[1] ?
                                            gatheringPointData?.name : transactionPointData?.name}</TableCell>
                                        <TableCell>{role === ROLES[1] ?
                                            gatheringPointData?.totalSendOrders : transactionPointData?.totalSendOrders}</TableCell>
                                        <TableCell>{role === ROLES[1] ?
                                            gatheringPointData?.totalReceiveOrders : transactionPointData?.totalReceiveOrders}</TableCell>
                                    </TableRow>

                                    {/* {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>

        </>
    );
}