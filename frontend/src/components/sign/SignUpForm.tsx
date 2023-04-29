import { Button, Form, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "./InputField";
import { AvatarUpload } from "./AvatarUpload";
import { PasswordField } from "./PasswordField";
import { RoleRadio } from "./RoleRadio";

const schema = yup.object({
  name: yup
    .string()
    .min(8, "Username has to be at least 8 characters long!")
    .required("Username is required!"),
  email: yup
    .string()
    .email("Email has invalid format!")
    .required("Email is required!"),
  phoneNumber: yup
    .string()
    .trim()
    .matches(
      /^\+[0-9]{12}$/,
      "Phone number has to be in format: +XXXXXXXXXXXX!"
    )
    .required("Phone number is required!"),
  password: yup
    .string()
    .min(8, "Password has to be at least 8 characters long!")
    .required("Password is required!"),
});

export const SignUpForm = () => {
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
        name="name"
        placeholder="Name"
        control={control}
        errors={errors}
      />
      <InputField
        name="email"
        placeholder="Email"
        control={control}
        errors={errors}
      />
      <InputField
        name="phoneNumber"
        placeholder="Phone number"
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
        <Col>
          <AvatarUpload
            name="avatar"
            placeholder="avatar"
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col>
          <RoleRadio name="role" control={control} />
        </Col>
        <Col>
          <Button size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
