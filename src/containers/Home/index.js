import React from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import Layout from "../../components/Layout";
import './style.css';
import {NavLink} from 'react-router-dom';

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <ul>
              <li><NavLink to={'/'} >Home</NavLink></li>
              <li><NavLink to={'/products'} >Products</NavLink></li>
              <li><NavLink to={'/orders'} >Orders</NavLink></li>
            </ul>
          </Col>
          <Col md={10} style={{marginLeft : "auto"}}>Conariner</Col>
        </Row>
      </Container>

      {/* <Jumbotron style={{margin:'5rem' ,background:'#fff'}} className ='text-center'>
            <h1>Chau CHau</h1>
            <p>kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                sdasasasasasasasasasasasasask</p>
        </Jumbotron> */}
    </Layout>
  );
};

export default Home;
