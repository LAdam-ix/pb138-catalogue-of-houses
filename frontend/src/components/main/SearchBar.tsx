import { Input } from "antd";

const { Search } = Input;

export const SearchBar = () => {
  const onSearch = (value: string) => {
    console.log(value)
  };

  return <Search placeholder="Find design" onSearch={onSearch} size="large" />;
};
