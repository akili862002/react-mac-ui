import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../../components/Button";
import { FormikForm } from "../../components/FormikForm";
import { TextArea } from "../../components/TextArea";
import { BaseTextArea } from "../../components/TextArea/BaseTextArea";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

export const BaseTextAreaDemo: ComponentStory<typeof BaseTextArea> = (args) => {
  return (
    <SectionSb title="BaseTextArea Demo">
      <BaseTextArea {...(args as any)} />
    </SectionSb>
  );
};
BaseTextAreaDemo.args = {
  label: "Text field",
  className: "w-30",
  placeholder: "abc",
  ref: null,
};
BaseTextAreaDemo.parameters = {
  preview: codePreview`
<BaseTextArea 
  label="Text field"
  className="w-30"
  placeholder="abc"
/>
  `,
};

export const TextAreaDemo: ComponentStory<typeof TextArea> = (args) => {
  return (
    <SectionSb title="TextArea Demo">
      <FormikForm
        className="w-30"
        initValues={{
          description: "",
        }}
        yupSchema={(yup) => ({
          description: yup.string().min(4).required(),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({ fieldProps }) => (
          <>
            <TextArea
              {...fieldProps.description}
              inputClassName="min-h-[150px]"
              label="Description"
              placeholder="I'm have an idea to improve your app..."
            />
            <Button type="submit">Submit</Button>
          </>
        )}
      </FormikForm>
    </SectionSb>
  );
};
TextAreaDemo.parameters = {
  preview: codePreview`
<FormikForm
  className="w-30"
  initValues={{
    description: "",
  }}
  yupSchema={(yup) => ({
    description: yup.string().min(4).required(),
  })}
  onSubmit={(values) => {
    alert(JSON.stringify(values));
  }}
>
  {({ fieldProps }) => (
    <>
      <TextArea
        {...fieldProps.description}
        inputClassName="min-h-[150px]"
        label="Description"
        placeholder="I'm have an idea to improve your app..."
      />
      <Button type="submit">Submit</Button>
    </>
  )}
</FormikForm>
    `,
};
