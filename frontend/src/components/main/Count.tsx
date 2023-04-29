import { Col } from "antd";
import "../../assets/styles/main.css";

type CountProps = {
  number: number,
  text: string,
}

export const Count = (props: CountProps) => {
  return (
    <Col span={12}>
      <h2 className="m0">{props.number}</h2>
      <h3 className="m0">{props.text}</h3>
    </Col>
  );
};
