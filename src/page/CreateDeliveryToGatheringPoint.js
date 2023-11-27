import React, { useState } from 'react';
import { TextField, Button, IconButton, Grid, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateDeliveryToGatheringPoint = () => {
    const [gatheringPoints, setGatheringPoints] = useState([{ id: '', orderIds: [''] }]);

    const handleAddGatheringPoint = () => {
        setGatheringPoints([...gatheringPoints, { id: '', orderIds: [''] }]);
    };

    const handleRemoveGatheringPoint = (index) => {
        const newGatheringPoints = [...gatheringPoints];
        newGatheringPoints.splice(index, 1);
        setGatheringPoints(newGatheringPoints);
    };

    const handleAddOrderId = (gatheringPointIndex) => {
        const newGatheringPoints = [...gatheringPoints];
        newGatheringPoints[gatheringPointIndex].orderIds.push('');
        setGatheringPoints(newGatheringPoints);
    };

    const handleRemoveOrderId = (gatheringPointIndex, orderIdIndex) => {
        const newGatheringPoints = [...gatheringPoints];
        newGatheringPoints[gatheringPointIndex].orderIds.splice(orderIdIndex, 1);
        setGatheringPoints(newGatheringPoints);
    };

    const handleInputChange = (e, gatheringPointIndex, orderIdIndex) => {
        const newGatheringPoints = [...gatheringPoints];
        if (orderIdIndex !== undefined) {
            newGatheringPoints[gatheringPointIndex].orderIds[orderIdIndex] = e.target.value;
        } else {
            newGatheringPoints[gatheringPointIndex].id = e.target.value;
        }
        setGatheringPoints(newGatheringPoints);
    };

    return (
        <div>
            {gatheringPoints.map((gatheringPoint, gatheringPointIndex) => (
                <Paper key={gatheringPointIndex} style={{ padding: '16px', marginBottom: '16px' }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        label={`Gathering Point ${gatheringPointIndex + 1} ID`}
                                        value={gatheringPoint.id}
                                        onChange={(e) => handleInputChange(e, gatheringPointIndex)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton onClick={() => handleRemoveGatheringPoint(gatheringPointIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                {gatheringPoint.orderIds.map((orderId, orderIdIndex) => (
                                    <React.Fragment key={orderIdIndex}>
                                        <Grid item xs={8}>
                                            <TextField
                                                fullWidth
                                                label={`Order ${orderIdIndex + 1} ID`}
                                                value={orderId}
                                                onChange={(e) => handleInputChange(e, gatheringPointIndex, orderIdIndex)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <IconButton onClick={() => handleRemoveOrderId(gatheringPointIndex, orderIdIndex)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>

                            <Button onClick={() => handleAddOrderId(gatheringPointIndex)}>Add Order ID</Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Button onClick={handleAddGatheringPoint}>Add Gathering Point</Button>
        </div>
    );
};

export default CreateDeliveryToGatheringPoint;
