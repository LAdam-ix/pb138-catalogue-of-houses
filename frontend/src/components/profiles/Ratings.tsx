import { Button, Form, Modal, Rate, Row, Space, Input } from "antd";
import { RatingType } from "../types/RatingType";
import { Rating } from "./Rating";
import { useState } from "react";

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

const { TextArea } = Input;

export const Ratings = (ratings: RatingType[]) => {
  // DELETE
  ratings = [rating1, rating2, rating3];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(5);

  const showForm = () => {
    setIsModalOpen(true);
  }
  const handleSubmit = (values: any) => {
    console.log('Success:', values);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space direction='vertical' style={{ width: "100%" }}>
        <Row justify='center'>
          <Button size="large" className="bg-gradient color-white" onClick={showForm}>Add rating</Button>
        </Row>
        {ratings.map(rating => <Rating {...rating} key={rating.id} ></Rating>)}
      </Space>

      <Modal 
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >  
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="rate"
          >
            <Rate onChange={setValue} value={value} />
          </Form.Item>
          <Form.Item
            name="comment"
          >
            <TextArea rows={4} placeholder="max 500 characters" maxLength={500} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-gradient color-white">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}