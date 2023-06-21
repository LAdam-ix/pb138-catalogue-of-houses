import { Control, Controller, FieldValues } from "react-hook-form";
import { Form, Radio } from "antd";

type RoleRadioProps = {
  name: string;
  control: Control<FieldValues, unknown>;
};

export const RoleRadio = (props: RoleRadioProps) => {
  return (
    <Controller
      name="role"
      control={props.control}
      render={({ field }) => (
        <Form.Item>
          <Radio.Group
            {...field}
            size="large"
            options={["Client", "Designer"]}
            optionType="button"
            buttonStyle="solid"
            defaultValue="Client"
          />
        </Form.Item>
      )}
    />
  );
};
