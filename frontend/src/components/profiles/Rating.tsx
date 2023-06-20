import { Card, Col, Row, Avatar, Rate, Button } from "antd";
import { RatingType } from "../types/RatingType";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

export const Rating = (rating: RatingType) => {
  const deleteRating = () => {
    console.log("delete");
  }

  return (
    <Card>
      <Row justify='space-between'>
        <Col span={20}>
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
        </Col>
        <Col>
          <Button danger icon={<DeleteOutlined />} onClick={deleteRating} />
        </Col>
      </Row>
      <Row>
        <p>{rating.comment}</p>
      </Row>
    </Card>
  );
};
