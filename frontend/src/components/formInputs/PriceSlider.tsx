import { Slider } from "antd";
import { useRecoilState } from "recoil";
import { designsFilter } from "../../state/atoms";

export const PriceSlider = () => {
    const [filterData, setFilterData] = useRecoilState(designsFilter)
    const onPriceSlider = (value: [number, number]) => {
      setFilterData({
        ...filterData,
        priceRange: value
      })
    }
    return (
      <Slider range defaultValue={[0, 800000]} max={1000000} step={100000} onChange={onPriceSlider} />
    )
}