import { Button, Form } from "antd";
import { formProps } from "../profiles/designProfile/editDesignForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RateInput } from "../formInputs/RateInput";
import { TextField } from "../formInputs/TextField";
import { RatingsAPI } from "../../services";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const rating = {
      score: data.rate,
      comment: data.description,
      designerId: props.id
    }
    RatingsAPI.create(rating).then(() => {
      props.setIsModalOpen(false);
      navigate('/userProfile');
    });
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