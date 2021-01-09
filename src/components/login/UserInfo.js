import React, { Component } from "react";
import Login from "./formLogin";

class UserInfo extends Component {
    render() {
      return <Login />;
      return (
        <div className="user-info">
          <label>Email:</label>
          <span type="text" id="email">
            test@test.com
          </span>
        </div>
      );
    }
  }
  
  export default UserInfo;