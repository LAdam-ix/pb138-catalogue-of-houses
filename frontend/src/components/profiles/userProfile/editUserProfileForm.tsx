import { Button, Col, Form, Row } from "antd";
import { AvatarUpload } from "../../formInputs/AvatarUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputField } from "../../formInputs/InputField";
import { TextField } from "../../formInputs/TextField";
import { formProps } from "../designProfile/editDesignForm";

const schema = yup.object({
  name: yup.string(),
  description: yup.string(),
  avatar: yup.object().shape({
    fileList: yup.array(),
  }),
});

export const EditUserProfileForm = (props: formProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    props.setIsModalOpen(false);
  });

  return (
    <Form onFinish={onSubmit}>
      <InputField 
        name="name"
        placeholder="Name"
        control={control}
        errors={errors}
      />
      <Row justify="center">
        <Col>
          <AvatarUpload
            name="avatar"
            placeholder="avatar"
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-gradient color-white"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
