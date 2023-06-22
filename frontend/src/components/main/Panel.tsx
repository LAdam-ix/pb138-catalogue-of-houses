import { UserOutlined } from "@ant-design/icons";
import { Row, Col, Avatar, Space, Popover, Button, Select } from "antd";
import { Link } from "react-router-dom";
import { SearchBar } from "../formInputs/SearchBar";
import { PriceSlider } from "../formInputs/PriceSlider";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { Account, CategoryEnum, CategoryType } from "../types";
import { useRecoilState, useRecoilValue } from "recoil";
import { designsFilter } from "../../state/atoms";


const ContentNotSignedIn = (
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

const ContentSignedIn = () => {
  const { logout } = useLogout();
  const data = useAuth();
  if (data.isLoading) { return <>Loading...</>}
  return (
    <>
      <Space size="middle">
        <Link to="/userProfile" state={data.auth.item}>
          <Button type="primary">Profile</Button>
        </Link>
        <Link to="/">
          <Button type="primary" onClick={() => logout()}>Sign Out</Button>
        </Link>
      </Space>
    </>
  );
}

export const Panel = () => {
  const [filterData, setFilterData] = useRecoilState(designsFilter);

  const data = useAuth();
  console.log(data);

  if (data.isLoading) { return <>Loading...</>}
  
  const image = undefined; //TODO AVATAR

  const handleSort = (value: 'none' | 'price-lh' | 'price-hl') => {
    setFilterData({
      ...filterData,
      sortType: value,
    });
  }

  const handleCategory = (value: CategoryType | 'ALL') => {
    setFilterData({
      ...filterData,
      categoryType: value,
    });
  }

  return (
    <Row className="mt-3">
      <Col span={22} offset={1} lg={{ span: 10, offset: 4 }}>
        <Space direction="vertical">
          <Row align='middle'>
            <Space size="middle">
              <Popover content={!data.isError ? ContentSignedIn : ContentNotSignedIn} trigger="click">
                {
                  !data.isError && image ?
                  <Avatar src={image} size='large' /> :
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
                onChange={handleSort}
              />
              <Select
                defaultValue="ALL"
                size="large"
                options={CategoryEnum.concat([{value: 'ALL', label: "All categories"}])}
                onChange={handleCategory}
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
