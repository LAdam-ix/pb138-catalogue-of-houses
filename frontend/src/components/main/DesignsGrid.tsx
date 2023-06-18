import React from "react";
import { Row, Col, Pagination } from "antd";
import type { DesignType } from "../types/DesignType";
import { DesignCard } from "./DesignCard";

const design: DesignType = {
  id: "1234",
  name: "House Design 01",
  description: "Description of house design.",
  designerId: "4321",
  category: "house",
  pictureURL:
    "https://assets.architecturaldesigns.com/plan_assets/325000035/large/290101IY_0_1574720372.jpg",
  price: 1000,
};

export const DesignsGrid = (designs: DesignType[]) => {
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col span={24} md={{ span: 8 }} sm={{ span: 12 }}>
        <DesignCard {...design} />
      </Col>
      <Col span={24} md={{ span: 8 }} sm={{ span: 12 }}>
        <DesignCard {...design} />
      </Col>
      <Col span={24} md={{ span: 8 }} sm={{ span: 12 }}>
        <DesignCard {...design} />
      </Col>

      <Col span={24} md={{ span: 8 }} sm={{ span: 12 }}>
        <DesignCard {...design} />
      </Col>
      <Col span={24} md={{ span: 8 }} sm={{ span: 12 }}>
        <DesignCard {...design} />
      </Col>
      <Col span={24} md={{ span: 8 }} sm={{ span: 12 }}>
        <DesignCard {...design} />
      </Col>

      <Col>
        <Pagination defaultCurrent={1} total={50} />
      </Col>
    </Row>
  );
};
