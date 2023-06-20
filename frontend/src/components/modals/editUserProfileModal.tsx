import { Modal } from "antd";
import { EditUserProfileForm } from "../profiles/editUserProfileForm";

export interface modalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
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
        <EditUserProfileForm setIsModalOpen={props.setIsModalOpen} />
      </Modal>
  )
}