import { Row, Col, Button, Modal, Form, Input, Space } from "antd";
import * as yup from "yup";
import { UserType } from "../types/UserType";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { AvatarUpload } from "../forms/AvatarUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

// DELETE
const user: UserType = {
  id: "1234",
  name: "Name Surname",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin ac libero sit amet posuere. Suspendisse potenti. Donec imperdiet leo a libero congue dictum. Proin blandit magna gravida porta pulvinar.",
  email: "mail@mail.com",
  phoneNumber: "+420 111 111 111",
  avatarUrl:
    "https://e0.pxfuel.com/wallpapers/105/23/desktop-wallpaper-compromised-character-gaming-profile-dark-cute-cartoon-boys.jpg",
  role: "designer",
};

const schema = yup.object();

export const UserProfileInfo = () => {
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
      <Row justify='center'>
        <Col span={12} sm={{ span: 6}} >
          <img
            src={user.avatarUrl}
            style={{
              borderRadius: "50%",
              width: "100%",
              aspectRatio: 1,
              objectFit: "cover",
            }}
          />
        </Col>
        <Col sm={{ span: 17, offset: 1 }}>
          <Row align='middle'>
            <h1>{user.name}</h1>
            {/* SHOWN ONLY WHEN USER IS OWNER OF ACCOUNT */}
            <Col offset={1}>
              <Space>
                <Button type='primary' className="bg-gradient" onClick={showForm}>Edit profile</Button>
                <Link to="/addDesign">
                  <Button type='primary' className="bg-gradient">Add design</Button>
                </Link>
              </Space>
            </Col>
          </Row>
          <p style={{ fontSize: "1rem" }}>{user.description}</p>
        </Col>
      </Row>
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
  );
};
