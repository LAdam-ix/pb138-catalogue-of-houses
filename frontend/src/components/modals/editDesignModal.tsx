import { Card, Modal } from "antd";
import { EditDesignForm } from "../profiles/designProfile/EditDesignForm";

export interface modalProps {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  id: string
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
          <EditDesignForm id={props.id} setIsModalOpen={props.setIsModalOpen} />
        </Card>
      </Modal>
  )
}