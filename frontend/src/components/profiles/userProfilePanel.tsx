import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal, Space, Form, Input, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { AvatarUpload } from "../forms/AvatarUpload";

const schema = yup.object();

export const UserProfilePanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const showForm = () => {
    setIsModalOpen(true);
  }
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setIsModalOpen(false);
  });
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space>
        <Button type='primary' className="bg-gradient" onClick={showForm}>Edit profile</Button>
        <Link to="/addDesign">
          <Button type='primary' className="bg-gradient">Add design</Button>
        </Link>
        <Link to="/userProfile/receivedOrders">
          <Button type='primary' className="bg-gradient">Received orders</Button>
        </Link>
        <Link to="/userProfile/sentOrders">
          <Button type='primary' className="bg-gradient">Sent orders</Button>
        </Link>
      </Space>
      <Modal 
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
      >  
          <h2>Edit account</h2>
        <Form onFinish={onSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"  
            name="description"
          >
            <TextArea rows={4} placeholder="max 500 characters" maxLength={500} />
          </Form.Item>
          <Row justify="center">
        <Col>
          <AvatarUpload
            name="avatar"
            placeholder="avatar"
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
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