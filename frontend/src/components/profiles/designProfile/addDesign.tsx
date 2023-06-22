import { Card, Col, Row } from "antd";
import { Header } from "../../common/Header";
import { Footer } from "../../common/Footer";
import { AddDesignForm } from "./addDesignForm";

export const AddDesign = () => {
  return (
    <>
      <Header />
      <Row justify="center" className="mt-3">
        <Col span={24} md={12} lg={8}>
          <Card title="Add design">
            <AddDesignForm />
          </Card>
        </Col>
      </Row>
      <Footer />
    </>
  )
}