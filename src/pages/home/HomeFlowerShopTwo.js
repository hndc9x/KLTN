import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutEight from "../../layouts/LayoutEight";
import HeroSliderTwentySix from "../../wrappers/hero-slider/HeroSliderTwentySix";

const HomeFlowerShopTwo = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Hello! | Electric Shop Home</title>
        <meta
          name="description"
          content="Flower Shop home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutEight
        headerTop="visible"
        headerContainerClass="container-fluid"
        headerBorderStyle="fluid-border"
        headerPaddingClass="header-padding-2"
      >
        {/* hero slider */}
        <HeroSliderTwentySix spaceLeftClass="ml-70" spaceRightClass="mr-70" />
        {/* feature icon */}
      </LayoutEight>
    </Fragment>
  );
};

export default HomeFlowerShopTwo;
