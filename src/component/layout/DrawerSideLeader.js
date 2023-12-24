import React from 'react'

const DrawerSideLeader = () => {
    return (
        <div>
            <div class="drawer-side">
                <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 min-h-full bg-secondary text-neutral">
                    <li><a class="bg-neutral text-primary" href=''><SpaceDashboardIcon />Bảng điều khiển</a></li>
                    <li><a href='/createAccount'><PersonAddIcon />Cấp tài khoản</a></li>
                    <li><a href="/profile"><AccountCircleIcon />Cá nhân</a></li>
                </ul>
            </div>
        </div>
    )
}

export default DrawerSideLeader