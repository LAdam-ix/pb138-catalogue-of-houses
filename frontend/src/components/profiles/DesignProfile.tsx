import { Col, Row, Image, Button, Card, Space, Divider, Avatar } from "antd";
import { Header } from "../sign/Header";
import { Link, useLocation } from "react-router-dom";
import { DesignType } from "../types/DesignType";

export const DesignProfile = () => {
  const location = useLocation();
  const design: DesignType = location.state;

  return (
    <>
      <Header />
      <div 
        className="image-container"
        style={{ backgroundImage: `url(${design.pictureURL})`}}
      >
        <h1 className="overlay-text">{design.name}</h1>
      </div>
      <div className="scroll-container">
        <Image width="10rem" src={design.pictureURL} alt="Cinque Terre" />
        <Image width="10rem" src={design.pictureURL} alt="Cinque Terre" />
        <Image width="10rem" src={design.pictureURL} alt="Cinque Terre" />
      </div>
      <Divider />
      <Row>
        <Col lg={{ span: 16, offset: 4 }}>
          <Row align='middle'>
            <Col>
              <Link to="/userProfile">
                <Avatar src="" size='large' />
              </Link>
            </Col>
            <Col offset={1}>
              <h2>{design.designerId}</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col lg={{ span: 16, offset: 4 }}>
          <Row>
            <Col>
              <h3>Category: {design.category}</h3>
              <Card title={"Price: $" + design.price}>
                <Button type="primary" size="large" className="bg-gradient">Buy house design</Button>
              </Card>
            </Col>
            <Col offset={1}>
              <p>{design.description}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
};
