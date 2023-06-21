import { Row, Col, Space, Segmented } from "antd";
import { Header } from "../../common/Header";
import { UserProfileInfo } from "./UserProfileInfo";
import { useState } from "react";
import { DesignsGrid } from "../../designs/DesignsGrid";
import { HouseResult } from "../../types/DesignType";
import { Ratings } from "../../ratings/Ratings";
import { RatingType } from "../../types/RatingType";
import { Footer } from "../../common/footer";
import { UserProfilePanel } from "./userProfilePanel";
import { Account } from "../../types";
import { useQuery } from "react-query";
import { DesignsAPI } from "../../../services";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const DesignerPane = (account: Account) => {
  const [category, setCategory] = useState<string | any>("Designs");

  const { data: designsResponse } = useQuery({
    queryKey: ['houses'],
    queryFn: () => DesignsAPI.getAll(),
  });

  if (!designsResponse) { return <>Loading...</> }

  const designs: HouseResult[] = designsResponse.data.filter(design => {
    account.id === design.designerId
  });
  const ratings: RatingType[] = [];

  return (
    <>
      <Segmented block options={['Designs', 'Ratings']} size='large' onChange={setCategory} />
      {category == "Designs" ? <DesignsGrid {...{ designs }} /> : <Ratings {...ratings} />}
    </>
  );
}

export const UserProfile = () => {
  const location = useLocation();
  const account: Account = location.state;

  const loggedAccount: Account | null = useAuth().auth.item;
  const isAuth = loggedAccount && loggedAccount.id == account.id;

  return (
    <>
      <Space direction='vertical' size='large' style={{ width: "100%" }}>
        <Header />
        <Row>
          <Col lg={{ span: 16, offset: 4 }}>
            <Space direction='vertical' size='large'>
              <UserProfileInfo {...account} />
              {isAuth ? <UserProfilePanel/> : <></>}
              {account.type === "DESIGNER" ? <DesignerPane {...account}/> : <></>}
            </Space>
          </Col>
        </Row>
      </Space>
      <Footer />
    </>
  );
};
