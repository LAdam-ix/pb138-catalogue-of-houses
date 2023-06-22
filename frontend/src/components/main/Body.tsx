import { Row, Col } from "antd";
import { DesignsGrid } from "../designs/DesignsGrid";
import { useQuery } from "react-query";
import { DesignsAPI } from "../../services";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { designsFilter, fetchedDesigns } from "../../state/atoms";
import { filteredDesigns } from "../../state/selectors";

export const Body = () => {
  const setFetchedResults = useSetRecoilState(fetchedDesigns);
  const filteredResults = useRecoilValue(filteredDesigns);
  const { sortType } = useRecoilValue(designsFilter);

  const { data: response } = useQuery({
    queryKey: ['houses'],
    queryFn: () => DesignsAPI.getAll(),
  });

  if (!response) { return <>Loading...</> }
  setFetchedResults(response.data)
  const sortedResults = Array(...filteredResults).sort((a, b) =>
    sortType === 'price-lh' ? a.price - b.price : b.price - a.price);


  return (
    <Row className="mt-3">
      <Col span={22} offset={1} lg={{ span: 16, offset: 4 }}>
        <DesignsGrid designs={sortType === 'none' ? filteredResults : sortedResults} />
      </Col>
    </Row>
  );
};
