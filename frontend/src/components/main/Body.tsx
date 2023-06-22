import { Row, Col } from "antd";
import { DesignsGrid } from "../designs/DesignsGrid";
import { useQuery } from "react-query";
import { DesignsAPI } from "../../services";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fetchedDesigns } from "../../state/atoms";
import { useEffect } from "react";
import { filteredDesigns } from "../../state/selectors";

export const Body = () => {
  const setFetchedResults = useSetRecoilState(fetchedDesigns);
  const filteredResults= useRecoilValue(filteredDesigns)

  const {data: response} = useQuery({
    queryKey: ['houses'],
    queryFn: () => DesignsAPI.getAll(),
  });

  if (!response) {return <>Loading...</>}
  setFetchedResults(response.data)

  
  return (
    <Row className="mt-3">
      <Col span={24} lg={{ span: 16, offset: 4 }}>
        <DesignsGrid designs={filteredResults}/>
      </Col>
    </Row>
  );
};
