import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect } from "react";
import { BaseFeature } from "../../BaseFeature";
import { IAlertBarPayload } from "../../components/AlertBar";
import { AlertDialog, alertDialog } from "../../components/AlertDialog";
import { Button } from "../../components/Button";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: AlertDialog,
} as ComponentMeta<typeof AlertDialog>;

export const AlertDialogDemo: ComponentStory<any> = (args) => {
  useEffect(() => {
    handleAlert();
  }, []);
  const handleAlert = async () => {
    await alertDialog({
      ...args,
    });
  };
  return (
    <SectionSb title="Alert Dialog">
      <BaseFeature>
        <Button onClick={handleAlert}>Show alert</Button>
      </BaseFeature>
    </SectionSb>
  );
};
AlertDialogDemo.argTypes = {
  type: {
    control: {
      type: "radio",
      options: ["warning", "info"],
    },
  },
};
AlertDialogDemo.args = {
  type: "info",
  title: "Payment success!",
  message: (
    <div>
      <h2 className="pb-2 text-lg font-semibold text-gray-600">
        Thank you for your purchase!
      </h2>
      <p>
        Your order number is:{" "}
        <span className="font-bold text-gray-600">ORD-32111232</span>
      </p>
      <p>
        We'll email you an order confirmation with details and tracking info
      </p>
    </div>
  ),
} as IAlertBarPayload;
AlertDialogDemo.parameters = {
  preview: codePreview`

  `,
};
