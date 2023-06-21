import { Button, Space} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EditUserProfileModal } from "../../modals/editUserProfileModal";
import { Account } from "../../types";
import { useQuery } from "react-query";
import { OrderAPI } from "../../../services";

export const UserProfilePanel = (account: Account) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showForm = () => {
    setIsModalOpen(true);
  }

  const sentResponse = useQuery({
    queryKey: ['orders','sent', account.id],
    queryFn: () => OrderAPI.getSent(),
  });

  const receivedResponse = useQuery({
    queryKey: ['orders','received', account.id],
    queryFn: () => OrderAPI.getReceived(),
  });

  if (!sentResponse || !receivedResponse) { return <>Loading...</>}
  console.log(sentResponse);
  console.log(receivedResponse);
  

  return (
    <>
      <Space>
        <Button type='primary' className="bg-gradient" onClick={showForm}>Edit profile</Button>
        <Link to="/addDesign">
          <Button type='primary' className="bg-gradient">Add design</Button>
        </Link>
        <Link state={{orders: receivedResponse.data, label: "Received orders"}} to="/userProfile/receivedOrders">
          <Button type='primary' className="bg-gradient">Received orders</Button>
        </Link>
        <Link state={{orders: sentResponse.data, label: "Sent orders"}} to="/userProfile/sentOrders">
          <Button type='primary' className="bg-gradient">Sent orders</Button>
        </Link>
      </Space>
      <EditUserProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}