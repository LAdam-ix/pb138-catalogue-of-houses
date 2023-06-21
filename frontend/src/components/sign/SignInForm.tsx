import { Button, Form, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../formInputs/InputField";
import { AvatarUpload } from "../formInputs/AvatarUpload";
import { PasswordField } from "../formInputs/PasswordField";
import { RoleRadio } from "../formInputs/RoleRadio";
import { AuthAPI } from "../../services";
import useLogin from "../hooks/useLogin";

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

  const {login} = useLogin();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    login(data).catch((error) => {
      //TODO Show message somehow
      console.log(error.response.data);
            
    });
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
