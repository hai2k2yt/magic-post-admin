import * as React from 'react';
import {useEffect, useState} from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import StatisticOrderByPlace from "./StatisticOrderByPlace";
import ManageOrder from './StatisticAllOrder';
import {listGatheringPoints, listTransactionPoints} from "../../api/point";
import {getGatheringStatistic, getTransactionStatistic} from "../../api/statistics";

export default function StatisticOrder() {
    const [listTransactionPoint, setListTransactionPoint] = useState([]);
    const [listGatheringPoint, setListGatheringPoint] = useState([]);
    const [transactionPoint, setTransactionPoint] = useState('');
    const [gatheringPoint, setGatheringPoint] = useState('');
    const [transactionPointData, setTransactionPointData] = useState(null);
    const [gatheringPointData, setGatheringPointData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const gatheringPlaces = await listGatheringPoints();
                const data = gatheringPlaces?.map(item => (
                    {
                        id: item.id,
                        name: item.name,
                    }
                ))
                setListGatheringPoint(data);
                const transactionPlaces = await listTransactionPoints();
                const data2 = transactionPlaces.map(i => (
                    {
                        id: i.id,
                        name: i.name
                    }
                ))
                setListTransactionPoint(data2)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData();
    }, []);

    useEffect( () => {
        async function fetchTransactionData() {
            if(transactionPoint) {
                try {
                    const data = await getTransactionStatistic(transactionPoint);
                    setTransactionPointData(data);
                } catch (e) {
                    console.log(e)
                }
            }
        }
        fetchTransactionData();


    }, [transactionPoint]);

    useEffect( () => {
        async function fetchGatheringData() {
            if(gatheringPoint) {
                try {
                    const data = await getGatheringStatistic(gatheringPoint);
                    setGatheringPointData(data);
                } catch (e) {
                    console.log(e)
                }
            }
        }

        fetchGatheringData();
    }, [gatheringPoint]);

    const handleChangeTransaction = (event) => {
        setTransactionPoint(event.target.value);
    };

    const handleChangeGathering = (e) => {
        setGatheringPoint(e.target.value)
    }

    return (
        <>
            <Typography gutterBottom variant="h3" fontWeight={700} component="div">
                Toàn quốc
            </Typography>
            <div class="stats shadow mb-10">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <InventoryIcon />
                    </div>
                    <div class="stat-title">Đơn hàng nhận</div>
                    <div class="stat-value text-primary">25.6K</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <LocalShippingIcon />
                    </div>
                    <div class="stat-title">Đơn hàng gửi</div>
                    <div class="stat-value text-secondary">2.6M</div>
                </div>
            </div>
            <div class='mb-10'>
                <ManageOrder />
            </div>

            <Typography gutterBottom variant="h3" fontWeight={700} component="div">
                Điểm giao dịch
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="transaction-point-label">Điểm Giao Dịch</InputLabel>
                <Select
                    style={{ width: '400px', marginBottom: 20 }}
                    labelId="transaction-point-label"
                    id="transaction-point"
                    value={transactionPoint}
                    label="Điểm Giao Dịch"
                    onChange={handleChangeTransaction}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {listTransactionPoint.map(i => (
                        <MenuItem value={i.id}>{i.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div class="stats shadow mb-10">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <InventoryIcon />
                    </div>
                    <div class="stat-title">Đơn hàng nhận</div>
                    <div class="stat-value text-primary">{transactionPointData?.totalReceiveOrders}</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <LocalShippingIcon />
                    </div>
                    <div class="stat-title">Đơn hàng gửi</div>
                    <div class="stat-value text-secondary">{transactionPointData?.totalSendOrders}</div>
                </div>
            </div>
            <div class='mb-10'>
                <StatisticOrderByPlace />
            </div>

            <Typography gutterBottom variant="h3" fontWeight={700} component="div">
                Điểm tập kết
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="transaction-point-label">Điểm Tập Kết</InputLabel>
                <Select
                    style={{ width: '400px', marginBottom: 20 }}
                    labelId="transaction-point-label"
                    id="transaction-point"
                    value={gatheringPoint}
                    label="Điểm Giao Dịch"
                    onChange={handleChangeGathering}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {listGatheringPoint.map(i => (
                        <MenuItem value={i.id}>{i.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div class="stats shadow mb-10">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <InventoryIcon />
                    </div>
                    <div class="stat-title">Đơn hàng nhận</div>
                    <div class="stat-value text-primary">{gatheringPointData?.totalReceiveOrders}</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <LocalShippingIcon />
                    </div>
                    <div class="stat-title">Đơn hàng gửi</div>
                    <div class="stat-value text-secondary">{gatheringPointData?.totalSendOrders}</div>
                </div>
            </div>
            <div class='mb-10'>
                <StatisticOrderByPlace />
            </div>
        </>
    );
}