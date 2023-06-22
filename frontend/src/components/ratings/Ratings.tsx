import { Button, Row, Space } from "antd";
import { RatingType } from "../types/RatingType";
import { Rating } from "./Rating";
import { useState } from "react";
import { AddRatingModal } from "../modals/addRatingModal";
import { Account } from "../types";
import useAuth from "../hooks/useAuth";
import isAuthor from "../utils/isAuthor";

interface RatingTypeProps {
  ratings: RatingType[],
  designer: Account
}

export const Ratings = ({ratings, designer}: RatingTypeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useAuth();
  if (data.isLoading) { return <>Loading...</>}
  const isAuth = isAuthor(data.auth, designer);
  const hasRated = ratings.find(rating => data.auth.item.id == rating.customerId);


  const showForm = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <Space direction='vertical' style={{ width: "100%" }}>
        {
          !data.isError && !isAuth && !hasRated ?
            <Row justify='center'>
              <Button size="large" className="bg-gradient color-white" onClick={showForm}>Add rating</Button>
            </Row>
            : <></>
        }
        {ratings.map(rating => <Rating {...rating} key={rating.id} ></Rating>)}
      </Space>
      <AddRatingModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        id={designer.id}
      />
    </>
  )
}