import { Modal } from "antd";
import { modalProps } from "./editUserProfileModal";
import { AddRatingForm } from "../profiles/addRatingForm";

export const AddRatingModal = (props: modalProps) => {
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <Modal
        open={props.isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <AddRatingForm setIsModalOpen={props.setIsModalOpen} />
      </Modal>
  )
}