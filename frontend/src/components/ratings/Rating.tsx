import { Card, Col, Row, Avatar, Rate, Button } from "antd";
import { RatingType } from "../types/RatingType";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "react-query";
import { AccountsAPI, RatingsAPI } from "../../services";
import useAuth from "../hooks/useAuth";
import isAuthor from "../utils/isAuthor";

export const Rating = (rating: RatingType) => {
  
  const { data: accountResponse } = useQuery({
    queryKey: [rating.customerId],
    queryFn: () => AccountsAPI.getAccount(rating.customerId),
  });
  
  const queryClient = useQueryClient()

  
  const data = useAuth();
  if (data.isLoading || !accountResponse) { return <>Loading...</>}
  const isAuth = isAuthor(data.auth, accountResponse.data);


  const deleteRating = () => {
    RatingsAPI.deleteRating(rating.id).then(() => queryClient.invalidateQueries({queryKey: [rating.designerId]}))
  }

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
              <h3 className="m0">{accountResponse.data.name + " " + accountResponse.data.surname}</h3>
            </Col>
            <Col offset={1}>
              <Rate disabled={true} value={rating.score} />
            </Col>
          </Row>
        </Col>
        {
          isAuth ?
            <Col>
              <Button danger icon={<DeleteOutlined />} onClick={deleteRating} />
            </Col> :
            <></>
        }
      </Row>
      <Row>
        <p>{rating.comment}</p>
      </Row>
    </Card>
  );
};
