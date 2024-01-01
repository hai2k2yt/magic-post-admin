
import React, { useState } from "react";
import { Badge, Notifications, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


const MainNavbar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleLogout = () => {
    //     localStorage.removeItem('role')
    // }
    const role = localStorage.getItem('role');
    return (
        <div class="navbar bg-primary text-neutral">
            <div class="flex-1">
                <svg class="flex w-10 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Box">
                    <path fill="#b6bbc4" fill-rule="evenodd"
                        d="M13.496 13.723v14.774s-8.093-3.463-11.484-4.91l-.01-.017V8.805l.01.019 11.474 4.91z"
                        class="colorfcd062 svgShape"></path>
                    <path fill="#acbaff" fill-rule="evenodd"
                        d="m24.98 8.804-.01.018-11.474 4.911v14.765l11.475-4.912.01-.018V8.804z"
                        class="colorf8aa3a svgShape"></path>
                    <path fill="#293573" fill-rule="evenodd"
                        d="M13.304 3.896 2 8.806v.012l11.497 4.933 11.503-4.945-11.384-4.91h-.31z"
                        class="colorf8b84e svgShape"></path>
                    <path fill="none" stroke="#344382" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width=".908" d="m21.194 22.104-2.868 1.227-2.869 1.228m2.869-3.191-2.869 1.227"
                        class="colorStroke1c4d7e svgStroke"></path>
                    <path fill="#f0ece5" fill-rule="evenodd"
                        d="m17.043 5.38-.07.025-11.42 4.938v6.935l2.027-1 2 3-.002-7.206L21 7.082z"
                        class="colore9eded svgShape"></path>
                    <path fill="#8794d8"
                        style={{
                            lineHeight: 'normal',
                            textIndent: 0,
                            textAlign: 'start',
                            textDecorationLine: 'none',
                            textDecorationStyle: 'solid',
                            textDecorationColor: '#000',
                            textTransform: 'none',
                            blockProgression: 'tb',
                            isolation: 'auto',
                            mixBlendMode: 'normal'
                        }}
                        d="M31.844 1935.863a5.508 5.508 0 0 0-5.5 5.5c0 3.032 2.468 5.5 5.5 5.5 3.031 0 5.5-2.468 5.5-5.5 0-3.031-2.469-5.5-5.5-5.5z"
                        color="#000" font-family="sans-serif" font-weight="400" overflow="visible"
                        transform="translate(-7.032 -1917.863)" class="colorf05542 svgShape"></path>
                    <g fill="#8794d8" class="colorf05542 svgShape">
                        <path fill="#f0ece5"
                            style={{
                                lineHeight: 'normal',
                                textIndent: 0,
                                textAlign: 'start',
                                textDecorationLine: 'none',
                                textDecorationStyle: 'solid',
                                textDecorationColor: '#000',
                                textTransform: 'none',
                                blockProgression: 'tb',
                                isolation: 'auto',
                                mixBlendMode: 'normal'
                            }}
                            d="M690.657 1174.862c.937 0 1.697.773 1.697 1.756 0 .329-.476 1.296-1.007 2.05-.345.49-.491.643-.692.883-.2-.24-.345-.394-.69-.882-.53-.755-1.007-1.722-1.007-2.051 0-.983.762-1.756 1.7-1.756z"
                            color="#000" font-family="sans-serif" font-weight="400" overflow="visible"
                            transform="translate(-665.844 -1153.862)" class="colore9eded svgShape"></path>
                        <path fill="#343a5f"
                            d="M690.657 1173.862c-1.491 0-2.699 1.247-2.699 2.756 0 .917.622 1.82 1.19 2.627a19.034 19.034 0 0 0 1.132 1.447.5.5 0 0 0 .752 0s.565-.641 1.133-1.447c.568-.806 1.19-1.71 1.19-2.627 0-1.51-1.206-2.756-2.698-2.756zm0 1c.937 0 1.697.773 1.697 1.756 0 .329-.476 1.296-1.007 2.05-.345.49-.491.643-.692.883-.2-.24-.345-.394-.69-.882-.53-.755-1.007-1.722-1.007-2.051 0-.983.762-1.756 1.7-1.756z"
                            color="#000" font-family="sans-serif" font-weight="400" overflow="visible"
                            style={{
                                lineHeight: 'normal',
                                textIndent: 0,
                                textAlign: 'start',
                                textDecorationLine: 'none',
                                textDecorationStyle: 'solid',
                                textDecorationColor: '#000',
                                textTransform: 'none',
                                blockProgression: 'tb',
                                isolation: 'auto',
                                mixBlendMode: 'normal'
                            }}
                            transform="translate(-665.844 -1153.862)" class="color34485c svgShape"></path>
                        <path fill="#343a5f"
                            d="M25.312 22.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5z"
                            class="color34485c svgShape"></path>
                    </g>
                </svg>
                <a class="btn btn-ghost text-xl" href="/home">Magic Post</a>
            </div>
            <div class="flex-none">
                {/*Menu for desktop*/}
                <ul class="menu lg:menu-horizontal md:menu-horizontal max-md:hidden px-1 items-center">
                    <li><a href="/home">Trang chủ</a></li>
                    <li><a href="/intro">Giới thiệu</a></li>
                    <li><a href="/order/view">Tra cứu bưu gửi</a></li>

                    {/* {role !== null
                            ? <div class="dropdown dropdown-end">

                                <div tabindex="0" role="button" class="mr-5 m-1 btn btn-ghost btn-circle avatar">
                                    <div class="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <ul tabindex="0" class="mr-3 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary text-base-100 rounded-lg w-52">
                                    <li>
                                        <a onClick={handleClickOpen} class="justify-between">
                                            Cá nhân
                                        </a>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            fullWidth={true}
                                        >
                                            <DialogContent>
                                                <Typography variant='h5' fontWeight={700} align='center'>
                                                    Thông tin cá nhân
                                                </Typography>
                                                <div class="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden  rounded-lg shadow-sm mx-auto">
                                                    <div class="relative h-40">
                                                        <img class="absolute h-full w-full object-cover" src="https://t4.ftcdn.net/jpg/05/31/79/83/360_F_531798391_XFz7gyPmDRTAfiEE5sRjFu5NpKrJt4rC.jpg" />
                                                    </div>
                                                    <div class="relative shadow mx-auto h-24 w-24 -my-12 rounded-full overflow-hidden border-2">
                                                        <img class="object-cover w-full h-full" src="https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg" />
                                                    </div>
                                                    <div class="mt-16 ">
                                                        <h3 class=" text-center text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                            Nguyễn Văn A
                                                        </h3>
                                                        <div class=" text-center text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                            <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                            Trưởng điểm giao dịch Dịch Vọng Hậu, Cầu Giấy
                                                        </div>
                                                    </div>
                                                    <div class="divider divider-primary w-1/2 mx-auto"></div>
                                                    <div class="text-center mb-2 text-blueGray-600 ">
                                                        <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                                        Số điện thoại: 0123456789
                                                    </div>
                                                    <div class="text-center mb-2 text-blueGray-600">
                                                        <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                                        Email: vanaaa@gmail.com
                                                    </div>
                                                </div>

                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Đóng</Button>

                                            </DialogActions>
                                        </Dialog>
                                    </li>
                                    <li><a href="/home" onClick={handleLogout}>Đăng xuất</a></li>

                                </ul>
                            </div>
                            : <div>
                                <a class="btn btn-neutral" href="/login">Đăng nhập</a>
                            </div>
                        } */}
                    <li><div><a class="btn btn-neutral" href="/login">Đăng nhập</a></div></li>

                </ul>
            </div>
            {/*Menu for tablet & phone*/}
            <div class="dropdown dropdown-end md:hidden">
                <div tabindex="0" role="button" class="btn btn-circle btn-ghost btn-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 510 511" id="Menu"><path fill="#ffffff" fill-rule="evenodd" d="M256 368.5C193.868 368.5 143.5 318.132 143.5 256C143.5 193.868 193.868 143.5 256 143.5C318.132 143.5 368.5 193.868 368.5 256C368.5 318.132 318.132 368.5 256 368.5ZM256 156C200.772 156 156 200.772 156 256C156 311.228 200.772 356 256 356C311.228 356 356 311.228 356 256C356 200.772 311.228 156 256 156Z" clip-rule="evenodd" class="color000000 svgShape"></path><path fill="#ffffff" d="M206.5 268C199.596 268 194 262.404 194 255.5 194 248.596 199.596 243 206.5 243 213.404 243 219 248.596 219 255.5 219 262.404 213.404 268 206.5 268zM256.5 268C249.596 268 244 262.404 244 255.5 244 248.596 249.596 243 256.5 243 263.404 243 269 248.596 269 255.5 269 262.404 263.404 268 256.5 268zM306.5 268C299.596 268 294 262.404 294 255.5 294 248.596 299.596 243 306.5 243 313.404 243 319 248.596 319 255.5 319 262.404 313.404 268 306.5 268z" class="color000000 svgShape"></path></svg>
                </div>
                <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-primary rounded-box w-52 mt-4">
                    
                    <li><a href="/home">Trang chủ</a></li>
                    <li><a href="/intro">Giới thiệu</a></li>
                    <li><a href="/order/view">Tra cứu bưu gửi</a></li>
                    <li><a hred="/login">Đăng nhập</a></li>



                </ul>
            </div>



        </div >
    );
}

export default MainNavbar;