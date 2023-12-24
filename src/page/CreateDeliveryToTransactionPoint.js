import React, { useState } from 'react';
import { TextField, Button, IconButton, Grid, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateDeliveryToTransactionPoint = () => {
    const [transactionPoint, setTransactionPoints] = useState([{ id: '', orderIds: [''] }]);

    const handleAddTransactionPoint = () => {
        setTransactionPoints([...transactionPoint, { id: '', orderIds: [''] }]);
    };

    const handleRemoveTransactionPoint = (index) => {
        const newTransactionPoints = [...transactionPoint];
        newTransactionPoints.splice(index, 1);
        setTransactionPoints(newTransactionPoints);
    };

    const handleAddOrderId = (transactionPointIndex) => {
        const newTransactionPoints = [...transactionPoint];
        newTransactionPoints[transactionPointIndex].orderIds.push('');
        setTransactionPoints(newTransactionPoints);
    };

    const handleRemoveOrderId = (transactionPointIndex, orderIdIndex) => {
        const newTransactionPoints = [...transactionPoint];
        newTransactionPoints[transactionPointIndex].orderIds.splice(orderIdIndex, 1);
        setTransactionPoints(newTransactionPoints);
    };

    const handleInputChange = (e, transactionPointIndex, orderIdIndex) => {
        const newTransactionPoints = [...transactionPoint];
        if (orderIdIndex !== undefined) {
            newTransactionPoints[transactionPointIndex].orderIds[orderIdIndex] = e.target.value;
        } else {
            newTransactionPoints[transactionPointIndex].id = e.target.value;
        }
        setTransactionPoints(newTransactionPoints);
    };

    return (
        <div>
            {transactionPoint.map((transactionPoint, transactionPointIndex) => (
                <Paper key={transactionPointIndex} style={{ padding: '16px', marginBottom: '16px' }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        label={`Transaction Point ${transactionPointIndex + 1} ID`}
                                        value={transactionPoint.id}
                                        onChange={(e) => handleInputChange(e, transactionPointIndex)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton onClick={() => handleRemoveTransactionPoint(transactionPointIndex)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                {transactionPoint.orderIds.map((orderId, orderIdIndex) => (
                                    <React.Fragment key={orderIdIndex}>
                                        <Grid item xs={8}>
                                            <TextField
                                                fullWidth
                                                label={`Order ${orderIdIndex + 1} ID`}
                                                value={orderId}
                                                onChange={(e) => handleInputChange(e, transactionPointIndex, orderIdIndex)}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <IconButton onClick={() => handleRemoveOrderId(transactionPointIndex, orderIdIndex)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>

                            <Button onClick={() => handleAddOrderId(transactionPointIndex)}>Add Order ID</Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Button onClick={handleAddTransactionPoint}>Add Transaction Point</Button>
        </div>
    );
};

export default CreateDeliveryToTransactionPoint;
