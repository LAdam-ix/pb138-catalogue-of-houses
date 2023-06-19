import { Row, Col } from "antd";
import { DesignsGrid } from "./DesignsGrid";
<<<<<<< HEAD
import { DesignType } from "../types/DesignType";
=======
>>>>>>> 6532626 (feat: add design fetch)

export const Body = () => {
  return (
    <Row className="mt-3">
      <Col span={24} lg={{ span: 16, offset: 4 }}>
        <DesignsGrid />
      </Col>
    </Row>
  );
};
