import { Button, Form, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../forms/InputField";
import { AvatarUpload } from "../forms/AvatarUpload";
import { PasswordField } from "../forms/PasswordField";
import { RoleRadio } from "../forms/RoleRadio";
import { AccountsAPI } from "../../services";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Username has to be at least 2 characters long!")
    .required("Username is required!"),
  surname: yup
    .string()
    .min(2, "Username has to be at least 2 characters long!")
    .required("Username is required!"),
  email: yup
    .string()
    .email("Email has invalid format!")
    .required("Email is required!"),
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
    const request = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      type: data.role == "Designer" ? "DESIGNER" : "USER"
    }
    

    console.log(request);
    AccountsAPI.registerAccount(request).then(response => {
      //TODO GOTO TO MAIN PAGE
      console.log(response.data);
    }).catch(error => {
      //TODO DISPLAY MESSAGE OR SMTH IDK
      console.log(error.data);
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
      <InputField
        name="surname"
        placeholder="Surname"
        control={control}
        errors={errors}
      />
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
