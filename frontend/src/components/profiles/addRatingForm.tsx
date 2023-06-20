import { Button, Form } from "antd";
import { formProps } from "./editDesignForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RateInput } from "../forms/RateInput";
import { TextField } from "../forms/TextField";

const schema = yup.object({
  rate: yup.number().required(),
  description: yup.string(),
});

export const AddRatingForm = (props: formProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    props.setIsModalOpen(false);
    console.log(data);
  });

  return (
    <Form onFinish={onSubmit}>
      <RateInput 
        name="rate"
        control={control}
        errors={errors}
      />
      <TextField
        name="description"
        placeholder="Description"
        control={control}
        errors={errors}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gradient color-white">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}