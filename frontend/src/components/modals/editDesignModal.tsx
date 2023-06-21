import { Card, Modal } from "antd";
import { EditDesignForm } from "../profiles/designProfile/editDesignForm";

export interface modalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
}

export const EditDesignModal = (props: modalProps) => {
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <Modal
        open={props.isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Card title='Edit design'>
          <EditDesignForm setIsModalOpen={props.setIsModalOpen} />
        </Card>
      </Modal>
  )
}