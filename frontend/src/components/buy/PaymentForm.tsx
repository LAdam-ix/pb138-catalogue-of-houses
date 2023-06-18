import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Row, Col } from 'antd';
import { InputField } from '../forms/InputField';

const schema = yup.object({
  cardNumber: yup
    .string()
    .trim()
    .matches(/^(?:\d[ -]*?){13,16}$/, 'Invalid credit card number!')
    .required('Card number is required!'),
  holderName: yup.string().trim().required('Holder name is required!'),
  expirationDate: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      'Invalid expiration date (must be "MM/YY")!'
    )
    .required('Expiration date is required!'),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, 'Invalid CVV!')
    .required('CVV is required!'),
});

export const PaymentForm = () => {
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
      <Row>
        <Col span={12}>
          <InputField
            name="cardNumber"
            placeholder="Card #"
            control={control}
            errors={errors}
          />
        </Col>
        <Col span={11} offset={1}>
          <InputField
            name="holderName"
            placeholder="Holder name"
            control={control}
            errors={errors}
          />
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <InputField
            name="expirationDate"
            placeholder="Expiry"
            control={control}
            errors={errors}
          />
        </Col>
        <Col span={5} offset={1}>
          <InputField
            name="cvv"
            placeholder="CVV"
            control={control}
            errors={errors}
          />
        </Col>
        <Col span={6} offset={1}>
          <Button size="large" type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
