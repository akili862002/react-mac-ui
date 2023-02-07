import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { codePreview } from "../utils";

export default {
  component: null,
} as ComponentMeta<any>;

export const ClassNameUtils: ComponentStory<any> = (args) => {
  return (
    <div className="w-90">
      <div className="p-1 bg-gray-100 rounded-lg">
        <code className="whitespace-pre">
          {`
...

cn("text-gray-white bg-white", "focus:text-lg focus:ring-2")  
=> "text-gray-white bg-white focus:text-lg focus:ring-2"
cn("bg-white bg-black")
=> "bg-black"
      `}
        </code>
      </div>
      <div className="mt-5">
        <p>cn is created by merge of classnames library and tailwind-merge</p>
        <ul className="pl-2 text-gray-500 underline list-disc">
          <li>
            <a target="_" href="https://www.npmjs.com/package/tailwind-merge">
              tailwind-merge
            </a>
          </li>
          <li>
            <a target="_" href="https://www.npmjs.com/package/classnames">
              classnames
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
ClassNameUtils.args = {};
ClassNameUtils.parameters = {
  preview: codePreview`
...
return (
  ...
  <ClassName 
  />
  ...
)
  `,
};
