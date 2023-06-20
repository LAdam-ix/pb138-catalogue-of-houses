import React from "react";
import { Row, Col, Pagination } from "antd";
import { DesignCard } from "./DesignCard";
import { DesignsAPI } from "../../services";
import { useQuery } from "react-query";

export const DesignsGrid = () => {
  const {data: designsResponse} = useQuery({
    queryKey: ['houses'],
    queryFn: () => DesignsAPI.getAll(),
  });

  if (!designsResponse) {return <>Loading...</>}
  console.log(designsResponse);
  
  return (
    <Row gutter={[16, 16]} justify="center">
      {designsResponse.data.map((design) => (
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
