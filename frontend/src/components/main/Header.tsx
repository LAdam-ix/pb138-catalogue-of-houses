import { Row, Col, Card, Image, Space } from "antd";
import "../../assets/styles/main.css";
import logo from "../../assets/images/logo.svg";
import headerImage from "../../assets/images/header-image.png";
import { Count } from "./Count";

export const Header = () => {
  return (
    <Row justify="center">
      <Col span={24}>
        <Card className="bg-gradient">
          <Row>
            <Col span={24} lg={{ span: 8, offset: 4 }} className="color-light-gray">
              <Space direction='vertical' size='large'>
                <Row>
                  <Col span={15}>
                    <Image src={logo} alt="Logo" />
                  </Col>
                </Row>
                <Row>
                  <h1 className="title">Find A Perfect Home<br />For Your Family</h1>
                </Row>
                <Row>
                  <Count number={100} text="DESIGNERS"></Count>
                  <Count number={1000} text="DESIGNES"></Count>
                </Row>
              </Space>
            </Col>
            <Col span={0} lg={{ span: 8, offset: 0 }} style={{ position: "relative" }}>
              <img src={headerImage} alt="Header image" className="main-image" />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
