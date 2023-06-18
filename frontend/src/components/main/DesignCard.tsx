import { Row, Col, Card, Badge } from "antd";
import { DesignType } from "../types/DesignType";
import { Link } from "react-router-dom";

export const DesignCard = (design: DesignType) => {
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
                background: `url(${design.pictureURL}) center/cover no-repeat`,
                borderRadius: "8px 8px 0 0",
              }}
            />
          }
        >
          <h2 className="m0">{design.name}</h2>
          <strong>Designer: </strong>
          <span>{design.designerId}</span>
          <br />
          <strong>Category: </strong>
          <span>{design.category}</span>
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
