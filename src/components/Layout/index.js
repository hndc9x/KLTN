import React from 'react';
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap'; 
import { NavLink } from 'react-router-dom';
import './style.css';
import { IoIosHome  ,IoIosAlbums ,IoIosBriefcase , IoMdHome ,IoIosDocument  ,IoIosApps ,IoMdMail ,IoIosPricetags ,IoIosContact} from "react-icons/io";

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
       <Header/>
       {
         props.sidebar ?
         <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li><NavLink exact to={`/`}><IoIosHome />&ensp;Home</NavLink></li>
                {/* <li><NavLink to={`/page`}><IoIosDocument/>&ensp;Page</NavLink></li> */}
                <li><NavLink to={`/category`}><IoIosAlbums/>&ensp;Category</NavLink></li>
                {/* <li><NavLink to={`/tags`}><IoIosPricetags/>&ensp;Tags</NavLink></li> */}
                <li><NavLink to={`/products`}><IoIosBriefcase/>&ensp;Products</NavLink></li>
                <li><NavLink to={`/warehouse`}><IoMdHome/>&ensp;WareHouse</NavLink></li>
                <li><NavLink to={`/orders`}><IoIosApps/>&ensp;Orders</NavLink></li>
                <li><NavLink to={`/user`}><IoIosContact/>&ensp;User</NavLink></li>
                {/* <li><NavLink to={`/sendEmail`}><IoMdMail/>&ensp;Email</NavLink></li> */}
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
              {props.children}
            </Col>
          </Row>
        </Container>
        :
        props.children
       }     
    </>
   )

 }

export default Layout;