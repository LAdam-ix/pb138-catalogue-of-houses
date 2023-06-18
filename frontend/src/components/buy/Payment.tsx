import { Row, Col, Card, Collapse, Button } from 'antd';
import { PaymentForm } from './PaymentForm';

const { Panel } = Collapse;

export const Payment = () => {
  const handleGooglePay = () => {
    console.log("google");
  };
  const handleCash = () => {
    console.log("cash");
  };
  // AFTER CHOOSING WHATEVER METHOD -> BILLING
  return (
    <Row align="middle" justify="center">
      <Col xs={24} xl={12}>
        <Card title="Select payment method">
          <Collapse>
            <Panel header="Mastercard/Visa" key={1}>
              <PaymentForm />
            </Panel>
            <Panel header="Google Pay" key={2}>
              <Button onClick={handleGooglePay}>PAY</Button>
            </Panel>
            <Panel header="Cash" key={3}>
              <Button onClick={handleCash}>PAY</Button>
            </Panel>
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
};
