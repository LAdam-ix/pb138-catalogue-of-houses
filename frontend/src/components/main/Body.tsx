import { Row, Col, Card } from "antd";
import { DesignsGrid } from "./DesignsGrid";
import { DesignType } from "../types/DesignType";

export const Body = () => {
  const designs: DesignType[] = [];

  return (
    <Row className="mt-3">
      <Col span={24} lg={{ span: 16, offset: 4 }}>
        <DesignsGrid {...designs} />
      </Col>
    </Row>
  );
};
