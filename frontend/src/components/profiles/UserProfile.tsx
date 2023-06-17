import { Row, Col, Space, Divider, Segmented } from "antd";
import { Header } from "../sign/Header";
import { UserProfileInfo } from "./UserProfileInfo";
import { useState } from "react";
import { DesignsGrid } from "../main/DesignsGrid";
import { DesignType } from "../types/DesignType";
import { Ratings } from "./Ratings";
import { RatingType } from "../types/RatingType";
import { Footer } from "../main/common/footer";

export const UserProfile = () => {
  const [category, setCategory] = useState<string | any>("Designs");

  const designs: DesignType[] = [];
  const ratings: RatingType[] = [];

  return (
    <>
      <Space direction='vertical' size='large'>
        <Header />
        <Row>
          <Col lg={{ span: 16, offset: 4 }}>
            <Space direction='vertical' size='large'>
              <UserProfileInfo />
              <Divider />
              <Segmented block options={['Designs', 'Ratings']} size='large' onChange={setCategory} />
              {category == "Designs" ? <DesignsGrid {...designs} /> : <Ratings {...ratings} />}
            </Space>
          </Col>
        </Row>
      </Space>
      <Footer />
    </>
  );
};
