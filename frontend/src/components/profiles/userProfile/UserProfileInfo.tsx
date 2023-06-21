import { Row, Col, Rate, Space } from "antd";
import { Account, UserType } from "../../types/UserType";
import { UserProfilePanel } from "./userProfilePanel";

// DELETE
const user = {
  description:
    "Description tu nema co robit treba to zmaznut",
  avatarUrl:
    "https://e0.pxfuel.com/wallpapers/105/23/desktop-wallpaper-compromised-character-gaming-profile-dark-cute-cartoon-boys.jpg",
};



export const UserProfileInfo = (account: Account) => {
  return (
    <Row justify='center' align='middle'>
      <Col span={12} sm={{ span: 6}} >
        <img
          src={user.avatarUrl} //TODO IMAGE
          style={{
            borderRadius: "50%",
            width: "100%",
            aspectRatio: 1,
            objectFit: "cover",
          }}
        />
      </Col>
      <Col sm={{ span: 17, offset: 1 }}>
        <h1>{account.name + " " + account.surname}</h1>
        {/* TOOD DO THE RATING */}
        <Rate value={3} />
      </Col>
    </Row>
  );
};
