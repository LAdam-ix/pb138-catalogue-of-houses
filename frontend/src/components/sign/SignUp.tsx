import { Row, Col, Card } from "antd";
import { SignUpForm } from "./SignUpForm";
import { Header } from "./Header";

export const SignUp = () => {
  return (
    <>
      <Header />
      <Row justify="center" className="mt-3">
        <Col span={24} md={12} lg={8}>
          <Card title="Sign Up">
            <SignUpForm />
          </Card>
        </Col>
      </Row>
    </>
  );
};
