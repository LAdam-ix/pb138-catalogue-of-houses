import { Row, Col, Card, Collapse, Button } from 'antd';
import { PaymentForm } from './PaymentForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { HouseResult } from '../types';
import { OrdersAPI } from '../../services';

const { Panel } = Collapse;

export const Payment = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const design: HouseResult = location.state;

  const handlePay = () => {
    console.log("google");
    const orderProps = {
      price: design.price,
      houseId: design.id,
      designerId: design.designerId,
      location: "internet :)"
    }
    OrdersAPI.postOrder(orderProps).then(result => {
      console.log(result);
      navigate('/');
    }
    )
  };
  // AFTER CHOOSING WHATEVER METHOD -> deBILLING hihi
  return (
    <Row align="middle" justify="center">
      <Col xs={24} xl={12}>
        <Card title="Select payment method">
          <Collapse>
            <Panel header="Mastercard/Visa" key={1}>
              <PaymentForm />
            </Panel>
            <Panel header="Google Pay" key={2}>
              <Button onClick={handlePay}>PAY</Button>
            </Panel>
            <Panel header="Cash" key={3}>
              <Button onClick={handlePay}>PAY</Button>
            </Panel>
          </Collapse>
        </Card>
      </Col>
    </Row>
  );
};
