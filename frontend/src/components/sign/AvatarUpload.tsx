import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type InputFieldProps = {
  name: string;
  placeholder: string;
  control: Control<FieldValues, unknown>;
  errors: FieldErrors<FieldValues>;
};

export const AvatarUpload = (props: InputFieldProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <Form.Item help={props.errors[props.name]?.message?.toString()}>
          <Upload {...field} maxCount={1} listType="picture-circle">
            <div>
              <PlusOutlined />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      )}
    />
  );
};
