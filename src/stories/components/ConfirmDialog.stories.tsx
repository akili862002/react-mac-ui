import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { confirmDialog } from "../..";
import { BaseFeature } from "../../BaseFeature";
import { Button } from "../../components/Button";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { IConfirmDialogPayload } from "../../types/dialog";
import { sleep } from "../../utils/mics.utils";
import { SectionSb } from "../StoryLayout";
import { codePreview } from "../utils";

export default {
  component: ConfirmDialog,
} as ComponentMeta<typeof ConfirmDialog>;

export const ConfirmDialogDemo: ComponentStory<any> = (args) => {
  useEffect(() => {
    handleConfirm();
  }, []);
  const handleConfirm = async () => {
    const isOk = await confirmDialog({
      ...args,
      onConfirm: async () => {
        await sleep(1000);
        toast.success("Delete success!");
      },
    });
  };
  return (
    <SectionSb title="ConfirmDialog">
      <BaseFeature>
        <Button onClick={handleConfirm}>Delete</Button>
      </BaseFeature>
    </SectionSb>
  );
};
ConfirmDialogDemo.argTypes = {
  type: {
    control: {
      type: "radio",
      options: ["warning", "info"],
    },
  },
};
ConfirmDialogDemo.args = {
  type: "warning",
  title: "Archive 3 products?",
  message:
    "Archiving products will hide them from your sales channels and Shopify admin. You’ll find them using the status filter in your product list.",
  confirmButton: "Archive product",
  onConfirm: async () => {
    await sleep(1);
  },
} as IConfirmDialogPayload;
ConfirmDialogDemo.parameters = {
  preview: codePreview`
const handleClick = await () => {
  const isOk = await confirmDialog({
    type: "warning",
    title: "Archive 3 products?",
    message: "Archiving products will hide them from your sales channels and Shopify admin. You’ll find them using the status filter in your product list.",
    onConfirm: async () => {
      await sleep(1000);
      toast.success("Delete success!");
    },
  })
}
  `,
};
