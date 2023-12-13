
import React, { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Notifications } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
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
            <div class=" flex-none dropdown dropdown-end">

                <div tabIndex={1} class="mr-3 m-1 btn btn-ghost btn-circle">

                    <Badge badgeContent={10} color="warning">
                        <NotificationsIcon />
                    </Badge>

                </div>
                <ul tabIndex={1} class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary text-base-100 rounded-lg w-52">
                    <li>Notification 1</li>
                </ul>
            </div>
            <div class="dropdown dropdown-end">

                <div tabindex="0" role="button" class="mr-5 m-1 btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabindex="0" class="mr-3 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary text-base-100 rounded-lg w-52">
                    <li>
                        <a href="/profile" class="justify-between">
                            Trang cá nhân
                        </a>
                    </li>
                    <li><a href="/home">Đăng xuất</a></li>
                </ul>
            </div>
            {/*Menu for each roles*/}
            <button class="lg:hidden mr-5">
                <MenuIcon />
            </button>
        </div>

    );
}

export default Navbar;