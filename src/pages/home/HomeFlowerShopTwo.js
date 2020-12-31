import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutEight from "../../layouts/LayoutEight";
import HeroSliderTwentySix from "../../wrappers/hero-slider/HeroSliderTwentySix";
import TabProductSeventeen from "../../wrappers/product/TabProductSeventeen";
import ProductSliderTwo from "../../wrappers/product/ProductSliderTwo";
import TestimonialOne from "../../wrappers/testimonial/TestimonialOne";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";


const HomeFlowerShopTwo = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Electric Shop Home</title>
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
       
        {/* tab product */}
        <TabProductSeventeen category="flower" spaceBottomClass="pb-100" />
        
        {/* product slider */}
        <ProductSliderTwo category="flower" spaceBottomClass="pb-100" />
        {/* testimonial */}
        <TestimonialOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-95"
          spaceLeftClass="ml-70"
          spaceRightClass="mr-70"
          bgColorClass="bg-gray-3"
        />
        {/* newsletter */}
        <NewsletterThree
          spaceTopClass="pt-80"
          spaceBottomClass="pb-95"
          subscribeBtnClass="dark-red-subscribe"
        />
      </LayoutEight>
    </Fragment>
  );
};

export default HomeFlowerShopTwo;
