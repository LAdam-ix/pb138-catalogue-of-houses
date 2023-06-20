import { Row, Col, Space, Segmented } from "antd";
import { Header } from "../common/Header";
import { UserProfileInfo } from "./UserProfileInfo";
import { useState } from "react";
import { DesignsGrid } from "../main/DesignsGrid";
import { DesignType } from "../types/DesignType";
import { Ratings } from "./Ratings";
import { RatingType } from "../types/RatingType";
import { Footer } from "../common/footer";
import { UserProfilePanel } from "./userProfilePanel";

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
              <UserProfilePanel />
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
