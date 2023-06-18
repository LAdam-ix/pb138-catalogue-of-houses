import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag } from "antd";

export const Footer = () => {
  return (
    <Row justify="center" className="mt-3">
      <Col span={24}>
        <Card className="bg-gradient">
          <Col span={12} md={{ span: 5, offset: 4 }}>
            <Space>
              <Tag icon={<TwitterOutlined />} color="#55acee">
                Twitter
              </Tag>
              <Tag icon={<InstagramOutlined />} color="#E1306C">
                Instagram
              </Tag>
              <Tag icon={<FacebookOutlined />} color="#3b5999">
                Facebook
              </Tag>
            </Space>
          </Col>
        </Card>
      </Col>
    </Row>
  );
};
