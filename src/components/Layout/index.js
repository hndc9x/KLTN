import React from 'react'
import Header from '../Header'
import Menu from '../Menu'

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