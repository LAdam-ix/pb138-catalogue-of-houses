import { Button, Form, Row } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { DesignsAPI } from "../../../services";
import { InputField } from "../../formInputs/InputField";
import { TextField } from "../../formInputs/TextField";
import { CategoriesSelect } from "../../formInputs/CategoriesSelect";
import { PriceField } from "../../formInputs/PriceField";
import { ImageUpload } from "../../formInputs/ImageUpload";
import { Image } from "../../types/MiscTypes";



const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  categories: yup.string().required(),
  price: yup.number().required(),
  images: yup.object().shape({
    fileList: yup.array().min(1)
  }).required()
});

export const AddDesignForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(data.images)
    const images = data.images.fileList.map((image: Image) => image.thumbUrl)
    const designPost = {
      name: data.name,
      description: data.description,
      images: images,
      price: data.price,
      type: data.categories,
    }
    console.log(designPost)

    DesignsAPI.create(designPost).then(response => {
      console.log(response);
      navigate('/');
    });
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
