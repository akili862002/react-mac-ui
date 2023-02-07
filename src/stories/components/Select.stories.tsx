import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { FormikForm } from "../../components/FormikForm";
import { Select } from "../../components/Select";
import { BaseSelect } from "../../components/Select/BaseSelect";
import { IStaff, staffs } from "../data";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: BaseSelect,
} as ComponentMeta<typeof BaseSelect>;

export const BaseSelectDemo: ComponentStory<typeof BaseSelect> = (args) => {
  const [optionSelected, setOptionSelected] = useState(null);
  return (
    <SectionSb title="BaseSelect Demo">
      <BaseSelect
        {...(args as any)}
        optionSelected={optionSelected}
        onSelect={setOptionSelected as any}
      />
    </SectionSb>
  );
};
BaseSelectDemo.args = {
  className: "max-w-30",
  label: "Select something",
  placeholder: "Select one",
  options: staffs,
  renderOption: (({ firstName, lastName }: IStaff) =>
    `${firstName} ${lastName}`) as any,
};

BaseSelectDemo.parameters = {
  preview: codePreview`
type Option = {
  _id: string;
  name: string;
  ...
}
...
const [listOptions, setListOptions] = useState<Option[]>([...]);
const [optionSelected, setOptionSelected] = useState<Option>(null);
...
return (
  <BaseSelect
    className=""
    label="Select something"
    placeholder="Select one"
    options={listOptions}
    optionSelected={optionSelected}
    onSelect={setOptionSelected}
    renderOption={(option) => option.name}
  />
)`,
};

export const WithIcon = BaseSelectDemo.bind({});
WithIcon.args = {
  className: "max-w-30",
  label: "Select something",
  placeholder: "Select one",
  options: staffs,
  renderOption: (({ firstName, lastName }: IStaff) =>
    `${firstName} ${lastName}`) as any,
  iconLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="icon-sm"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      />
    </svg>
  ),
};
WithIcon.parameters = {
  preview: codePreview`
<BaseSelect
  ...
  iconLeft={<UpDownIcon />}
  ...
/> 
  `,
};

export const SelectDemo: ComponentStory<typeof Select> = (args) => {
  return (
    <SectionSb title="Select Demo">
      <FormikForm
        className="w-30"
        initValues={{
          staff: null,
        }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        yupSchema={(yup) => ({
          staff: yup.object().nullable().required(),
        })}
      >
        {({ fieldProps }) => {
          return (
            <>
              <Select
                {...fieldProps.staff}
                label="Select"
                placeholder="Select one"
                options={staffs}
                filterKeys={["firstName"]}
                renderOption={(option) => option.firstName}
              />
              <Button type="submit">Select</Button>
            </>
          );
        }}
      </FormikForm>
    </SectionSb>
  );
};
SelectDemo.parameters = {
  preview: codePreview`
type Staff = {
  _id: string;
  name: string;
  ...
}
...
const [staffs, setStaffs] = useState<Staff[]>([...]);
const [staffSelected, setStaffSelected] = useState<Staff | null>(null);
...
return (
  <FormikForm
      className="w-30"
      initValues={{
        staff: null,
      }}
      onSubmit={(values) => alert("SUBMIT")}
      yupSchema={(yup) => ({
        staff: yup.object().nullable().required(),
      })}
  >
    {
      ({ fieldProps }) => (
        <Select
          {...fieldProps.staff}
          label="Select 1"
          placeholder="Select one"
          options=staffs
          renderOptions={({ name }) => name}
        />
      )
    }
  </FormikForm>
)
  `,
};
