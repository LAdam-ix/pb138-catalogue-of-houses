import Table, { ColumnsType } from "antd/es/table";
import { OrderResult } from "../types/OrderType";
import { Header } from "../common/Header";
import { Card } from "antd";
import { useLocation } from "react-router-dom";

const columns: ColumnsType<OrderResult> = [
  {
    title: 'Designer',
    dataIndex: 'designerName',
    key: 'designerName',
    render: (text, record) => <a>{text}</a>,
  },
  {
    title: 'Design',
    dataIndex: 'designName',
    key: 'designName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
]

interface OrdersProps {
  label: string,
  orders: OrderResult[]
}

export const Orders = () => {
  const location = useLocation();

  const props: OrdersProps = location.state
  return (
    <>
      <Header />
      <Card title={props.label}>
        <Table columns={columns} dataSource={[]} />
      </Card>
    </>
  )
}