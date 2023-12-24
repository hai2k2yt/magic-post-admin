import React from 'react'
import Navbar from '../../component/layout/Navbar';
import Register from '../auth/Register';

const CreateStaffAccount = () => {
    return (
        <div>
            <Navbar />
            <div class="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col items-left">
                    <div>
                        <Register />
                    </div>
                    {/* <!-- Page content here --> */}

                </div>
                <div class="drawer-side">
                    
                </div>

            </div>
        </div>
    )
}

export default CreateStaffAccount