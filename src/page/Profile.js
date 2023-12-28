import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../component/layout/Navbar';
const Profile = () => {
    return (
        <div>
                    <section class="pt-16 bg-blueGray-50">
                        <div class="w-full lg:w-6/12 px-4 mx-auto">
                            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                                <div class="px-6">
                                    <div class="flex flex-wrap justify-center">
                                        <div class="w-5/12 px-4 flex justify-center">
                                            <img src='https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg' />
                                        </div>
                                    </div>
                                    <div class="text-center my-12">
                                        <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                            Nguyễn Văn A
                                        </h3>
                                        <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                            Trưởng điểm giao dịch Dịch Vọng Hậu, Cầu Giấy
                                        </div>
                                        <div class="mb-2 text-blueGray-600 mt-10">
                                            <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                            Số điện thoại: 0123456789
                                        </div>
                                        <div class="mb-2 text-blueGray-600">
                                            <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                            Email: vanaaa@gmail.com
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                
    )
}

export default Profile