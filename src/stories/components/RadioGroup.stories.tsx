import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { FormikForm } from "../../components/FormikForm";
import { RadioGroup } from "../../components/RadioGroup";
import {
  BaseRadioGroup,
  IBaseGroupRadioProps,
} from "../../components/RadioGroup/BaseGroupRadio";
import { IStaff, staffs } from "../data";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: BaseRadioGroup,
} as ComponentMeta<typeof BaseRadioGroup>;

export const BaseRadioGroupDemo: ComponentStory<typeof BaseRadioGroup> = (
  args
) => {
  return (
    <SectionSb title="BaseRadioGroup Demo">
      <BaseRadioGroup {...args} />
    </SectionSb>
  );
};
BaseRadioGroupDemo.parameters = {
  preview: codePreview`
type IGender = "Male" | "Female" | "Unknown";
const genders: IGender[] = ["Male", "Female", "Unknown"];

const [genderSelected, setGenderSelected] = useState<IGender>("Male");  

<BaseRadioGroup 
  label="Male"
  options={genders}
  optionSelected={genderSelected}
  onChange={setGenderSelected}
  renderOption={({ option, checked }) => option}
/>
  `,
};
BaseRadioGroupDemo.args = {
  options: ["Male", "Female", "Unknown"],
  optionSelected: "Male",
  label: "Gender",
  renderOption: ({ option, checked }) => option as any,
};

export const WithListObjectDemo: ComponentStory<typeof BaseRadioGroup> = (
  args
) => {
  const [optionSelected, setOptionSelected] = useState<IStaff>(null);

  return (
    <SectionSb title="BaseRadioGroup with objects">
      <BaseRadioGroup
        {...args}
        optionSelected={optionSelected}
        onChange={setOptionSelected as any}
      />
    </SectionSb>
  );
};
WithListObjectDemo.parameters = {
  preview: codePreview`
type IStaff = {
  firstName: string;
  lastName: string;
}
...
const [optionSelected, setOptionSelected] = useState<IStaff>(null);
...
<BaseRadioGroup
  label="Project owner"
  options={staffs}
  optionSelected={optionSelected}
  onChange={setOptionSelected}
  renderOption={({ option, checked }) => (
    <p className={checked && "text-gray-700"}>
      {[option.firstName, option.lastName].join(" ")}
    </p>
  )}
/>
  `,
};
WithListObjectDemo.args = {
  className: "",
  label: "Project owner",
  options: staffs,
  renderOption: ({ option, checked }) => (
    <p className={checked && "text-gray-700"}>
      {[option.firstName, option.lastName].join(" ")}
    </p>
  ),
} as IBaseGroupRadioProps<IStaff>;

export const RadioGroupDemo: ComponentStory<typeof RadioGroup> = (args) => {
  return (
    <SectionSb title="RadioGroup Demo">
      <FormikForm
        className="w-50"
        initValues={{
          projectOwner: null as IStaff,
        }}
        yupSchema={(yup) => ({
          projectOwner: yup.object().nullable().required(),
        })}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ fieldProps }) => (
          <>
            <RadioGroup
              {...fieldProps.projectOwner}
              label="Project owner"
              options={staffs}
              renderOption={({ option, checked }) => (
                <p className={checked && "text-gray-700"}>
                  {[option.firstName, option.lastName].join(" ")}
                </p>
              )}
            />
            <Button type="submit">Submit</Button>
          </>
        )}
      </FormikForm>
    </SectionSb>
  );
};
RadioGroupDemo.parameters = {
  preview: codePreview`
<FormikForm
  className="w-50"
  initValues={{
    projectOwner: null as IStaff,
  }}
  yupSchema={(yup) => ({
    projectOwner: yup.object().nullable().required(),
  })}
  onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
>
  {({ fieldProps }) => (
    <>
      <RadioGroup
        {...fieldProps.projectOwner}
        label="Project owner"
        options={staffs}
        renderOption={({ option, checked }) => (
          <p className={checked && "text-gray-700"}>
            {[option.firstName, option.lastName].join(" ")}
          </p>
        )}
      />
      <Button type="submit">Submit</Button>
    </>
  )}
</FormikForm>
  `,
};
RadioGroupDemo.args = {};
