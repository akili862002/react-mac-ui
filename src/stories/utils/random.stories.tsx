import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { randomId } from "../../utils/random.utils";
import { codePreview } from "../utils";
import { Button } from "../../components/Button";

export default {
  component: null,
} as ComponentMeta<any>;

export const randomIdUtils: ComponentStory<any> = (args) => {
  return (
    <div className="w-90">
      <div className="p-1 bg-gray-100 rounded-lg">
        <code className="whitespace-pre">
          {`
...

randomId()

      `}
        </code>
      </div>
      <div className="mt-5">
        <h1 className="font-bold text-xxl">Demo</h1>
        <div className="mt-2">
          <Button onClick={() => alert(randomId())}>Random id</Button>
        </div>
      </div>
    </div>
  );
};
randomIdUtils.args = {};
randomIdUtils.parameters = {
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
