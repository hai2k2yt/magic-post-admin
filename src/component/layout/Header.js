import { ThemeProvider } from '@emotion/react';
import { Box, Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Grow from '@mui/material/Grow';
import React from 'react'
import headerPic from '../../asset/headerPic.svg'
const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  marginRight: theme.spacing(5),
  marginLeft: theme.spacing(5)

}));
const theme = createTheme({
  typography: {
    "fontFamily": '"Montserrat", "sans-serif"',
    h3: {
      fontSize: '2rem',
      '@media (min-width: 680px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '1rem',
      '@media (min-width: 680px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2.5rem',
      },
    },
    h6: {
      fontSize: '1rem',
      '@media (min-width: 680px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2.5rem',
      },
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
    }
  }
});
const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent={'center'} alignItems={'center'}>
        <Grid xs={4} sm={6} md={5}>
          <Item >
            <Typography variant="h5" align="left" color="primary" fontStyle={'italic'}>
              Magic Post
            </Typography>
            <Typography variant="h3" fontWeight={700} align="left" color="primary">
              Nhanh chóng, <br />Chính xác,<br />An toàn, <br />Chuyên nghiệp.
            </Typography>
            <Typography variant='body2' align="left" color="primary">
              Kết nối con người, kết nối doanh nghiệp, tổ chức vì một Việt Nam phát triển bằng các giải pháp chuyển phát nhanh, thương mại điện tử, logistics trong nước và quốc tế.
            </Typography>
          </Item>
        </Grid>
        <Grid xs={4} sm={6} md={5}>
          <Item>
            <img src={headerPic} alt="headerPic" />
          </Item>
        </Grid>

      </Grid>

    </ThemeProvider>

  )
}

export default Header