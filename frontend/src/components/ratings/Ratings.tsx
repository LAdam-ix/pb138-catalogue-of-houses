import { Button, Row, Space } from "antd";
import { RatingType } from "../types/RatingType";
import { Rating } from "./Rating";
import { useState } from "react";
import { AddRatingModal } from "../modals/addRatingModal";

interface RatingTypeProps {
  ratings: RatingType[],
}

export const Ratings = ({ratings}: RatingTypeProps) => {
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