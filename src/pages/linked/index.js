import React, { Component } from 'react';

import { LinkedIn } from "react-linkedin-login-oauth2";

class LinkedInPage extends Component {
  state = {
    code: '',
    errorMessage: '',
  };


  handleSuccess = (data) => {
    this.setState({
      code: data.code,
      errorMessage: '',
    });
  }

  handleFailure = (error) => {
    this.setState({
      code: '',
      errorMessage: error.errorMessage,
    });
  }
  render() {
    const { code, errorMessage } = this.state;
    return (
      <div>
        <LinkedIn
          clientId="86qoqjf12xzym2"
          redirectUri={`http://localhost:3000/linkedin`}
          scope="r_emailaddress"
          state="34232423"
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
          supportIE
          redirectPath='/linkedin'
        >
          <img src={require('../../assets/linked.png')} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
        </LinkedIn>
        {!code && <div>No code</div>}
        {code && <div>Code: {code}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default LinkedInPage;