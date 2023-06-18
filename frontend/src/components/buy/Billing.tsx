import { Row, Col, Card } from 'antd';
import { BillingForm } from './BillingForm';

export const Billing = () => {
  return (
    <Row align="middle" justify="center">
      <Col xs={24} xl={12}>
        <Card title="Fill in billing info">
          <BillingForm />
        </Card>
      </Col>
    </Row>
  );
};
