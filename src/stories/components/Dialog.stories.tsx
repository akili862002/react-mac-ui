import React from "react";
import { Dialog } from "../../components/Dialog";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { codePreview } from "../utils";
import { FormDialog } from "../../components/FormDialog";
import { TextField } from "../../components/TextField";
import { sleep } from "../../utils/mics.utils";
import { Button } from "../../components/Button";
import { SectionSb } from "../StoryLayout";
import { formDialog } from "../../components/FormDialog/FormDialog";

export default {
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

export const DialogDemo: ComponentStory<typeof Dialog> = (args) => {
  return (
    <Dialog {...args}>
      <Dialog.Header title="The standard Lorem Ipsum passage, used since the 1500s" />
      <Dialog.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Dialog.Content>
      <Dialog.Buttons>
        <Dialog.CancelButton className="w-1/2">Cancel</Dialog.CancelButton>
        <Button className="w-1/2">Ok, I got it</Button>
      </Dialog.Buttons>
    </Dialog>
  );
};
DialogDemo.args = {
  open: true,
};
DialogDemo.parameters = {
  preview: codePreview`
<Dialog open={true} onClose={handleClose}>
<Dialog.Header title="The standard Lorem Ipsum passage, used since the 1500s" />
<Dialog.Content>
  ....
</Dialog.Content>
<Dialog.ActionButtons>
  <Dialog.ButtonCancel>Cancel</Dialog.ButtonCancel>
  <Dialog.ButtonDanger>Delete</Dialog.ButtonDanger>
  <Dialog.ButtonAccept>Ok, I got it</Dialog.ButtonAccept>
</Dialog.ActionButtons>
</Dialog>
  `,
};

export const FormDialogDemo: ComponentStory<typeof FormDialog> = () => {
  const handleClick = async () => {
    await formDialog({
      size: "sm",
      title: "Login form",
      initValues: {
        username: "",
        password: "",
      },
      yupSchema: (yup) => ({
        username: yup.string().required(),
        password: yup.string().min(6).required(),
      }),
      component: ({ fieldProps }) => (
        <>
          <TextField
            {...fieldProps.username}
            label="Username"
            placeholder="aduvip123"
          />
          <TextField
            {...fieldProps.password}
            label="Password"
            placeholder="••••••"
            type="password"
          />
        </>
      ),
      onSubmit: async (values) => {
        await sleep(1000);
        alert(JSON.stringify(values));
      },
    });
  };

  return (
    <SectionSb title="Dialog">
      <FormDialog />
      <Button onClick={handleClick}>{`Call formDialog({...})`}</Button>
    </SectionSb>
  );
};
FormDialogDemo.parameters = {
  preview: codePreview`
await formDialog({
  size: "sm",
  title: "Login form",
  initValues: {
    username: "",
    password: "",
  },
  yupSchema: (yup) => ({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
  }),
  component: ({ fieldProps }) => (
    <>
      <TextField
        {...fieldProps.username}
        label="Username"
        placeholder="aduvip123"
      />
      <TextField
        {...fieldProps.password}
        label="Password"
        placeholder="••••••"
        type="password"
      />
    </>
  ),
  onSubmit: async (values) => {
    await sleep(1000);
    alert(JSON.stringify(values));
  },
}); 
  `,
};
