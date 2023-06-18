import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Row, Col, Form, Button } from 'antd';
import { AddressForm } from './AddressForm';
import { InputField } from '../forms/InputField';
// WHEN ALL INFO OK -> PURCHASEDONE
const schema = yup.object({
  name: yup.string().required('Name is required!'),
  surname: yup.string().required('Surname is required!'),
  email: yup
    .string()
    .email('Email is in wrong format!')
    .required('Email is required!'),
  phoneNumber: yup
    .string()
    .trim()
    .matches(
      /^\+[0-9]{12}$/,
      'Phone number has to be in format: +XXXXXXXXXXXX!'
    )
    .required('Phone number is required!'),
  address: yup.string().required('Address is required!'),
  city: yup.string().required('City is required!'),
  stateOrProvince: yup.string().required('State is required!'),
  country: yup.string().required('Country is required!'),
  zipCode: yup.string().required('Zip code is required!'),
});

export const BillingForm = () => {
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
      <Row justify="center">
        <Col span={24} lg={12}>
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
          <InputField
            name="phoneNumber"
            placeholder="Phone number"
            control={control}
            errors={errors}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AddressForm control={control} errors={errors} />
        </Col>
      </Row>
      <Row justify="center">
        <Button size="large" type="primary" htmlType="submit">
          Submit
        </Button>
      </Row>
    </Form>
  );
};
