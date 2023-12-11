import React from 'react'
import Navbar from '../component/layout/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
{/*Trang chủ cho trưởng điểm giao dịch*/ }
const TransactionLeaderHome = () => {
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
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Navbar />
    </div>
    <div>
      
    </div>
    </ThemeProvider>
  )
}

export default TransactionLeaderHome