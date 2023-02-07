import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";
import { Tooltip } from "../../components/Tooltip";

export default {
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export const TooltipDemo: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <SectionSb title="Tooltip Demo">
      <Tooltip {...args}>
        <div className="p-1 border rounded-md w-fit">Hey, Hover me</div>
      </Tooltip>
    </SectionSb>
  );
};
TooltipDemo.args = {
  place: "bottom",
  tooltip: "This is tooltip",
};
TooltipDemo.parameters = {
  preview: codePreview`
<Tooltip tooltip="This is tooltip">
  <div className="p-1 border rounded-md">Hey, Hover me</div>
</Tooltip>
    `,
};
