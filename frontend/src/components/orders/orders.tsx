import Table, { ColumnsType } from "antd/es/table";
import { OrderType } from "../types/OrderType";
import { Header } from "../common/Header";
import { Card } from "antd";

const columns: ColumnsType<OrderType> = [
  {
    title: 'Designer',
    dataIndex: 'designerName',
    key: 'designerName',
    render: (text) => <a>{text}</a>,
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

const data: OrderType[] = [
  {
    id: "1",
    designerName: "designer",
    customerName: "customer",
    designName: "house",
    price: 100,
  }
]

export const Orders = () => {
    return (
      <>
        <Header />
        <Card title="Sent orders">
          <Table columns={columns} dataSource={data} />
        </Card>
      </>
    )
}