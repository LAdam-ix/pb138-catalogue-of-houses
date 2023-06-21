import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { Form, Rate } from "antd";

type RateInputProps = {
  name: string;
  control: Control<FieldValues, unknown>;
  errors: FieldErrors<FieldValues>;
};


export const RateInput = (props: RateInputProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({field}) => (
        <Form.Item help={props.errors[props.name]?.message?.toString()}>
          <Rate
            {...field}
          />
        </Form.Item>
      )}
    />
  );
};
