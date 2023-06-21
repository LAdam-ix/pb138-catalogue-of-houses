import { UserOutlined } from "@ant-design/icons";
import { Row, Col, Avatar, Space, Popover, Button, Select } from "antd";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { PriceSlider } from "./PriceSlider";
import useAuth from "../hooks/useAuth";


const contentNotSignedIn = (
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

const contentSignedIn = (
  <>
    <Space size="middle">
      <Link to="/userProfile">
        <Button type="primary">Profile</Button>
      </Link>
      <Link to="/">
        <Button type="primary">Sign Out</Button>
      </Link>
    </Space>
  </>
);

export const Panel = () => {
  const data = useAuth();
  console.log(data);

  if (data.isLoading) { return <>Loading...</>}
  
  return (
    <Row className="mt-3">
      <Col span={24} lg={{ span: 10, offset: 4 }}>
        <Space direction="vertical">
          <Row align='middle'>
            <Space size="middle">
              <Popover content={!data.isError ? contentSignedIn : contentNotSignedIn} trigger="click">
                {
                  !data.isError ?
                  <Avatar src="" size='large' /> :
                  <Avatar icon={<UserOutlined />} size="large" />
                }
              </Popover>
              <Select
                defaultValue="none"
                size="large"
                options={[
                  { value: "none", label: "No sorting" },
                  { value: "price-lh", label: "By Price (asc)" },
                  { value: "price-hl", label: "By Price (desc)" },
                ]}
              />
              <Select
                defaultValue="category1"
                size="large"
                options={[
                  // MAP CATEGPRIES
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
          <Row align='middle'>
            <Col>Price ($):</Col>
            <Col offset={1} flex='auto'>
              <PriceSlider />
            </Col>
          </Row>
          <Row>
            <SearchBar />
          </Row>
        </Space>
      </Col>
    </Row>
  );
};
