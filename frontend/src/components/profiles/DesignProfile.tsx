import { Col, Row, Image, Button, Card, Space, Divider, Avatar, Modal } from "antd";
import { Header } from "../common/Header";
import { Link, useLocation } from "react-router-dom";
import { DesignType } from "../types/DesignType";
import { Footer } from "../common/footer";
import { useState } from "react";
import { AddDesignForm } from "./addDesignForm";

export const DesignProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showForm = () => {
    setIsModalOpen(true);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            {/* SHOWN ONLY WHEN USER IS DESIGNER OF DESIGN */}
            <Col offset={1}>
              <Button type='primary' className="bg-gradient" onClick={showForm}>Edit design</Button>
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
                <Link to='/payment'>
                  <Button type="primary" size="large" className="bg-gradient">Buy house design</Button>
                </Link>
              </Card>
            </Col>
            <Col offset={1}>
              <p>{design.description}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Card title='Edit design'>
          <AddDesignForm />
        </Card>
      </Modal>
    </>
  )
};
