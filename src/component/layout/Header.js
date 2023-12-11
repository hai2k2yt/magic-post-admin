import { ThemeProvider } from '@emotion/react';
import { Box, Typography, Button } from '@mui/material'
import { Grid } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Grow from '@mui/material/Grow';
import React, { useState } from 'react'
import headerPic from '../../asset/headerPic.svg'
import deliveryBody from '../../asset/deliveryBody.svg'
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(5),
  marginRight: theme.spacing(5),
  marginLeft: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  }

}));
const handleCheckOrderCode = (event) => {
  {/*xử lý tra cứu đơn hàng tại đây*/ }
}
const theme = createTheme({
  typography: {
    "fontFamily": '"Montserrat", "sans-serif"',
    h3: {
      fontSize: '2.2rem',
    },
    h5: {
      fontSize: '1rem',
      color: '#31304D'
    },
    body2: {
      fontSize: '0.8rem',
    },
  },
  palette: {
    primary: {
      main: '#161A30',
    },
    secondary: {
      main: '#31304D',
    },
    third: {
      main: '#B6BBC4',
    },
    fourth: {
      main: '#F0ECE5',
    },
    fifth: {
      main: '#8794D8',
    },
    sixth: {
      main: '#5050B3',
    },
    seventh: {
      main: '#344382',
    },
  }
});
theme.typography.h3 = {
  ...theme.typography.h3,
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3rem',
  },
}
theme.typography.body2 = {
  ...theme.typography.body2,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.1rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.20rem',
  },
}
theme.typography.h5 = {
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.75rem',
  },
}
const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
        <Grid xs={12} sm={12} md={6} lg={5}>
          <Item >
            <Typography variant="h5" align="left" color="primary" fontStyle={'italic'}>
              Magic Post
            </Typography>
            <Typography variant="h3" fontWeight={700} align="left" color="fifth">
              Nhanh chóng, <br />Chính xác,<br />An toàn, <br />Chuyên nghiệp.
            </Typography>
            <Typography variant='body2' color="sixth">
              Kết nối con người, kết nối doanh nghiệp, tổ chức vì một Việt Nam phát triển bằng các giải pháp chuyển phát nhanh, thương mại điện tử, logistics trong nước và quốc tế.
            </Typography>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#ffffff', borderRadius: 3}}>
                <OutlinedInput
                  sx={{ borderRadius: '16px', backgroundColor: '#ffffff', color: 'primary', margin: 2, fontWeight: 'bold', }}
                  id="outlined-adornment-amount"
                  placeholder="Nhập mã để tra cứu bưu gửi"
                  name="orderCode"
                  endAdornment={<InputAdornment position="end">
                    <Button onClick={handleCheckOrderCode} variant='contained' color='fourth' sx={{ borderRadius: '16px', color: 'primary', fontWeight: 'bold', }}>Tra cứu</Button></InputAdornment>}
                />
              </FormControl>
          </Item>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <Item>
            <img src={headerPic} alt="headerPic" sx={{ width: '100%', height: 'auto' }} />
          </Item>
        </Grid>
      </Grid>
    </ThemeProvider>

  )
}

export default Header