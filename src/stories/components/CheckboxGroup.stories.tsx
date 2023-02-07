import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import {
  BaseCheckboxGroup,
  IBaseCheckboxGroupProps,
} from "../../components/CheckboxGroup/BaseCheckboxGroup";
import { codePreview } from "../utils";
import { IPlan, plans } from "../data";
import {
  CheckboxGroup,
  ICheckboxGroupProps,
} from "../../components/CheckboxGroup";
import { FormikForm } from "../../components/FormikForm";
import { Button } from "../../components/Button";
import { SectionSb } from "../StoryLayout";

export default {
  component: BaseCheckboxGroup,
} as ComponentMeta<typeof BaseCheckboxGroup>;

export const BaseCheckboxGroupDemo: ComponentStory<typeof BaseCheckboxGroup> = (
  args
) => {
  const [listPlansSelected, setListPlansSelected] = useState<IPlan[]>([]);
  return (
    <SectionSb title="BaseCheckboxGroup">
      <BaseCheckboxGroup
        {...args}
        listOptionSelected={listPlansSelected}
        onChange={setListPlansSelected as any}
      />
    </SectionSb>
  );
};
BaseCheckboxGroupDemo.args = {
  className: "w-50",
  label: "Select plans",
  options: plans,
  renderOption: ({ option }) => (
    <div>
      <p className="font-semibold text-md">{option.title}</p>
      <span className="text-sm font-light">{option.desc}</span>
    </div>
  ),
} as IBaseCheckboxGroupProps<IPlan>;
BaseCheckboxGroupDemo.parameters = {
  preview: codePreview`
<BaseCheckboxGroup
  label="Select plans"
  options={plans}
  listOptionSelected={listPlansSelected}
  onChange={setListPlansSelected}
  renderOption={({ option }) => (
    <div>
      <p className="font-semibold text-md">{option.title}</p>
      <span className="text-sm font-light">{option.desc}</span>
    </div>
  )}
/>
`,
};

export const CheckboxGroupDemo: ComponentStory<typeof CheckboxGroup> = (
  args
) => {
  return (
    <SectionSb title="CheckboxGroup">
      <FormikForm
        initValues={{
          plans: [] as IPlan[],
        }}
        yupSchema={(yup) => ({
          plans: yup
            .array()
            .min(1, "Required at least one plan selected!")
            .required(),
        })}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ fieldProps }) => (
          <>
            <CheckboxGroup
              {...fieldProps.plans}
              className="max-w-[500px] w-full"
              label="Select plan"
              options={plans}
              renderOption={({ option }) => (
                <div>
                  <p className="font-semibold text-md">{option.title}</p>
                  <span className="text-sm font-light">{option.desc}</span>
                </div>
              )}
            />
            <Button type="submit">Submit</Button>
          </>
        )}
      </FormikForm>
    </SectionSb>
  );
};

CheckboxGroupDemo.args = {} as ICheckboxGroupProps<IPlan>;
CheckboxGroupDemo.parameters = {
  preview: codePreview`
<FormikForm
  initValues={{
    plans: [] as IPlan[],
  }}
  yupSchema={(yup) => ({
    plans: yup
      .array()
      .min(1, "Required at least one plan selected!")
      .required(),
  })}
  onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
>
  {({ fieldProps }) => (
    <>
      <CheckboxGroup
        {...fieldProps.plans}
        className="w-50"
        label="Select plan"
        options={plans}
        renderOption={({ option }) => (
          <div>
            <p className="font-semibold text-md">{option.title}</p>
            <span className="text-sm font-light">{option.desc}</span>
          </div>
        )}
      />
      <Button type="submit">Submit</Button>
    </>
  )}
</FormikForm>
  `,
};
