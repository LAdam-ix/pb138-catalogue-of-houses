import { Slider } from "antd";

export const PriceSlider = () => {
    return (
      <Slider range defaultValue={[0, 800000]} max={1000000} step={100000} />
    )
}