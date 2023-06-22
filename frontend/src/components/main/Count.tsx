import { Col, Statistic } from "antd";

type CountProps = {
  number: number;
  text: string;
};

export const Count = (props: CountProps) => {
  return (
    <Col span={10}>
      <Statistic title={<span className="color-light-gray">{props.text}</span>} value={props.number} valueStyle={{ color: '#fff'}} />
    </Col>
  );
};
