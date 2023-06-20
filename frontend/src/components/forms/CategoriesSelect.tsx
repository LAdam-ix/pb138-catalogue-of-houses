import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { Form, Select } from "antd";

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
            defaultValue="choose"
            size="large"
            {...field}
            placeholder={props.placeholder}
            status={props.errors[props.name]?.message ? "error" : ""}
            options={[
              // MAP CATEGPRIES
              { value: "choose", label: "Choose category" },
              { value: "category1", label: "Category1" },
              { value: "category2", label: "Category2" },
              { value: "category3", label: "Category3" },
            ]}
          />
        </Form.Item>
      )}
    />
  );
};
