import { Row, Col } from "antd";
import { DesignsGrid } from "./DesignsGrid";

export const Body = () => {
  return (
    <Row className="mt-3">
      <Col span={24} lg={{ span: 16, offset: 4 }}>
        <DesignsGrid />
      </Col>
    </Row>
  );
};
