import { Button, Space} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EditUserProfileModal } from "../modals/editUserProfileModal";

export const UserProfilePanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showForm = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <Space>
        <Button type='primary' className="bg-gradient" onClick={showForm}>Edit profile</Button>
        <Link to="/addDesign">
          <Button type='primary' className="bg-gradient">Add design</Button>
        </Link>
        <Link to="/userProfile/receivedOrders">
          <Button type='primary' className="bg-gradient">Received orders</Button>
        </Link>
        <Link to="/userProfile/sentOrders">
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