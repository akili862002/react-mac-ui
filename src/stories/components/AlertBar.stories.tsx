import { ComponentStory } from "@storybook/react";
import React from "react";
import { useEffect } from "react";
import { alertBar, AlertBar, IAlertBarType } from "../../components/AlertBar";
import { useAlertBar } from "../../components/AlertBar/AlertBar";
import { Button } from "../../components/Button";
import { FormikForm } from "../../components/FormikForm";
import { RadioGroup } from "../../components/RadioGroup";
import { TextField } from "../../components/TextField";
import { IIconSVGProps } from "../../types/common";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: null,
  parameters: {
    preview: codePreview`
const [alertBar, AlertBar] = useAlertBar();

...
  // Call alert bar anywhere in component
  alertBar.info("This is info message");
  alertBar.error("This is error message");
  alertBar.warning("This is warning message");
  alertBar.success(<p>This is success message</p>);
...

return (
  ...
  {AlertBar}
  ...
)
    `,
  },
};

const LOGIN = "LOGIN";

export const AlertBarDemo: ComponentStory<any> = (args) => {
  const [alert, AlertBar] = useAlertBar();

  return (
    <SectionSb title="Alert Bar">
      {AlertBar}
      Call {`alert.${args.type}("${args.message}")`}
      <Button
        className="mt-1"
        onClick={() => {
          alert[args.type](args.message);
        }}
      >
        Execute
      </Button>
    </SectionSb>
  );
};
AlertBarDemo.argTypes = {
  type: {
    options: ["info", "error", "warning", "success"],
    control: { type: "select" },
  },
};
AlertBarDemo.args = {
  type: "info",
  message: "This is alert bar",
};

export const Demo: ComponentStory<any> = () => {
  const [alertBar1, AlertBar1] = useAlertBar();
  const [alertBar2, AlertBar2] = useAlertBar();
  const [alertBar3, AlertBar3] = useAlertBar();
  const [alertBar4, AlertBar4] = useAlertBar();

  useEffect(() => {
    // alert success with many line
    alertBar2.info("This is info message!");
    alertBar1.success("Congratulation! you have successfully login!");
    alertBar3.warning(
      <p>
        <b>Warning!</b>
        <p>This is warning message!</p>
      </p>
    );
    alertBar4.error(
      <div>
        <p>This is error message!</p>
        <a className="flex items-center gap-0.5 mt-1 cursor-pointer hover:underline font-semibold px-1 rounded-md py-0.5 border border-red-600">
          Learn more
          <RightIcon />
        </a>
      </div>
    );
  }, []);

  return (
    <SectionSb title="All AlertBar">
      {AlertBar1}
      {AlertBar2}
      {AlertBar3}
      {AlertBar4}
    </SectionSb>
  );
};
Demo.parameters = {
  preview: codePreview`
const [alertBar1, AlertBar1] = useAlertBar();
const [alertBar2, AlertBar2] = useAlertBar();
const [alertBar3, AlertBar3] = useAlertBar();
const [alertBar4, AlertBar4] = useAlertBar();

useEffect(() => {
  // alert success with many line
  alertBar2.info("This is info message!");
  alertBar1.success("Congratulation! you have successfully login!");
  alertBar3.warning(
    <p>
      <b>Warning!</b>
      <p>This is warning message!</p>
    </p>
  );
  alertBar4.error(
    <div>
      <p>This is error message!</p>
      <a className="flex items-center gap-0.5 mt-1 cursor-pointer hover:underline font-semibold px-1 rounded-md py-0.5 border border-red-600">
        Learn more
        <RightIcon />
      </a>
    </div>
  );
}, []);

return (
  ...
    {AlertBar1}
    {AlertBar2}
    {AlertBar3}
    {AlertBar4}
  ...
);
  `,
};

const RightIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="icon-sm"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
    />
  </svg>
);
