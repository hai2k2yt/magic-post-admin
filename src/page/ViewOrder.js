import React from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import MainNavbar from '../component/layout/MainNavbar';
import Footer from '../component/layout/Footer';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import PropTypes from 'prop-types';
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
    const { sx, ...other } = props;
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
    return (
        <ThemeProvider theme={theme}>

            <MainNavbar />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop:'40px', marginBottom:'-20px' }} >
                <Item>
                    <Typography sx={{ marginLeft: { lg: '40px', md: '40px', sm: '10px', sx: '10px' }, fontWeight:'bold' }} variant='h5' >Tìm kiếm đơn hàng: </Typography>
                </Item>
                <Item>
                    <input type="text" class="mr-10 w-11/12 rounded-lg" placeholder="Nhập mã đơn hàng" />

                </Item>
                <Item>
                    <Button variant="contained" style={{ backgroundColor: '#31304D', color: '#ffffff' }}>Tìm kiếm</Button>
                </Item>
            </Box>
            <Box p={2} >
                <Paper elevation={3} sx={{ padding: '20px', margin: { lg: '40px', md: '40px', sm: '10px', sx: '10px' } }}>
                    <Typography variant="h5" gutterBottom>
                        Người gửi
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography>Họ tên:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Điện thoại:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Mã khách hàng:</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                        Điểm giao dịch
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography>Tên điểm:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Địa chỉ:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Mã bưu chính:</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                        Order
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>Loại hàng gửi:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Dịch vụ cộng thêm:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Chỉ dẫn khi không phát được bưu gửi:</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                        Cam kết
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Nội dung:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Ngày giờ gửi:</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                        Cước
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography style={{ marginBottom: '20px' }}>Người gửi</Typography>
                            <Typography>Cước chính:</Typography>
                            <Typography>Phụ phí:</Typography>
                            <Typography>Tổng cước:</Typography>
                            <Typography>Cước GTGT:</Typography>
                            <Typography>Tổng cước (gồm VAT):</Typography>
                            <Typography>Thu khác:</Typography>
                            <Typography>Tổng thu:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{ marginBottom: '20px' }}>Người nhận</Typography>
                            <Typography>COD:</Typography>
                            <Typography>Thu khác:</Typography>
                            <Typography>Tổng thu:</Typography>
                        </Grid>

                    </Grid>

                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                        Khối lượng
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography>Khối lượng thực tế:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>Khối lượng quy đổi:</Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                        QR code
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Add QR code label here */}
                    </Grid>

                    <Timeline position="alternate">
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="body2">Thời gian 1</Typography>
                                <Typography variant="body2" color="textSecondary">Message 1</Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
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
            <Footer />
        </ThemeProvider >
    );
};

export default ViewOrder;
