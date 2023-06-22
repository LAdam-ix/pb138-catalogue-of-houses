import { Modal } from "antd";
import { modalProps } from "./EditUserProfileModal";
import { AddRatingForm } from "../ratings/AddRatingForm";

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
        <AddRatingForm setIsModalOpen={props.setIsModalOpen} id={props.id}/>
      </Modal>
  )
}