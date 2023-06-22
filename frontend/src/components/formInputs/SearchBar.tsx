import { Input } from "antd";
import { useRecoilState } from "recoil";
import { designsFilter } from "../../state/atoms";

const { Search } = Input;

export const SearchBar = () => {
  const [filterData, setFilterData] = useRecoilState(designsFilter)
  const onSearch = (value: string) => {
    setFilterData({
      ...filterData,
      name: value
    })
  };

  return <Search placeholder="Find design" onSearch={onSearch} size="large" />;
};
