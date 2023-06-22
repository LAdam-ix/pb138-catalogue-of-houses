import { Row, Col, Rate, Space } from "antd";
import { Account, UserType } from "../../types/UserType";
import { useQuery } from "react-query";
import { AccountsAPI } from "../../../services";

const user = {
  avatarUrl:
    "https://e0.pxfuel.com/wallpapers/105/23/desktop-wallpaper-compromised-character-gaming-profile-dark-cute-cartoon-boys.jpg",
};



export const UserProfileInfo = (account: Account) => {
  const { data: accountResponse } = useQuery({
    queryKey: [account.id],
    queryFn: () => AccountsAPI.getAccount(account.id),
  });
  if (!accountResponse) { return <>Loading...</> }



  return (
    <Row justify='center' align='middle'>
      <Col span={12} sm={{ span: 6 }} >
        <img
          src={user.avatarUrl} //Placeholder catboi
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
        <Rate disabled={true} value={accountResponse.data.averageRating} />
      </Col>
    </Row>
  );
};
