import React from 'react'
import Header from '../Header'
import Menu from '../MenuHeader'

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
        <Header />
        <Menu/>
        {props.children}
    </>
   )

 }

export default Layout