import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { BaseCheckbox } from "../../components/Checkbox/BaseCheckbox";
import { FormikForm } from "../../components/FormikForm";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: BaseCheckbox,
} as ComponentMeta<typeof BaseCheckbox>;

export const BaseCheckboxDemo: ComponentStory<typeof BaseCheckbox> = (args) => {
  return (
    <SectionSb title="BaseCheckbox">
      <BaseCheckbox {...args} />
    </SectionSb>
  );
};
BaseCheckboxDemo.args = {
  checked: false,
  isError: false,
  label: "I agree to terms and conditions",
};
BaseCheckboxDemo.parameters = {
  preview: codePreview`
const [isChecked, setIsChecked] = useState(false);
...
return (
  ...
  <BaseCheckbox 
    label="I agree to terms and conditions"
    checked={isChecked}
    onChange={setIsChecked}
  />
  ...
)
  `,
};

export const CheckboxDemo: ComponentStory<typeof Checkbox> = (args) => {
  return (
    <SectionSb title="Checkbox">
      <FormikForm
        initValues={{
          isAgree: false,
        }}
        yupSchema={(yup) => ({
          isAgree: yup.boolean().isTrue(),
        })}
        onSubmit={(values) => alert(JSON.stringify(values))}
      >
        {({ fieldProps }) => (
          <>
            <Checkbox
              {...fieldProps.isAgree}
              label="I agree to terms and conditions (in form)"
            />
            <Button type="submit">Submit</Button>
          </>
        )}
      </FormikForm>
    </SectionSb>
  );
};
CheckboxDemo.args = {};
CheckboxDemo.parameters = {
  preview: codePreview`
<FormikForm
  initValues={{
    isAgree: false,
  }}
  yupSchema={(yup) => ({
    isAgree: yup.bool().isTrue(),
  })}
  onSubmit={(values) => alert("Submit")}
>
  {({ fieldProps }) => (
    <>
      <Checkbox
        {...fieldProps.isAgree}
        label="I agree to terms and conditions (in form)"
      />
      <Button type="submit">Submit</Button>
    </>
  )}
</FormikForm> 
  `,
};
