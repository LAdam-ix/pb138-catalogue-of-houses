import { Row, Col, Card, Badge } from "antd";
import { HouseResult } from "../types/DesignType";
import { Link } from "react-router-dom";
import { CategoryEnum, getCategoryString } from "../types";

export const DesignCard = (design: HouseResult) => {
  const imagePath = "file:src/assets/images/header-image.png;"
  
  return (
    <Link to='/designProfile' state={design} >
      <Badge.Ribbon text="Designer rating: 10 / 10" color="#ffa500">
        <Card
          className="bg-gradient color-white"
          hoverable
          cover={
            <div
              style={{
                width: "100%",
                paddingBottom: "56.25%",
                background: `url(${imagePath}) center/cover no-repeat`,
                borderRadius: "8px 8px 0 0",
              }}
            />
          }
        >
          <h2 className="m0">{design.name}</h2>
          <strong>Designer: </strong>
          <span>{design.designer.name}</span>
          <br />
          <strong>Category: </strong>
          <span>{getCategoryString(design.type)}</span>
          <br />
          <Row>
            <Col>
              <h1 className="m0">${design.price}</h1>
            </Col>
          </Row>
        </Card>
      </Badge.Ribbon>
    </Link>
  );
};
