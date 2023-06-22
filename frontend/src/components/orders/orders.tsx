import Table, { ColumnsType } from "antd/es/table";
import { Header } from "../common/Header";
import { Card } from "antd";
import { useLocation } from "react-router-dom";

interface TableOrder {
  designerName: string,
  designName: string,
  price: number,
  id: string
}

const columns: ColumnsType<TableOrder> = [
  {
    title: 'Designer',
    dataIndex: 'designerName',
    key: 'designerName',
  },
  {
    title: 'Design',
    dataIndex: 'designName',
    key: 'designName',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
]

interface OrdersProps {
  label: string,
  orders: TableOrder[]
}

export const Orders = () => {
  const location = useLocation();

  const props: OrdersProps = location.state
  return (
    <>
      <Header />
      <Card title={props.label}>
        <Table columns={columns} dataSource={props.orders} />
      </Card>
    </>
  )
}