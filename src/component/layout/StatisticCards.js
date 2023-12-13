import React from 'react'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const StatisticCards = () => {
    return (
        <>
            
            <div class="stats m-20 shadow bg-primary text-neutral">
                <div class="stat">
                    <div class="stat-figure">
                        <LocalShippingIcon />
                    </div>
                    <div class="stat-title">Hàng gửi</div>
                    <div class="stat-value">31K</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div class="stat">
                    <div class="stat-figure">
                        <AllInboxIcon />
                    </div>
                    <div class="stat-title">Hàng nhận</div>
                    <div class="stat-value">4,200</div>
                    <div class="stat-desc">↗︎ 400 (22%)</div>
                </div> 

            </div>
        </>
    )
}

export default StatisticCards