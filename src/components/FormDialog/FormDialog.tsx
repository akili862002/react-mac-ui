import EventEmitter from "events";
import { ReactElement, useEffect, useState } from "react";
import { FormikForm, IFormFieldProps, IYupSchemaCallback } from "../FormikForm";
import { nanoid } from "nanoid";
import { FormikProps } from "formik";
import { Dialog, IDialogSize } from "../Dialog";
import React from "react";
import { Button } from "../Button";

const eventManager = new EventEmitter();

const SHOW_FORM_DIALOG = "SHOW_FORM_DIALOG";
const FINISH_FORM_DIALOG = "FINISH_FORM_DIALOG";

interface IFormDialog {}

export type IDialogArgs = {
  close: () => void;
  setLoading: (loading: boolean) => void;
};

export type IFormDialogPayload<T> = {
  size?: IDialogSize;
  title?: string;
  initValues: T;
  dialogClassName?: string;
  contentClassName?: string;
  hideActionButton?: boolean;
  component: (
    formArgs: IFormFieldProps<T> & FormikProps<T>,
    dialogArg: IDialogArgs
  ) => ReactElement<any, any>;
  formatButtons?: {
    cancel?: string;
    submit?: string;
    delete?: string;
  };
  yupSchema?: IYupSchemaCallback<T>;
  onSubmit: (values: T) => Promise<void> | void;
  /**
   * Please include this function in payload, delete button will appear
   */
  onDelete?: () => Promise<void> | void;
};

export const formDialog = <T,>(payload: IFormDialogPayload<T>) => {
  return new Promise<void>((resolve) => {
    eventManager.emit(SHOW_FORM_DIALOG, payload);
    eventManager.on(FINISH_FORM_DIALOG, () => {
      resolve();
    });
  });
};

export const FormDialog: React.FC<IFormDialog> = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [payload, setPayload] = useState<IFormDialogPayload<any>>({
    title: "",
    initValues: {},
    component: () => null,
    onSubmit: () => {},
  });
  const [loading, setLoading] = useState(false);
  const [formId] = useState(nanoid());

  useEffect(() => {
    eventManager.on(SHOW_FORM_DIALOG, (payload) => {
      setOpenDialog(true);
      setPayload(payload);
    });
  }, []);

  const handleCancel = () => {
    if (loading) return;

    eventManager.emit(FINISH_FORM_DIALOG);
    setOpenDialog(false);
  };

  const handleConfirm = async (values: any) => {
    setLoading(true);
    try {
      await payload.onSubmit?.(values);
      eventManager.emit(FINISH_FORM_DIALOG);
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      size={payload.size || "md"}
      className={payload.dialogClassName}
      open={openDialog}
      onClose={handleCancel}
    >
      {payload.title && <Dialog.Header title={payload.title} />}
      <Dialog.Content className={payload.contentClassName}>
        <FormikForm
          formId={formId}
          initValues={payload.initValues}
          onSubmit={handleConfirm}
          yupSchema={payload.yupSchema}
        >
          {(props) =>
            payload.component(props, {
              close: () => setOpenDialog(false),
              setLoading,
            })
          }
        </FormikForm>
      </Dialog.Content>
      {!payload.hideActionButton && (
        <Dialog.Buttons>
          <Dialog.CancelButton>
            {payload?.formatButtons?.cancel || "Cancel"}
          </Dialog.CancelButton>
          <Button type="submit" form={formId} loading={loading}>
            Confirm
          </Button>
        </Dialog.Buttons>
      )}
    </Dialog>
  );
};
