import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { Form, InputNumber } from "antd";

type InputFieldProps = {
  name: string;
  placeholder: string;
  control: Control<FieldValues, unknown>;
  errors: FieldErrors<FieldValues>;
};

export const PriceField = (props: InputFieldProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <Form.Item help={props.errors[props.name]?.message?.toString()}>
          <InputNumber
            defaultValue={0}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            size="large"
            {...field}
            placeholder={props.placeholder}
            status={props.errors[props.name]?.message ? "error" : ""}
            style={{ width: "100%" }}
          />
        </Form.Item>
      )}
    />
  );
};
