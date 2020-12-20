import React from 'react';
import Layout from '../../components/Layout';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import './style.css';
import { NavLink } from 'react-router-dom';
import CardLineChart from "./Cards/CardLineChart";
import CardBarChart from "./Cards/CardBarChart";
import CardPageVisits from "./Cards/CardPageVisits.js";
import CardSocialTraffic from "./Cards/CardSocialTraffic.js";

/**
* @author
* @function Home
**/

const Home = (props) => {

  return (
    <Layout sidebar>
      <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <p></p>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
    </Layout>
  )

}

export default Home