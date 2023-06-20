import { Button, Form, Row } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../forms/InputField";
import { TextField } from "../forms/TextField";
import { ImageUpload } from "../forms/ImageUpload";
import { CategoriesSelect } from "../forms/CategoriesSelect";
import { PriceField } from "../forms/PriceField";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  categories: yup.string().required(),
  price: yup.number().required(),
  images: yup.object().shape({
    fileList: yup.array().min(1)
  }).required()
});

export interface formProps {
  setIsModalOpen: (arg: boolean) => void;
}

export const EditDesignForm = (props: formProps) => {
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
      <InputField
        name="name"
        placeholder="Name"
        control={control}
        errors={errors}
      />
      <TextField
        name="description"
        placeholder="Description"
        control={control}
        errors={errors}
      />
			<CategoriesSelect
				name="categories"
				placeholder=""
				control={control}
				errors={errors}
			/>
			<PriceField
        name="price"
        placeholder="Price"
        control={control}
        errors={errors}
      />
      <ImageUpload
        name="images"
        placeholder="Images"
        control={control}
        errors={errors}
      />
      <Row justify="center">
        <Button size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Row>
    </Form>
  );
};