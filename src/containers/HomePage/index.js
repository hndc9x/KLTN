import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import MenuHeader from "../../components/MenuHeader";
import "./style.css";
import imageBigSale from "../../images/DuoiCategory/bigsavingpng.png";
import imagePhone from "../../images/DuoiCategory/hinh1.png";
import imageElectronic from "../../images/DuoiCategory/hinh2.png";
import imageFashion from "../../images/DuoiCategory/hinh3.png";
import imageTV from "../../images/DuoiCategory/hinh4.png";
import imageToys from "../../images/DuoiCategory/hinh5.png";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col,
} from "reactstrap";

const items = [
  {
    src: "http://localhost:2000/public/hinh2.jpg",
    //altText: 'Slide 1',
    //caption: 'Slide 1'
  },
  {
    src: "http://localhost:2000/public/hinh3.png",
    // altText: 'Slide 2',
    //caption: 'Slide 2'
  },
  {
    src: "http://localhost:2000/public/hinh1.jpg",
    // altText: 'Slide 3',
    //caption: 'Slide 3'
  },
];

/**
 * @author
 * @function HomePage
 **/

const HomePage = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  return (
    <Layout>
      <p></p>
      <div className="frame1">
        <div>
          <img src={imageBigSale} className="imageFrame1" alt="" />
          &emsp;&emsp;&emsp;&emsp;
          <img src={imagePhone} className="imageFrame2" alt="" />
          &emsp;&emsp;&emsp;&emsp;
          <img src={imageElectronic} className="imageFrame2" alt="" />
          &emsp;&emsp;&emsp;&emsp;
          <img src={imageFashion} className="imageFrame2" alt="" />
          &emsp;&emsp;&emsp;&emsp;
          <img src={imageTV} className="imageFrame2" alt="" />
          &emsp;&emsp;&emsp;&emsp;
          <img src={imageToys} className="imageFrame2" alt="" />
        </div>
      </div>
      <p></p>
      <hr />
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
        <h3 className="styleTitle"><i>Flash Sale</i></h3>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Laptop Sony Sale 50%</CardTitle>
                {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
              </CardBody>
              <img
                width="100%"
                src="http://localhost:2000/public/laptop.jpg"
                alt="Card image cap"
              />
              <CardBody>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Laptop Sony Sale 50%</CardTitle>
                {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
              </CardBody>
              <img
                width="100%"
                src="http://localhost:2000/public/laptop.jpg"
                alt="Card image cap"
              />
              <CardBody>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          
      </Row>
      <div></div>
    </Layout>
  );
};

export default HomePage;
