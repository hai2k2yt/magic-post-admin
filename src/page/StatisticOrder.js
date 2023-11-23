import * as React from 'react';
import {useState} from "react";
import StatisticCard from "../component/StatisticCard";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function StatisticOrder() {
    const [transactionPoint, setTransactionPoint] = useState('');
    const [gatheringPoint, setGatheringPoint] = useState('');

    const handleChangeTransaction = (event) => {
        setTransactionPoint(event.target.value);
    };

    const handleChangeGathering = (e) => {
        setGatheringPoint(e.target.value)
    }

    return (
        <>
            <Typography gutterBottom variant="h3" component="div">
                Toàn quốc
            </Typography>
            <Grid container spacing={5} style={{padding: '0 100px 0 100px'}}>
                <Grid item xs={4}>
                    <StatisticCard title="Order receiving" value={125} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticCard title="Order in place" value={255} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticCard title="Order sending" value={500} />
                </Grid>
            </Grid>

            <Typography gutterBottom variant="h3" component="div">
                Điểm giao dịch
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="transaction-point-label">Điểm Giao Dịch</InputLabel>
                <Select
                    style={{width: '400px', marginBottom: 20}}
                    labelId="transaction-point-label"
                    id="transaction-point"
                    value={transactionPoint}
                    label="Điểm Giao Dịch"
                    onChange={handleChangeTransaction}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="point1">Điểm 1</MenuItem>
                    <MenuItem value="point2">Điểm 2</MenuItem>
                    <MenuItem value="point3">Điểm 3</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={5} style={{padding: '0 100px 0 100px'}}>
                <Grid item xs={4}>
                    <StatisticCard title="Order receiving" value={125} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticCard title="Order in place" value={255} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticCard title="Order sending" value={500} />
                </Grid>
            </Grid>

            <Typography gutterBottom variant="h3" component="div">
                Điểm tập kết
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="transaction-point-label">Điểm Tập Kết</InputLabel>
                <Select
                    style={{width: '400px', marginBottom: 20}}
                    labelId="transaction-point-label"
                    id="transaction-point"
                    value={gatheringPoint}
                    label="Điểm Giao Dịch"
                    onChange={handleChangeGathering}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="point1">Điểm 1</MenuItem>
                    <MenuItem value="point2">Điểm 2</MenuItem>
                    <MenuItem value="point3">Điểm 3</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={5} style={{padding: '0 100px 0 100px'}}>
                <Grid item xs={4}>
                    <StatisticCard title="Order receiving" value={125} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticCard title="Order in place" value={255} />
                </Grid>
                <Grid item xs={4}>
                    <StatisticCard title="Order sending" value={500} />
                </Grid>
            </Grid>
        </>
    );
}