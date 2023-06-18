import { Row, Col, Card, Image } from "antd";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";

export const Header = () => {
  return (
    <Row justify="center">
      <Col span={24}>
        <Card className="bg-gradient">
          <Col span={12} md={{ span: 5, offset: 5 }}>
            <Link to="/">
              <Image preview={false} src={logo} />
            </Link>
          </Col>
        </Card>
      </Col>
    </Row>
  );
};
