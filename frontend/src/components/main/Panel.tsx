import { UserOutlined } from "@ant-design/icons";
import { Row, Col, Avatar, Select, Space, Popover, Button } from "antd";
import { Link } from "react-router-dom";

const content = (
  <>
    <Space size="middle">
      <Link to="/signin">
        <Button type="primary">Sign In</Button>
      </Link>
      <Link to="/signup">
        <Button type="primary">Sign Up</Button>
      </Link>
    </Space>
  </>
);

export const Panel = () => {
  return (
    <Row className="mt-3">
      <Col span={24} lg={{ span: 8, offset: 4 }}>
        <Row>
          <Space size="middle">
            <Popover content={content} trigger="click">
              <Link to="/userProfile">
                {/* <Avatar icon={<UserOutlined />} size="large" /> */}
                <Avatar src="" size='large' />
              </Link>
            </Popover>
            <Select
              defaultValue="category1"
              size="large"
              options={[
                { value: "category1", label: "Category1" },
                { value: "category2", label: "Category2" },
                { value: "category3", label: "Category3" },
              ]}
            />
            <Select
              defaultValue="price1"
              size="large"
              options={[
                { value: "price1", label: "Price1" },
                { value: "price2", label: "Price2" },
                { value: "price2", label: "Price3" },
              ]}
            />
          </Space>
        </Row>
      </Col>
    </Row>
  );
};
