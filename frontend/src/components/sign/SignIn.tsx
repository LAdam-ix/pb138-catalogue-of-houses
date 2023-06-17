import { Row, Col, Card } from "antd";
import { SignInForm } from "./SignInForm";
import { Header } from "./Header";
import { Footer } from "../main/common/footer";

export const SignIn = () => {
  return (
    <>
      <Header />
      <Row justify="center" className="mt-3">
        <Col span={24} md={12} lg={8}>
          <Card title="Sign Up">
            <SignInForm />
          </Card>
        </Col>
      </Row>
      <Footer />
    </>
  );
};