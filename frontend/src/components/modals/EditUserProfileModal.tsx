import { Modal } from "antd";
import { EditUserProfileForm } from "../profiles/userProfile/EditUserProfileForm";

export interface modalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  id: string
}

export const EditUserProfileModal = (props: modalProps) => {
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <Modal
        open={props.isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <h2>Edit profile</h2>
        <EditUserProfileForm setIsModalOpen={props.setIsModalOpen} id={""}/>
      </Modal>
  )
}