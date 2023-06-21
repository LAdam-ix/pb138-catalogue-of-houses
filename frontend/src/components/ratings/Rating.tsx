import { Card, Col, Row, Avatar, Rate, Button } from "antd";
import { RatingType } from "../types/RatingType";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { AccountsAPI } from "../../services";

export const Rating = (rating: RatingType) => {
  const deleteRating = () => {
    console.log("delete");
  }
  
  const { data: accountResponse } = useQuery({
    queryKey: [rating.customerId],
    queryFn: () => AccountsAPI.getAccount(rating.customerId),
  });

  if (!accountResponse) { return <>Loading...</> }

  return (
    <Card>
      <Row justify='space-between'>
        <Col span={20}>
          <Row align='middle'>
            <Col>
              <Link to="/userProfile" state={accountResponse.data}>
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