import { Button, Row, Space } from "antd";
import { RatingType } from "../types/RatingType";
import { Rating } from "./Rating";
import { useState } from "react";
import { AddRatingModal } from "../modals/addRatingModal";

// DELETE
const rating1: RatingType = {
    id: "1234",
    customerId: "123",
    designerId: "321",
    score: 3,
    comment: "Lorem ipsum"
}
const rating2: RatingType = {
  id: "1234",
  customerId: "123",
  designerId: "321",
  score: 3,
  comment: ""
}
const rating3: RatingType = {
  id: "1234",
  customerId: "123",
  designerId: "321",
  score: 3,
  comment: "Lorem ipsum"
}

export const Ratings = (ratings: RatingType[]) => {
  // DELETE
  ratings = [rating1, rating2, rating3];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showForm = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Row justify='center'>
          <Button size="large" className="bg-gradient color-white" onClick={showForm}>Add rating</Button>
        </Row>
        {ratings.map(rating => <Rating {...rating} key={rating.id} ></Rating>)}
      </Space>
      <AddRatingModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}