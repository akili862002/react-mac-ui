import React from "react";
import { Dropdown } from "../../components/Dropdown";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { codePreview } from "../utils";
import { cn } from "../../utils/classnames.utils";
import { IIconSVGProps } from "../../types/common";
import { SectionSb } from "../StoryLayout";
import { Button } from "../../components/Button";

export default {
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const notifications = [
  {
    title: `New message from Alicia`,
    desc: "13 minutes ago",
    image:
      "https://demos.creative-tim.com/purity-ui-dashboard/static/media/avatar1.eeef2af6.png",
  },
  {
    title: `New message from Josh Henry`,
    image:
      "https://demos.creative-tim.com/purity-ui-dashboard/static/media/avatar2.5692c39d.png",
    desc: "2 days ago",
  },
  {
    title: `New message from Alicia`,
    image:
      "https://demos.creative-tim.com/purity-ui-dashboard/static/media/avatar3.9f646ac5.png",
    desc: "3 days ago",
  },
];

export const DropdownDemo: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <SectionSb title="Dropdown">
      <Dropdown className="w-min" {...args}>
        <Dropdown.Button>
          {({ open }) => <Button>Show Dropdown</Button>}
        </Dropdown.Button>
        <Dropdown.Items className="w-30">
          {notifications.map(({ title, image, desc }) => (
            <Dropdown.Item className="px-1 py-0.5 flex ">
              <img className="w-4 h-4 rounded-md" src={image} />
              <div className="pl-1">
                <p className="font-bold">{title}</p>
                <p className="text-sm font-light">{desc}</p>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Items>
      </Dropdown>
    </SectionSb>
  );
};
DropdownDemo.args = {
  position: "left",
};
DropdownDemo.parameters = {
  preview: codePreview`
<Dropdown className="w-min" {...args}>
  <Dropdown.Button>
    {({ open }) => (
      <IconButton
        className={cn(
          open &&
            "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-700"
        )}
      >
        <BellIcon />
      </IconButton>
    )}
  </Dropdown.Button>
  <Dropdown.Items className="w-30">
    {notifications.map(({ title, image, desc }) => (
      <Dropdown.Item className="px-1 py-0.5 flex ">
        <img className="w-4 h-4 rounded-md" src={image} />
        <div className="pl-1">
          <p className="font-bold">{title}</p>
          <p className="text-sm font-light">{desc}</p>
        </div>
      </Dropdown.Item>
    ))}
  </Dropdown.Items>
</Dropdown>
  `,
};

const BellIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon-md"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);
