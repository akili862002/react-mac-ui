import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useRef } from "react";
import { Button } from "../../components/Button";
import { FormikForm } from "../../components/FormikForm";
import { TextField } from "../../components/TextField";
import {
  BaseTextField,
  IBaseTextFieldRef,
} from "../../components/TextField/BaseTextField";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";
import { IIconSVGProps } from "../../types/common";

export default {
  component: BaseTextField,
} as ComponentMeta<typeof BaseTextField>;

export const BaseTextFieldDemo: ComponentStory<typeof BaseTextField> = (
  args
) => {
  const textFieldRef = useRef<IBaseTextFieldRef>();

  return (
    <SectionSb title="BaseTextField Demo">
      <BaseTextField ref={textFieldRef} {...(args as any)} />
      <div className="flex mt-4 space-x-2">
        <Button onClick={() => alert(textFieldRef.current.getValue())}>
          Get value
        </Button>
        <Button onClick={() => alert(textFieldRef.current.setValue("Alo Alo"))}>
          Set "Alo Alo"
        </Button>
      </div>
    </SectionSb>
  );
};
BaseTextFieldDemo.args = {
  label: "Text field",
  className: "w-30",
  placeholder: "abc",
  type: "text",
};
BaseTextFieldDemo.parameters = {
  preview: codePreview`
<BaseTextField 
  label="Text field"
  className="w-30"
  placeholder="abc"
  onChangeValue={value => {}}
/>
  `,
};

const SearchIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="icon-sm"
  >
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);
export const WithIconDemo: ComponentStory<typeof BaseTextField> = (args) => {
  return (
    <SectionSb title="TextField with icon" className="">
      <BaseTextField {...args} />
    </SectionSb>
  );
};
WithIconDemo.args = {
  label: "Text field",
  className: "w-30",
  placeholder: "abc",
  type: "text",
  iconLeft: <SearchIcon />,
};

export const TextFieldDemo: ComponentStory<typeof TextField> = (args) => {
  return (
    <SectionSb title="TextField Demo">
      <FormikForm
        className="w-30"
        initValues={{
          email: "",
          password: "",
        }}
        yupSchema={(yup) => ({
          email: yup.string().email().required(),
          password: yup.string().min(4).required(),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({ fieldProps }) => (
          <>
            <TextField
              {...fieldProps.email}
              label="Email"
              placeholder="example@gmail.com"
            />
            <TextField
              {...fieldProps.password}
              type="password"
              label="Password"
              placeholder="••••••"
            />
            <Button type="submit">Login</Button>
          </>
        )}
      </FormikForm>
    </SectionSb>
  );
};
TextFieldDemo.parameters = {
  preview: codePreview`
<FormikForm
  className="w-30"
  initValues={{
    email: "",
    password: "",
  }}
  yupSchema={(yup) => ({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  })}
  onSubmit={(values) => {
    alert(JSON.stringify(values));
  }}
>
  {({ fieldProps }) => (
    <>
      <TextField
        {...fieldProps.email}
        label="Email"
        placeholder="example@gmail.com"
      />
      <TextField
        {...fieldProps.password}
        label="Password"
        placeholder="••••••"
      />
      <Button type="submit">Login</Button>
    </>
  )}
</FormikForm>
    `,
};
