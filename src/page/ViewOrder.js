import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography, Grid, Button} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import MainNavbar from '../component/layout/MainNavbar';
import Footer from '../component/layout/Footer';
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@emotion/react';

import PropTypes from 'prop-types';
import {listP2PGatheringOrders} from "../api/transport";
import {getOrder} from "../api/order";

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

function Item(props) {
    const {sx, ...other} = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};
const ViewOrder = () => {
    const [orderId, setOrderId] = useState('')
    const [order, setOrderDetail] = useState(null)

    const fetchOrderDetail = async () => {
        if (orderId) {
            try {
                const response = await getOrder(orderId);
                setOrderDetail(response);
            } catch (e) {
                console.log(e)
            }
        } else {
            setOrderDetail(null)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <MainNavbar/>
            <Box sx={{display: 'flex', justifyContent: 'flex-start', marginTop: '40px', marginBottom: '-20px'}}>
                <Item>
                    <Typography sx={{marginLeft: {lg: '40px', md: '40px', sm: '10px', sx: '10px'}, fontWeight: 'bold'}}
                                variant='h5'>Tìm kiếm đơn hàng: </Typography>
                </Item>
                <Item>
                    <input
                        value={orderId}
                        onChange={e => setOrderId(e.target.value)}
                        type="text" class="mr-10 w-11/12 rounded-lg" placeholder="Nhập mã đơn hàng"/>
                </Item>
                <Item>
                    <Button onClick={fetchOrderDetail} variant="contained"
                            style={{backgroundColor: '#31304D', color: '#ffffff'}}>Tìm kiếm</Button>
                </Item>
            </Box>
            {order && (
                <Box p={2}>
                    <Paper elevation={3}
                           sx={{padding: '20px', margin: {lg: '40px', md: '40px', sm: '10px', sx: '10px'}}}>
                        <Typography variant="h5" gutterBottom>
                            Người gửi
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography>Họ tên: {order?.sender?.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Điện thoại: {order?.sender?.phone}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Mã khách hàng: {order?.sender?.id}</Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                            Điểm giao dịch
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography>Tên điểm: </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Địa chỉ: {order?.sender?.address?.street}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Mã bưu chính: {order?.sender?.address?.zipcode}</Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                            Order
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography>Loại hàng gửi: {order?.type}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Dịch vụ cộng thêm: {order?.specialService}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Chỉ dẫn khi không phát được bưu gửi: {order?.senderInstructor}</Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                            Cam kết
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>Nội dung:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Ngày giờ gửi: {order?.sendTime}</Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                            Cước
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography style={{marginBottom: '20px'}}>Người gửi</Typography>
                                <Typography>Cước chính: {order?.price?.mainTax}</Typography>
                                <Typography>Phụ phí: {order?.price?.subTax}</Typography>
                                <Typography>Phí vận chuyển: {order?.price?.transportTax}</Typography>
                                <Typography>Tổng phí: {order?.price?.totalTax}</Typography>
                                <Typography>Thu khác: {order?.price?.otherTax}</Typography>
                                <Typography>Tổng thu: {order?.price?.totalPrice}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={{marginBottom: '20px'}}>Người nhận</Typography>
                                <Typography>COD: {order?.cashOnDelivery?.cod}</Typography>
                                <Typography>Thu khác: {order?.cashOnDelivery?.other}</Typography>
                                <Typography>Tổng thu: {order?.cashOnDelivery?.totalCOD}</Typography>
                            </Grid>

                        </Grid>

                        <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                            Khối lượng
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography>Khối lượng thực tế: {order?.actualWeight}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Khối lượng quy đổi: {order?.volumetricWeight}</Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                            QR code
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Add QR code label here */}
                        </Grid>

                        <Typography variant="h5" gutterBottom style={{marginTop: '20px'}}>
                            Trạng thái đơn hàng: {order.status}
                        </Typography>


                        <Timeline position="alternate">
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot/>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography variant="body2">Thời gian 1</Typography>
                                    <Typography variant="body2" color="textSecondary">Message 1</Typography>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot/>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Typography variant="body2">Thời gian 2</Typography>
                                    <Typography variant="body2" color="textSecondary">Message 2</Typography>
                                </TimelineContent>
                            </TimelineItem>
                            {/* Add more TimelineItems as needed */}
                        </Timeline>
                    </Paper>
                </Box>
            )}

            <Footer/>
        </ThemeProvider>
    );
};

export default ViewOrder;
