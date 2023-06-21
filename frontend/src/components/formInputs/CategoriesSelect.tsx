import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { Form, Select } from "antd";
import { CategoryEnum } from "../types";

type InputFieldProps = {
  name: string;
  placeholder: string;
  control: Control<FieldValues, unknown>;
  errors: FieldErrors<FieldValues>;
};

export const CategoriesSelect = (props: InputFieldProps) => {
  
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <Form.Item help={props.errors[props.name]?.message?.toString()}>
          <Select
            defaultActiveFirstOption={true}
            size="large"
            {...field}
            placeholder={props.placeholder}
            status={props.errors[props.name]?.message ? "error" : ""}
            options={CategoryEnum}
          />
        </Form.Item>
      )}
    />
  );
};
