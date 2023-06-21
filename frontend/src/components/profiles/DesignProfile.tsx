import { Col, Row, Image, Button, Card, Space, Divider, Avatar, Modal } from "antd";
import { Header } from "../common/Header";
import { Link, useLocation } from "react-router-dom";
import { HouseResult } from "../types/DesignType";
import { Footer } from "../common/footer";
import { useState } from "react";
import { EditDesignModal } from "../modals/editDesignModal";
import { AccountsAPI } from "../../services";
import { useQuery } from "react-query";

export const DesignProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showForm = () => {
    setIsModalOpen(true);
  }

  const location = useLocation();
  const design: HouseResult = location.state;

  const { data: accountResponse } = useQuery({
    queryKey: [design.designerId],
    queryFn: () => AccountsAPI.getAccount(design.designerId),
  });

  if (!accountResponse) { return <>Loading...</> }

  return (
    <>
      <Header />
      <div 
        className="image-container"
        style={{ backgroundImage: `url(${design.imageLinks.at(0)?.path})`}}
      >
        <h1 className="overlay-text">{design.name}</h1>
      </div>
      <div className="scroll-container">
        {design.imageLinks.map((imageLink) => (
          <Image width="10rem" src={imageLink.path} alt={imageLink.id} />
        ))}
      </div>
      <Divider />
      <Row>
        <Col lg={{ span: 16, offset: 4 }}>
          <Row align='middle'>
            <Col>
              <Link to="/userProfile" state={accountResponse.data}>
                <Avatar src="" size='large' />
              </Link>
            </Col>
            <Col offset={1}>
              <h2>{design.designer.name}</h2>
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
              <h3>Category: {design.type}</h3>
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
      <EditDesignModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
};
