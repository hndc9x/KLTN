import React from 'react'
import { TheHeader, TheSidebar,TheFooter } from '../../../containers';

/**
* @author
* @function Order
**/

const Order = (props) => {
    return (
        <>
          <div className="c-app c-default-layout">
            <TheSidebar />
            <div className="c-wrapper">
              <TheHeader />
              <div className="c-body">
              </div>
              <TheFooter />
            </div>
          </div>
        </>
      );

 }

export default Order