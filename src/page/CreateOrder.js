import React from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem, TextareaAutosize,
} from '@mui/material';

const CreateOrder = () => {
    return (
        <Box p={2}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Người gửi
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField label="Họ tên" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="Điện thoại" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="Mã khách hàng" fullWidth />
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom>
                    Người nhận
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField label="Họ tên" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="Điện thoại" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="Địa chỉ" fullWidth />
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Order
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Loại hàng gửi</InputLabel>
                            <Select>
                                <MenuItem value="tai-lieu">Tài liệu</MenuItem>
                                <MenuItem value="hang-hoa">Hàng hóa</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Dịch vụ cộng thêm" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="send-back-label">
                                Chỉ dẫn khi không phát được bưu gửi
                            </InputLabel>
                            <Select
                                label="Chỉ dẫn khi không phát được bưu gửi">
                                <MenuItem value="back-immediately">Chuyển hoàn ngay</MenuItem>
                                <MenuItem value="call-sender">Gọi điện cho người gửi/BC gửi</MenuItem>
                                <MenuItem value="remove">Hủy</MenuItem>
                                <MenuItem value="back-before-day">Chuyển hoàn trước ngày</MenuItem>
                                <MenuItem value="back-when-expired">Chuyển hoàn khi hết thời gian lưu trữ</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Cam kết
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextareaAutosize minRows={3} style={{width: '100%'}} />
                    </Grid>
                </Grid>

                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Cước
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography label="Người gửi" fullWidth />
                        <TextField label="Cước chính" fullWidth />
                        <TextField label="Phụ phí" fullWidth />
                        <TextField label="Tổng cước" fullWidth />
                        <TextField label="Cước GTGT" fullWidth />
                        <TextField label="Tổng cước (gồm VAT)" fullWidth />
                        <TextField label="Thu khác" fullWidth />
                        <TextField label="Tổng thu" fullWidth />
                    </Grid>

                    <Grid item xs={4}>
                        <Typography label="Người nhận" fullWidth />
                        <TextField label="COD" fullWidth />
                        <TextField label="Thu khác" fullWidth />
                        <TextField label="Tổng thu" fullWidth />
                    </Grid>





                </Grid>

                <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                    Khối lượng
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField label="Khối lượng thực tế" fullWidth />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField label="Khối lượng quy đổi" fullWidth />
                    </Grid>
                </Grid>


                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Tạo đơn gửi
                </Button>
            </Paper>
        </Box>
    );
};

export default CreateOrder;
