import { Card, Col, Row, Avatar, Rate } from "antd";
import { RatingType } from "../types/RatingType";
import { Link } from "react-router-dom";

export const Rating = (rating: RatingType) => {
  return (
    <Card>
      <Row align='middle'>
        <Col>
          <Link to="/userProfile">
            <Avatar src="" size='small' />
          </Link>
        </Col>
        <Col offset={1}>
          <h3 className="m0">{rating.customerId}</h3>
        </Col>
        <Col offset={1}>
          <Rate value={rating.score} />
        </Col>
      </Row>
      <Row>
        <p>{rating.comment}</p>
      </Row>
    </Card>
  );
};
