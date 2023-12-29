import { createTheme } from '@mui/material/styles';
import { TextField, Button, Paper, Typography, ThemeProvider, Grid } from '@mui/material';
import { login } from '../../api/auth';
import { useState } from 'react';
import MainNavbar from '../../component/layout/MainNavbar';
import { jwtDecode } from "jwt-decode";
import ROLES from './Role';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const validateEmail = (value) => {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (regex.test(value) || value === '') {
            setEmail(value);
            setEmailErr('');
           
        } else {
            setEmailErr('Vui lòng nhập đúng định dạng');
           
        }

    }
    const handleLogin = async (e) => {
        if (localStorage.getItem('role') !== null) {
            localStorage.removeItem('role');
        } 
        if (localStorage.getItem('name') !== null) {
            localStorage.removeItem('name'); 
        }

        if (localStorage.getItem('mail') !== null) {
            localStorage.removeItem('mail');
        } 
        if (localStorage.getItem('phone') !== null) {
            localStorage.removeItem('phone'); 
        }
        if (emailErr === '' && errorMsg === '') {
            try {
                
                e.preventDefault();
                const res = await login({ email, password });
                console.log(res);
                // save token into localStorage
                // localStorage.setItem('token', res.accessToken);
                // get role
                const uName = res.username;
                const token = res.accessToken;
                window.localStorage.setItem('accessToken', token);
                const decoded = jwtDecode(token);

                const role = decoded.scope;
                const mail = decoded.email;
                const phoneNum = decoded.phone;
                const pointID = decoded.pointId;
                // console.log(role, 0);
                // console.log(mail, 1);
                // console.log(phoneNum, 2);
                // console.log(pointID);
                localStorage.setItem('email', mail);
                localStorage.setItem('name', uName);
                localStorage.setItem('phone', phoneNum);
                localStorage.setItem('pointId', pointID);


                // console.log(role);
                // save role into localStorage 
                localStorage.setItem('role', role);
                switch (role) {
                    case roles[0]:
                        navigate('/dashboard');
                        break;
                    case roles[1]:
                        navigate('/dashboard');
                        break;
                    case roles[2]:
                        navigate('/dashboard');
                        break;
                    case roles[3]:
                        navigate(`/gathering/order/arrival`);
                        break;
                    default:
                        navigate(`/order/transaction/arrival`);
                        break;
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    // handle error: resource not found
                    console.log(err.response);
                    setErrorMsg(err.response.data.message);
                    console.log(errorMsg);
                } else {
                    // handle other errors
                    console.log(err);
                }
            }
        }

    };

    return (
        <ThemeProvider theme={theme} >
            <MainNavbar />
            <div class="max-h-screen">
                <Grid container spacing={6} alignItems={'center'} justifyContent={'center'}>
                    <Grid item sm={5} style={{ marginTop: '50px' }} >
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 2000 2000"
                            id="DeliveryLocation">
                            <g data-name="Layer 5" fill="#424c9f" class="color000000 svgShape">
                                <path fill="#e4eaff"
                                    d="M258.39,1678.41s-301.33-352.15,127.14-465.29S926.9,1003.17,1129.46,710s1074.09-214.76,719.58,982Z"
                                    class="colore2eefc svgShape"></path>
                                <path fill="#e4eaff"
                                    d="M377.24,989.35c280.88,6.78,560.07-147.65,703.59-389.18,27.71-46.64,16.68-112.59-24.7-147.67s-108.25-35.17-149.72-.19c-68.65,57.89-159.68,80.71-248,96.79s-179.46,27.76-259.33,68.8S251.24,737.6,252.49,827.39,346.54,988.61,377.24,989.35Z"
                                    class="colore2eefc svgShape"></path>
                                <rect width="328" height="393.49" x="1492.39" y="1272.53" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="81" height="15" x="1512.97" y="1293.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1610.97" y="1293.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1706.97" y="1293.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1513.97" y="1320.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1611.97" y="1320.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1707.97" y="1320.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1513.97" y="1347.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1611.97" y="1347.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1707.97" y="1347.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1514.97" y="1374.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1612.97" y="1374.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1708.97" y="1374.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1515.97" y="1401.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1613.97" y="1401.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1709.97" y="1401.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1515.97" y="1428.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1613.97" y="1428.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="81" height="15" x="1709.97" y="1428.13" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="275" height="100" x="1515.97" y="1469.28" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="102" height="482.15" x="1725.74" y="1183.88" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="30" height="438" x="1818.1" y="1228.02" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="158" height="254" x="343.3" y="1413.03" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="117.5" height="23" x="359.87" y="1438.12" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="117.5" height="23" x="359.87" y="1476.53" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="117.5" height="23" x="359.93" y="1514.94" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="117.5" height="23" x="359.93" y="1552.58" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="158" height="335" x="458.4" y="1332.03" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="353.11" height="269" x="601.4" y="1398.03" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="88" height="149" x="255.3" y="1518.03" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="3" height="126.14" x="660.04" y="1271.89" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="3" height="97.1" x="693.72" y="1300.93" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="7" height="146.27" x="629.45" y="1251.76" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="29" height="36.41" x="361.86" y="1376.62" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="63" height="39.34" x="470.41" y="1292.69" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="27" height="80.27" x="561.51" y="1251.76" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="24" height="88.14" x="406.68" y="1324.9" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="23.5" height="23.5" x="266.3" y="1532.53" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="23.5" height="23.5" x="304.8" y="1532.53" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="23.5" height="23.5" x="266.3" y="1572.03" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="23.5" height="23.5" x="304.8" y="1572.03" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="23.5" height="23.5" x="266.3" y="1611.53" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="23.5" height="23.5" x="304.8" y="1611.53" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="9" height="303" x="477.43" y="1353.32" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="9" height="303" x="517.43" y="1353.32" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="9" height="303" x="553.44" y="1353.32" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="9" height="303" x="591.44" y="1353.32" fill="#e4eaff"
                                    class="colore2eefc svgShape"></rect>
                                <rect width="162" height="123.31" x="1330.39" y="1543.57" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <rect width="6" height="6" x="1638.43" y="1635.76" fill="#7c8cec"
                                    class="colorccdeff svgShape"></rect>
                                <path fill="#444d7b"
                                    d="M832.33,806.72A387.52,387.52,0,0,1,687.57,920c3.91,12.51,17.45,20.14,30.55,20.73s25.77-4.49,37.46-10.43,23-12.89,35.62-16.51a70.18,70.18,0,0,0,45.56-42.07C844.29,851.66,841.78,828.09,832.33,806.72Z"
                                    class="colore44531 svgShape"></path>
                                <path fill="#ead6be"
                                    d="M896.18,723.15c-7.31,8.44-3.22,26.45,7.11,26.93-15.06-1-39.73,9.49-53.52,19.19a15.76,15.76,0,0,0,5.15-16.64,12.81,12.81,0,0,0-1.56-3.43,14.72,14.72,0,0,0-8-5.89,15.59,15.59,0,0,0-11.13.62,90.11,90.11,0,0,0,12.15-8.06,93.73,93.73,0,0,0,22.79-26c4-2,8.3-3.7,12.79-4a18.33,18.33,0,0,1,3.77.18,13.89,13.89,0,0,1,8.42,4.34C897.11,713.79,898.9,720,896.18,723.15Z"
                                    class="colorfbb8a5 svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M751.53,1656.62l-118.6-15.39a136.3,136.3,0,0,1,3.41-18.64q10.74-2.89,21.3-6.45a17.29,17.29,0,0,0,2.49,7.32c2.21,3.3,6.9,5.3,10.28,3.24-.51-4.85-1-9.68-1.51-14.54,1.46-.53,2.89-1.08,4.35-1.65,0,.75,0,1.5,0,2.24-.12,2.75-.35,5.55.38,8.21s2.67,5.17,5.38,5.71,5.84-1.77,5.45-4.49q-1.06-7.64-2.16-15.28c1.51-.62,3-1.26,4.48-1.9q1.26,9.32,2.5,18.66c3.11,2,7.47-.84,8.45-4.4a13.66,13.66,0,0,0-.38-7.24c-.32-1.21-.73-2.41-1.11-3.58-.05-.17-.12-.35-.17-.52a23.2,23.2,0,0,1-1.32-6.51h0c1.3-.59,2.59-1.2,3.87-1.82.24.35.5.69.76,1a44.29,44.29,0,0,0,51.93,14.26c1.21-.5,2.41-1,3.56-1.64C753.81,1627.28,752.78,1641.35,751.53,1656.62Z"
                                    class="colorf75c3d svgShape"></path>
                                <path
                                    d="M750.76,1665.66c-39.49-6-79-11.91-118.75-17.1.29-2.45.6-4.91.92-7.33q59.31,7.71,118.6,15.39Q751.16,1661.06,750.76,1665.66Z"
                                    fill="#424c9f" class="color000000 svgShape"></path>
                                <path fill="#ffffff"
                                    d="M689.24 1623.65q-1.25-9.33-2.5-18.66c2.66-1.17 5.32-2.36 8-3.59a23.2 23.2 0 001.32 6.51c0 .17.12.35.17.52.38 1.17.79 2.37 1.11 3.58a13.66 13.66 0 01.38 7.24C696.71 1622.81 692.36 1625.66 689.24 1623.65zM679 1626.66c-2.71-.53-4.64-3.06-5.38-5.71s-.5-5.46-.38-8.21c0-.74 0-1.49 0-2.24 3-1.15 6-2.37 9-3.62q1.1 7.63 2.16 15.28C684.81 1624.89 681.67 1627.18 679 1626.66zM670.41 1626.7c-3.38 2.07-8.07.06-10.28-3.24a17.15 17.15 0 01-2.49-7.32q5.65-1.89 11.26-4Q669.65 1619.44 670.41 1626.7z"
                                    class="colorffffff svgShape"></path>
                                <path fill="#ead6be"
                                    d="M751.27,1614.86a44.29,44.29,0,0,1-51.93-14.26,100.65,100.65,0,0,0,7.49-36.81c18.85,5.17,37.69,10.32,55.85,15.16Q757,1596.89,751.27,1614.86Z"
                                    class="colorfbb8a5 svgShape"></path>
                                <path fill="#323275"
                                    d="M884.33,707.76c7.75,3.68,11.39,14.16,7.58,21.85,2.34-2.79-.95.75.57,4,4-11.1,16.47-25,20.46-36.12a30.9,30.9,0,0,0-46.48-36c-10.7,7.29-39.79-3.7-36.17,8.72,1.11,3.81,18.46,34.23,22.43,34.29s19-4.23,22.94-3.7S883.72,704.43,884.33,707.76Z"
                                    class="color38385c svgShape"></path>
                                <path fill="#344382"
                                    d="M874.15,716a72.22,72.22,0,0,1-19.23,36.68,12.81,12.81,0,0,0-1.56-3.43,14.72,14.72,0,0,0-8-5.89,67.33,67.33,0,0,1-11.08,2.41c-.18-.51-.37-1-.55-1.52h0c-.17-.48-.35-1-.52-1.43,4.5-2.17,8.91-4.48,13.18-6.88a239.33,239.33,0,0,0,24.92-16c.78-.57,1.53-1.13,2.27-1.7C873.74,717.43,874,716.69,874.15,716Z"
                                    class="colorf8856c svgShape"></path>
                                <path fill="#7d8ef3"
                                    d="M885.82,705.94l-.11.13c-3.38,4-7.9,6.76-12.55,9.08-.38,1.29-1.15,2.94-1.89,4.72a23.76,23.76,0,0,0-1.69,5.53c-3.36,9.25-9.64,11.71-18.59,15.67-2.2,1-4,1.67-5.66,2.24a67.33,67.33,0,0,1-11.08,2.41c-2.43.37-5.33.82-9,1.45-12.58-23.17-14.61-53.91-1.47-77.58,5-9,20-13.15,32.41-10.48a91.37,91.37,0,0,1-25.85,11.18,25.22,25.22,0,0,1,23.22,33.49c1.84-3,10.91-1.87,13.53-4.54,2.85-2.89.71-3.23,2.11-6.57.38-4,5.8-12.23,11-11.73s9.45,5.25,10.3,10.44S889.21,701.93,885.82,705.94Z"
                                    class="colorfbb6a6 svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M918.4,690.31c-15.66-16.21-38.24-23.43-60.36-21.93H858l-1.89.16c-24.14,10.06-53.68,7.13-75.38-7.87,12.74-.75,27.17-2.17,41.61-3.57,4.24-3,8.32-6,12.42-9a59.45,59.45,0,0,1,9-21.94c25.87-7.43,55.74,1.9,72.78,22.73A109.21,109.21,0,0,1,918.4,690.31Z"
                                    class="colorf75c3d svgShape"></path>
                                <path fill="#444d7b"
                                    d="M858,668.39l-1.89.16c-24.14,10.06-53.68,7.13-75.38-7.87,12.74-.75,27.17-2.17,41.61-3.57C833.38,669.45,842.91,669,858,668.39Z"
                                    class="colore44531 svgShape"></path>
                                <path fill="#344382"
                                    d="M705.16,987.12l22.18,0s4.5,3.36-4.33,3.36A63.85,63.85,0,0,1,708.46,989Z"
                                    class="colorf8856c svgShape"></path>
                                <ellipse cx="825.28" cy="692.33" fill="#323275" rx="3.01" ry="7.62"
                                    class="color38385c svgShape"></ellipse>
                                <path fill="#7785d6"
                                    d="M821.05,720.76a32.58,32.58,0,0,0,25.43-14.53,16.62,16.62,0,0,1-8.5,15.62C832.45,724.82,825.19,724.17,821.05,720.76Z"
                                    class="colorfefefe svgShape"></path>
                                <path fill="#323275"
                                    d="M824.92,679.17a11,11,0,0,1,17.28,8.34A27.58,27.58,0,0,0,824.92,679.17Z"
                                    class="color38385c svgShape"></path>
                                <path fill="#344382"
                                    d="M876.31,689.23a4.54,4.54,0,0,1,8.26-.24,11.83,11.83,0,0,1-6,16.1,18.19,18.19,0,0,0,4.49-6,8.46,8.46,0,0,0-.14-7.29A5.56,5.56,0,0,0,876.31,689.23Z"
                                    class="colorf8856c svgShape"></path>
                                <rect width="319.93" height="180.44" x="458.4" y="806.72" fill="#f0ece5"
                                    class="colorfebe3d svgShape"></rect>
                                <rect width="319.93" height="12.29" x="458.4" y="974.88" fill="#ffffff"
                                    class="colorec7f37 svgShape"></rect>
                                <polygon fill="#ffffff"
                                    points="778.33 978.2 778.33 806.72 793.69 815.04 793.69 978.2 778.33 978.2"
                                    class="colorec7f37 svgShape"></polygon>
                                <path fill="#ead6be"
                                    d="M755.56,960.1a66.9,66.9,0,0,0-43.09,17.21c3,2.94,7.94,3.21,11.92,1.79s7.29-4.26,10.49-7a19.38,19.38,0,0,1-11,15.82c-6.1,2.83-12.5,1.3-19.15-.73,6.7,5.65,15.57,7.05,24.32,7.6s17.49-.78,26.16-2.09C755.38,981.51,755.51,970.36,755.56,960.1Z"
                                    class="colorfbb8a5 svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M952.23,1044.07a622.74,622.74,0,0,1-110,7.81q-22.19-.36-44.32-2.35,3-41.12,6-82.23c48.22-4.37,90-47.18,93.22-95.49,2-30.15,22.1-47.23,52-57,0,2.14,0,4.27.07,6.38C950,898.65,951.39,967.32,952.23,1044.07Z"
                                    class="colorf75c3d svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M1000.79 1034.27q-24.06 5.87-48.56 9.8a622.74 622.74 0 01-110 7.81c22.69-81.31 58.06-159.25 107-230.65q6.06-8.87 12.41-17.59A842.91 842.91 0 011000.79 1034.27zM832.63 787.22a399.83 399.83 0 00-25 170.13C864.28 919.26 901.22 853.27 904 785c.44-10.57-8.54-20-18.86-22.37s-21.27 1.24-30 7.29S839.7 784.28 832.63 787.22z"
                                    class="colorf75c3d svgShape"></path>
                                <path fill="#444d7b"
                                    d="M899.62,750.22c8.33-2.59,53.64,31.12,61,50.25-16.3.24-52.57.1-66.93,7.8,6.1-17.56-3.39-39-20.48-46.35C882.72,757.52,892.2,753.11,899.62,750.22Z"
                                    class="colore44531 svgShape"></path>
                                <path fill="#444d7b"
                                    d="M750.65,958.45a199,199,0,0,0,80.47-28.21c13-8.07,21.32-22.17,26-36.78s6.16-30,8.74-45.11,6.41-30.41,15-43.08,23.31-18.42,38.22-22c19.83-4.78,49.58,16.44,45.69,30.6-28.57,104.13-29.11,106-55.13,146.48-3.28,5.1-8.74,7.84-14.37,10.1-90.35,36.23-121.73,28.07-125,27C766.37,986.15,755.37,968.49,750.65,958.45Z"
                                    class="colore44531 svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M743.9,960.38c5.17,13.12,8.07,27,13.23,40.14-.74.26.78-.25,0,0L773,1000l-11.82-36.49a9.2,9.2,0,0,0-7.55-6.13C750.18,957,746.59,958.74,743.9,960.38Z"
                                    class="colorf75c3d svgShape"></path>
                                <path fill="#3e3e52"
                                    d="M900.73,738.92l-73.34,34.85q.45,11.72.89,23.42l78.36-46.27C904.55,747,902.46,743,900.73,738.92Z"
                                    class="color463e52 svgShape"></path>
                                <path fill="#ffd7a8"
                                    d="M833.71,744.19c.17-.1.33-.17.5-.26a3.06,3.06,0,0,1-.5.27c-.34.21-.67.38-1,.57A9.12,9.12,0,0,1,833.71,744.19Z"
                                    class="colorffa8a8 svgShape"></path>
                                <polygon fill="#1a1a35"
                                    points="824.46 1072.16 641.75 1570.87 785.67 1584.01 887.66 1383.15 955.24 1077.79 824.46 1072.16"
                                    class="color1a1a35 svgShape"></polygon>
                                <path fill="#323275"
                                    d="M934.81,1587l198-879.38a33.14,33.14,0,0,1,31.3-25.85l424-13.26a33.08,33.08,0,0,1,33.45,40.05l-4.39,20.6L1431.36,1600a33.15,33.15,0,0,1-32.32,26.23l-431.8,1.25a33.21,33.21,0,0,1-32.82-27.71h0A33.44,33.44,0,0,1,934.81,1587Zm502.9-904.46-125.85,3.54a6,6,0,0,0-5.78,6.11c0,.08,0,.16,0,.24a6,6,0,0,0,6.11,5.55l125.85-3.54a6,6,0,1,0-.34-11.9ZM995,1571.07l392.13-1.14a30.1,30.1,0,0,0,29.35-23.82l172.7-809.49a30.12,30.12,0,0,0-19.82-34.82h0a29.82,29.82,0,0,0-10.55-1.54l-385,12a30.1,30.1,0,0,0-28.42,23.48l-29.71,132-.18.77L965.52,1534.36A30.1,30.1,0,0,0,995,1571.07Z"
                                    class="color38385c svgShape"></path>
                                <path fill="#1a1a35"
                                    d="M941.43,1652.64a18.46,18.46,0,0,0,2.06,2.51l0,0a34.47,34.47,0,0,0,27.74,13.45l449-2.18c16.22-.08,30.24-11.12,33.66-26.53L1647.37,768.6l6.23-28.08a33.17,33.17,0,0,0,.79-7h0c-2.2-7.29-11.12-19.48-19.85-30.25-9.58-11.82-18.93-21.92-18.93-21.92l-.09.31a32.9,32.9,0,0,1,6,26.94l-4.39,20.6L1431.36,1600a33.15,33.15,0,0,1-32.32,26.23l-431.8,1.25a33.21,33.21,0,0,1-32.82-27.71h0S931.91,1639,941.43,1652.64Z"
                                    class="color1a1a35 svgShape"></path>
                                <path fill="#e4eaff"
                                    d="M995,1571.07l392.13-1.14a30.1,30.1,0,0,0,29.35-23.82l172.7-809.49a30.12,30.12,0,0,0-19.82-34.82h0a29.82,29.82,0,0,0-10.55-1.54l-385,12a30.1,30.1,0,0,0-28.42,23.48l-29.71,132-.18.77L965.52,1534.36A30.1,30.1,0,0,0,995,1571.07Z"
                                    class="colore2eefc svgShape"></path>
                                <g opacity=".64" fill="#424c9f" class="color000000 svgShape">
                                    <polygon fill="#ffffff"
                                        points="1394.75 705.39 1559.44 875.93 1567.25 839.29 1436.68 704.07 1394.75 705.39"
                                        class="colorffffff svgShape"></polygon>
                                    <polygon fill="#ffffff"
                                        points="1259.67 709.61 1534.26 993.97 1553.97 901.57 1365.41 706.3 1259.67 709.61"
                                        class="colorffffff svgShape"></polygon>
                                    <polygon fill="#ffffff"
                                        points="1064.48 1094.8 1431.63 1475.02 1458.34 1349.81 1092.39 970.83 1064.48 1094.8"
                                        class="colorffffff svgShape"></polygon>
                                    <path fill="#ffffff"
                                        d="M1040.54,1201.16l354.92,367.56a30.08,30.08,0,0,0,21-22.61l.07-.32L1048.7,1164.87Z"
                                        class="colorffffff svgShape"></path>
                                    <polygon fill="#ffffff"
                                        points="1009.33 1339.79 1232 1570.39 1379.21 1569.96 1037.24 1215.81 1009.33 1339.79"
                                        class="colorffffff svgShape"></polygon>
                                    <polygon fill="#ffffff"
                                        points="1259.67 709.61 1534.26 993.97 1553.97 901.57 1365.41 706.3 1259.67 709.61"
                                        class="colorffffff svgShape"></polygon>
                                    <polygon fill="#ffffff"
                                        points="1394.75 705.39 1559.44 875.93 1567.25 839.29 1436.68 704.07 1394.75 705.39"
                                        class="colorffffff svgShape"></polygon>
                                    <path fill="#ffffff"
                                        d="M1040.54,1201.16l354.92,367.56a30.08,30.08,0,0,0,21-22.61l.07-.32L1048.7,1164.87Z"
                                        class="colorffffff svgShape"></path>
                                    <polygon fill="#ffffff"
                                        points="1009.33 1339.79 1232 1570.39 1379.21 1569.96 1037.24 1215.81 1009.33 1339.79"
                                        class="colorffffff svgShape"></polygon>
                                    <polygon fill="#ffffff"
                                        points="1064.48 1094.8 1431.63 1475.02 1458.34 1349.81 1092.39 970.83 1064.48 1094.8"
                                        class="colorffffff svgShape"></polygon>
                                </g>
                                <path fill="#ffffff"
                                    d="M1306.09,692.46a6,6,0,0,0,6.11,5.55l125.85-3.54a6,6,0,1,0-.34-11.9l-125.85,3.54a6,6,0,0,0-5.78,6.11A1.85,1.85,0,0,0,1306.09,692.46Z"
                                    class="colorffffff svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M1157.22,1285.14q21.77,55.68,43.57,111.37a136.19,136.19,0,0,1-18,6q-7.71-8-15.9-15.57a17.26,17.26,0,0,0,5.22-5.71c1.83-3.53,1.33-8.6-2.11-10.57q-6,4.17-12,8.32c-1.17-1-2.34-2-3.54-3,.65-.38,1.32-.71,2-1,2.47-1.21,5-2.37,7-4.28s3.25-4.83,2.41-7.46-4.36-4.27-6.56-2.61q-6.18,4.61-12.35,9.25c-1.27-1-2.54-2-3.82-3l15.16-11.17c.27-3.7-4.33-6.15-7.92-5.29a13.61,13.61,0,0,0-6.16,3.82c-.9.87-1.76,1.8-2.6,2.7-.13.13-.25.27-.37.4a23.15,23.15,0,0,1-5.07,4.29h0c-1.14-.85-2.3-1.69-3.45-2.52.19-.38.36-.77.53-1.16a44.28,44.28,0,0,0-12.48-52.38c-1-.82-2.07-1.61-3.15-2.34C1130.41,1297.26,1143.23,1291.4,1157.22,1285.14Z"
                                    class="colorf75c3d svgShape"></path>
                                <path
                                    d="M1165.52,1281.47c13.78,37.48,27.56,75,42.14,112.33-2.29.92-4.6,1.84-6.87,2.72q-21.78-55.71-43.57-111.37C1159.94,1283.94,1162.7,1282.71,1165.52,1281.47Z"
                                    fill="#424c9f" class="color000000 svgShape"></path>
                                <path fill="#ffffff"
                                    d="M1158.28 1355.61l-15.16 11.17c-2.3-1.77-4.63-3.53-7-5.25a23.43 23.43 0 005.07-4.29c.13-.13.25-.27.37-.4.84-.9 1.7-1.83 2.6-2.7a13.69 13.69 0 016.16-3.82C1154 1349.46 1158.55 1351.91 1158.28 1355.61zM1165.86 1363.16c.83 2.63-.45 5.54-2.41 7.46s-4.54 3.07-7 4.28c-.66.34-1.33.67-2 1q-3.69-3.14-7.51-6.16c4.11-3.09 8.24-6.18 12.35-9.25C1161.5 1358.9 1165 1360.55 1165.86 1363.16zM1170 1370.65c3.44 2 3.93 7 2.11 10.57a17.26 17.26 0 01-5.22 5.71q-4.38-4-8.91-8z"
                                    class="colorffffff svgShape"></path>
                                <path fill="#ead6be"
                                    d="M1120.74,1305.46a44.28,44.28,0,0,1,12.48,52.38,100.84,100.84,0,0,0-35.88,11.14c-4.54-19-9.09-38-13.58-56.25Z"
                                    class="colorfbb8a5 svgShape"></path>
                                <path fill="#323275"
                                    d="M862.63,1090.34S715.16,1336.4,814.2,1410.85,1117.11,1386,1117.11,1386l-34.9-89.29s-170,68-147.82-15,53.82-205.1,53.82-205.1Z"
                                    class="color38385c svgShape"></path>
                                <path fill="#444d7b"
                                    d="M1000.7,1085.54a340,340,0,0,1-48,6.52A339.22,339.22,0,0,1,795,1088.6q1.13-15.4,2.27-30.82.3-4.12.61-8.25,22.11,2,44.32,2.35a622.74,622.74,0,0,0,110-7.81q24.46-3.93,48.56-9.8Q1001.53,1059.9,1000.7,1085.54Z"
                                    class="colore44531 svgShape"></path>
                                <path fill="#7d8ef3"
                                    d="M817.36,686.14c.9,6.66-6,13.37-14.69,14.34,8.5,4.17,14.33,11.34,15.44,19C820.59,708.92,821,698.1,817.36,686.14Z"
                                    class="colorfbb6a6 svgShape"></path>
                                <path fill="#323275"
                                    d="M884.48,707a80.56,80.56,0,0,1,7.65,25.18L910.2,702.8C901.7,704.27,893.19,705.74,884.48,707Z"
                                    class="color38385c svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M822.27,657.29A53.11,53.11,0,0,1,844.9,625.7a55.27,55.27,0,0,1-2.79,23.59c-1.24,3.57-5.37,5.23-9.12,5.73S825.27,655.32,822.27,657.29Z"
                                    class="colorf75c3d svgShape"></path>
                                <path fill="none" stroke="#f0ece5" stroke-dasharray="6 3 6 3 6 3" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M815.28 1420.58l-63.14 135M1070.28 1609.75l-.27.55M900.44 1110.82c-18.57 28.65-37.3 57.62-48.81 89.76s-15.33 68.21-3.66 100.3 41 58.88 75 61.17c67.67 4.56 100.34 6.76 163.34-18.36"
                                    class="colorStrokef2f2f2 svgStroke"></path>
                                <path fill="#e4eaff"
                                    d="M1427.2 517.81l-24.84-8c10-29.64 53.92-40.47 76.5-18.84-11.85-14.18-2-39.93 16.29-42.59s35 19.25 27.71 36.21c14.15-16.31 44.75-12.51 54.47 6.77 11.67-14.46 37.21-14 48.37.84A281.92 281.92 0 011782 507.48L1338.72 529C1370.63 523.16 1402.56 517.32 1427.2 517.81zM665.23 359.58l24.29-9.52c-11.8-29-56.36-37-77.53-14 10.93-14.9-.52-40-18.94-41.47S559.29 316 567.67 332.49c-15.15-15.39-45.45-9.66-53.94 10.19-12.56-13.7-38-11.65-48.22 3.88a281.8 281.8 0 00-155 25.08l443.74-6.45C722 361.36 689.79 357.54 665.23 359.58z"
                                    class="colore2eefc svgShape"></path>
                                <path fill="#1a1a35"
                                    d="M133.46,1697h0a30,30,0,0,1,30-30H1861.39a30,30,0,0,1,30,30h0a30,30,0,0,1-30,30H163.46A30,30,0,0,1,133.46,1697Z"
                                    class="color1a1a35 svgShape"></path>
                                <path fill="#b6bbc4"
                                    d="M175,580.82c0-56,44.19-101.34,98.71-101.34s98.71,45.37,98.71,101.34S277.75,739.2,277.75,739.2,175,636.79,175,580.82Z"
                                    class="colorf75c3d svgShape"></path>
                                <circle cx="273.72" cy="580.93" r="53.49" fill="#1a1a35" class="color1a1a35 svgShape"></circle>
                                <polyline fill="none" stroke="#f75c3d" stroke-miterlimit="10" stroke-width="8"
                                    points="277.75 739.2 516.62 710.87 685.89 458.23 1056.41 510.03 1157.9 923.06 1422.08 989.65 1294.45 1204.19"></polyline>
                                <circle cx="1285.75" cy="1222.76" r="34.5" fill="#b6bbc4" class="colorf75c3d svgShape"></circle>
                                <circle cx="1285.75" cy="1222.76" r="19.95" fill="#fafcff"
                                    transform="rotate(-45 1285.746 1222.766)" class="colorf5f9fe svgShape"></circle>
                                <path fill="#e4eaff"
                                    d="M112.58,1096.82c-5.41-16.74,6.14-36.88,23.33-40.66s36.12,9.67,38.23,27.13c13.1-23.88,53.35-24.9,67.65-1.71a629.28,629.28,0,0,1,211.48,16l-386.17,6C86.1,1098.31,105.12,1093,112.58,1096.82Z"
                                    class="colore2eefc svgShape"></path>
                            </g>
                        </svg>
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        {errorMsg !== '' ? (
                            <div role="alert" class="alert alert-error mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>Không tìm thấy người dùng!</span>
                            </div>
                        ) : (
                            <></>
                        )}
                        <Paper elevation={3}
                            fullWidth style={{ padding: '20px', position: 'sticky' }}>
                            <Typography variant="h5" fontWeight={700} >Đăng nhập</Typography>
                            <TextField
                                label="Email"
                                id='email'
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                onChange={(e) => {
                                    setErrorMsg('');
                                    validateEmail(e.target.value)
                                }}
                            />
                            {
                                emailErr && <p className="mt-2 text-warning text-xs italic">{emailErr}</p>
                            }
                            <TextField
                                required
                                label="Mật khẩu"
                                id='password'
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setErrorMsg('');
                                    setPassword(e.target.value)
                                }}
                            />
                            <Button variant="contained" sx={{ marginTop: '20px' }} color="secondary" fullWidth onClick={e => handleLogin(e)}>
                                Đăng nhập
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        </ThemeProvider >
    );
};

export default Login;