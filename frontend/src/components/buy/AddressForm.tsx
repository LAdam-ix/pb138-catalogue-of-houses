import type { Control, FieldErrors, FieldValues } from 'react-hook-form';
import { Card, Col, Row } from 'antd';
import { InputField } from '../formInputs/InputField';

type AddressFormProps = {
  control: Control<FieldValues, unknown>;
  errors: FieldErrors<FieldValues>;
};

export const AddressForm = (props: AddressFormProps) => {
  return (
    <Card title="Billing address">
      <Row>
        <Col span={24}>
          <InputField
            name="address"
            placeholder="Address"
            control={props.control}
            errors={props.errors}
          />
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <InputField
            name="city"
            placeholder="City"
            control={props.control}
            errors={props.errors}
          />
        </Col>
        <Col span={11} offset={2}>
          <InputField
            name="stateOrProvince"
            placeholder="State/province"
            control={props.control}
            errors={props.errors}
          />
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <InputField
            name="country"
            placeholder="Country"
            control={props.control}
            errors={props.errors}
          />
        </Col>
        <Col span={11} offset={2}>
          <InputField
            name="zipCode"
            placeholder="Zip code"
            control={props.control}
            errors={props.errors}
          />
        </Col>
      </Row>
    </Card>
  );
};
