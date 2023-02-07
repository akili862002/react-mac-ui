import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BaseToggle } from "../../components/Toggle/BaseToggle";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: BaseToggle,
  parameters: {
    preview: codePreview`
const [checked, setChecked] = useState(false);

<BaseToggle 
  checked={checked}
  label="Collect shipping address"
  onChange={setChecked}
/>
      `,
  },
} as ComponentMeta<typeof BaseToggle>;

export const BaseToggleDemo: ComponentStory<typeof BaseToggle> = (args) => {
  return (
    <SectionSb title="BaseToggle Demo">
      <BaseToggle {...(args as any)} />
    </SectionSb>
  );
};
BaseToggleDemo.args = {
  label: "Collect shipping address",
  checked: false,
};
