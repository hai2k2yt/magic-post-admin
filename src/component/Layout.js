import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <div>
            {/*render all the Routers' child*/}
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout