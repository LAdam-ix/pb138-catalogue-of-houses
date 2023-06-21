import React from "react";
import { Row, Col } from "antd";
import { DesignCard } from "./DesignCard";
import { HouseResult } from "../types";

interface HouseResultProps {
  designs: HouseResult[];
}

export const DesignsGrid = ({ designs }: HouseResultProps) => {
    return (
    <Row gutter={[16, 16]} justify="center">
      {designs.map((design) => (
        <Col span={24} md={{ span: 8 }} sm={{ span: 12 }} key={design.id}>
          <DesignCard {...design} />
        </Col>
      ))}

      {/* <Col>
        <Pagination defaultCurrent={1} total={50} />
      </Col> */}
    </Row>
  );
};
