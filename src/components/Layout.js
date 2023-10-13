import React from 'react'
import BasicBreadcrumbs from './BreadCrumbs'
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  let baseCls = 'layout'
  return (
    <div className={`${baseCls}__container`}>
        <NavBar />
        <BasicBreadcrumbs/>
        <div className={`${baseCls}__item`}>
          <Outlet />
        </div>
    </div>
  )
}

export default Layout;