import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export const PurchaseDone = () => {
  return (
    <Result
      status="success"
      title="Thank you for your purchase"
      extra={
        <Link to='/'>
          <Button>Back</Button>
        </Link>
      }
    />
  );
};
