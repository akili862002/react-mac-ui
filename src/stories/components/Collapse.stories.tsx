import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Collapse } from "../../components/Collapse";
import { cn } from "../../utils/classnames.utils";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: Collapse,
} as ComponentMeta<typeof Collapse>;

export const CollapseDemo: ComponentStory<typeof Collapse> = (args) => {
  return (
    <SectionSb title="Collapse">
      <Collapse>
        <Collapse.Button
          className={({ open }) =>
            cn(
              "px-1 w-full text-left py-1 rounded-lg bg-gray-700 text-white font-semibold",
              open && "rounded-b-none"
            )
          }
        >
          {({ open }) => (
            <div>{open ? "Latest updates (Open)" : "Latest updates"}</div>
          )}
        </Collapse.Button>
        <Collapse.Panel>
          <div className={cn("p-1 rounded-b-lg bg-gray-200")}>
            <ul className="pl-2 list-disc">
              <li>Recent updates</li>
              <li>12 Halloween Shirt Ideas to Creep It Real This Fall</li>
              <li>10 Steps to Jumpstarting Your Holiday Preparations</li>
              <li>How to Market a Clothing Brand Online: 14 Easy Ways</li>
              <li>How to Choose Print-on-Demand Products for Your Store</li>
              <li>How to Make Your First Sale With Print-on-Demand</li>
            </ul>
          </div>
        </Collapse.Panel>
      </Collapse>
    </SectionSb>
  );
};
CollapseDemo.args = {};
CollapseDemo.parameters = {
  preview: codePreview`
<Collapse 
  label="Min age"
  defaultValue={0}
  min={0}
  max={100}
  step={2}
  onScrubEnd={value => ...}
/>
  `,
};
