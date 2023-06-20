import { Row, Col } from "antd";
import { UserType } from "../types/UserType";

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

export const UserProfileInfo = () => {
  return (
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
        </Row>
        <p style={{ fontSize: "1rem" }}>{user.description}</p>
      </Col>
    </Row>
  );
};
