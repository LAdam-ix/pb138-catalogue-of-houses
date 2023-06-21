import { Select } from "antd";

export const PriceSelect = () => {
  return (
    <Select
      defaultValue="price1"
      size="large"
      options={[
        { value: "price1", label: "Price1" },
        { value: "price2", label: "Price2" },
        { value: "price2", label: "Price3" },
      ]}
    />
  );
};
