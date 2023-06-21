import { Row, Col } from "antd";
import { DesignsGrid } from "./DesignsGrid";
import { useQuery } from "react-query";
import { DesignsAPI } from "../../services";

export const Body = () => {
  const {data: response} = useQuery({
    queryKey: ['houses'],
    queryFn: () => DesignsAPI.getAll(),
  });

  if (!response) {return <>Loading...</>}
  
  return (
    <Row className="mt-3">
      <Col span={24} lg={{ span: 16, offset: 4 }}>
        <DesignsGrid designs={response.data}/>
      </Col>
    </Row>
  );
};
