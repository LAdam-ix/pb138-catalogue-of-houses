import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export const OrderDone = () => {
  return (
    <Result
      status="success"
      title="Thank you for your order"
      extra={
        <Link to='/'>
          <Button>Back</Button>
        </Link>
      }
    />
  );
};
