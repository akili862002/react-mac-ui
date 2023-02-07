import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Button, IButtonSize, IButtonVariant } from "../../components/Button";
import { IIconSVGProps } from "../../types/common";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: Button,
} as ComponentMeta<typeof Button>;

export const ButtonDemo: ComponentStory<typeof Button> = (args) => {
  return (
    <SectionSb title="Button">
      <Button {...args}>Button</Button>
    </SectionSb>
  );
};
ButtonDemo.args = {
  className: "w-15",
  variant: "primary",
  size: "md",
};
ButtonDemo.parameters = {
  preview: codePreview`
<Button
  className="w-15"
>
  Button
</Button>
`,
};

export const ButtonsGallery: ComponentStory<any> = () => {
  const buttonSizes: IButtonSize[] = ["sm", "md", "lg"];
  const buttonVariants: IButtonVariant[] = [
    "primary",
    "secondary",
    "danger",
    "outline",
    "text",
  ];
  return (
    <SectionSb className="max-w-desktop" title="Button gallery">
      <table>
        <thead>
          <tr>
            <th></th>
            {buttonVariants.map((variant) => (
              <th
                key={variant}
                className="px-2 py-1 bg-gray-100 border-l first:border-l-0"
              >
                {variant}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {buttonSizes.map((size) => (
            <tr key={size}>
              <td className="p-1 font-bold bg-gray-100 border-b">{size}</td>
              {buttonVariants.map((variant) => (
                <td className="p-2 border-b border-r">
                  <Button className="capitalize" variant={variant} size={size}>
                    {variant}
                  </Button>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-1 font-bold bg-gray-100 border-b">With icon</td>
            {buttonVariants.map((variant) => (
              <td className="p-2 border-b border-r">
                <Button
                  icon={<ChatIcon />}
                  className="capitalize"
                  variant={variant}
                >
                  {variant}
                </Button>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-1 font-bold bg-gray-100 border-b">Loading</td>
            {buttonVariants.map((variant) => (
              <td className="p-2 border-b border-r">
                <Button loading className="capitalize" variant={variant}>
                  {variant}
                </Button>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-1 font-bold bg-gray-100 border-b">Disabled</td>
            {buttonVariants.map((variant) => (
              <td className="p-2 border-b border-r">
                <Button disabled className="capitalize" variant={variant}>
                  {variant}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </SectionSb>
  );
};

const ChatIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="icon-md"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
    />
  </svg>
);
