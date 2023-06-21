import { Button, Form, Row } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../../formInputs/InputField";
import { TextField } from "../../formInputs/TextField";
import { ImageUpload } from "../../formInputs/ImageUpload";
import { CategoriesSelect } from "../../formInputs/CategoriesSelect";
import { PriceField } from "../../formInputs/PriceField";
import { DesignsAPI } from "../../../services";
import { Image } from "../../types/MiscTypes";
import { useNavigate } from "react-router-dom";


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
  id: string;
}


export const EditDesignForm = (props: formProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  
  const onSubmit = handleSubmit((data) => {
    const images = data.images.fileList ? data.images.fileList.map((image: Image) => image.thumbUrl) : []
    const designPost = {
      name: data.name,
      description: data.description,
      images: images,
      price: data.price,
      type: data.categories,
    }
    console.log(designPost)
    
    DesignsAPI.patch(props.id, designPost).then(response => {
      console.log(response);
      props.setIsModalOpen(false);
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