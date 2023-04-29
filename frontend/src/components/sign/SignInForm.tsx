import { Button, Form, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "./InputField";
import { AvatarUpload } from "./AvatarUpload";
import { PasswordField } from "./PasswordField";
import { RoleRadio } from "./RoleRadio";

const schema = yup.object({
  email: yup
    .string()
    .email("Email has invalid format!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password has to be at least 8 characters long!")
    .required("Password is required!"),
});

export const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form onFinish={onSubmit}>
      <InputField
        name="email"
        placeholder="Email"
        control={control}
        errors={errors}
      />
      <PasswordField
        name="password"
        placeholder="Password"
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
