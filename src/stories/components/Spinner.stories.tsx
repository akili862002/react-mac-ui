import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { codePreview } from "../utils";
import { SectionSb } from "../StoryLayout";
import { Spinner } from "../../components/Spinner";

export default {
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

export const SpinnerDemo: ComponentStory<typeof Spinner> = (args) => {
  return (
    <SectionSb title="Spinner Demo">
      <Spinner {...args} />
    </SectionSb>
  );
};
SpinnerDemo.argTypes = {
  size: {
    control: {
      type: "range",
      min: 10,
      max: 150,
      step: 1,
    },
  },
};
SpinnerDemo.args = {
  size: 24,
};
SpinnerDemo.parameters = {
  preview: codePreview`
<Spinner />
    `,
};
