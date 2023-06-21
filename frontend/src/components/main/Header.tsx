import { Row, Col, Card, Image, Space } from "antd";
import "../../assets/styles/main.css";
import logo from "../../assets/images/logo.svg";
import headerImage from "../../assets/images/header-image.png";
import { Count } from "./Count";
import { useQuery } from "react-query";
import { AccountsAPI, DesignsAPI } from "../../services"

export const Header = () => {
  const {data: designsResponse} = useQuery({
    queryKey: ['houses'],
    queryFn: () => DesignsAPI.getAll(),
  });

  const {data: countResponse} = useQuery({
    queryKey: ['designerCount'],
    queryFn: () => AccountsAPI.getDesignerCount(),
  });

  if (!designsResponse || !countResponse) { return <>Loading...</>}

  
  return (
    <Row justify="center">
      <Col span={24}>
        <Card className="bg-gradient ptb-2">
          <Row>
            <Col
              span={24}
              lg={{ span: 8, offset: 4 }}
              className="color-light-gray"
            >
              <Space direction="vertical" size="large">
                <Row>
                  <Col span={15}>
                    <Image preview={false} src={logo} alt="Logo" />
                  </Col>
                </Row>
                <Row>
                  <h1 className="title">
                    Find A Perfect Home
                    <br />
                    For Your Family
                  </h1>
                </Row>
                <Row>
                  <Count number={designsResponse.data.length} text="DESIGNERS"></Count>
                  <Count number={countResponse.data} text="DESIGNS"></Count>
                </Row>
              </Space>
            </Col>
            <Col
              span={0}
              lg={{ span: 7, offset: 1 }}
              style={{ position: "relative" }}
            >
              <img
                src={headerImage}
                alt="Header image"
                className="main-image"
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
