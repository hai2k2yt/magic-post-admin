import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState} from "react";

export default function StatisticCard({title, value}) {

    return (
        <Card style={{width: '100%'}}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {title}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {value}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View more</Button>
            </CardActions>
        </Card>
    );
}