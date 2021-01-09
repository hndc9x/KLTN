import PropTypes from "prop-types";
import React from "react";
import QRCode from "qrcode.react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Who Are We</h5>
          <h1>Welcome To Hello!</h1>
          <p>
            Your experience is our reputation. We are committed to bringing you
            reputable, top quality products. Our products bring value to you -
            Your satisfaction is the belief that creates us.{" "}
          </p>
          <p>
            <h5>Follow Us</h5>
          </p>
          <QRCode
            id="qrcode"
            value="https://www.facebook.com/groups/312971363435869"
            size={290}
            level={"H"}
            includeMargin={true}
          />
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
