import { Button, Space} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EditUserProfileModal } from "../../modals/EditUserProfileModal";
import { Account } from "../../types";
import { useQuery } from "react-query";
import { DesignsAPI, OrdersAPI } from "../../../services";

export const UserProfilePanel = (account: Account) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showForm = () => {
    setIsModalOpen(true);
  }

  const {data: sentResponse} = useQuery({
    queryKey: ['orders','sent', account.id],
    queryFn: () => OrdersAPI.getSent(),
  });

  const {data: receivedResponse} = useQuery({
    queryKey: ['orders','received', account.id],
    queryFn: () => OrdersAPI.getReceived(),
  });

  const {data: designsResponse} = useQuery({
    queryKey: ['houses'],
    queryFn: () => DesignsAPI.getAll(),
  });

  if (!sentResponse || !receivedResponse || !designsResponse) {
    return <>Loading...</>
  }

  const sentOrders = sentResponse.data.map(order => {
    return {
      designerName: order.designer.name + " " + order.designer.surname,
      designName: designsResponse.data.find(design => design.id = order.houseId),
      price: order.price
    }
  });

  const receivedOrders = receivedResponse.data.map(order => {
    return {
      id: order.id,
      designerName: order.designer.name + " " + order.designer.surname,
      designName: designsResponse.data.find(design => design.id = order.houseId)?.name,
      price: order.price
    }
  });

  console.log(sentOrders);
  console.log(receivedOrders);
  

  return (
    <>
      <Space>
        <Button type='primary' className="bg-gradient" onClick={showForm}>Edit profile</Button>
        <Link to="/addDesign">
          <Button type='primary' className="bg-gradient">Add design</Button>
        </Link>
        <Link state={{orders: receivedOrders, label: "Received orders"}} to="/userProfile/receivedOrders">
          <Button type='primary' className="bg-gradient">Received orders</Button>
        </Link>
        <Link state={{orders: sentOrders, label: "Sent orders"}} to="/userProfile/sentOrders">
          <Button type='primary' className="bg-gradient">Sent orders</Button>
        </Link>
      </Space>
      <EditUserProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        id=""
      />
    </>
  )
}