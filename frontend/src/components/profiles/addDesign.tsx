import { Card, Col, Row } from "antd";
import { Header } from "../sign/Header";
import { Footer } from "../main/common/footer";
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