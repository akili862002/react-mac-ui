import { FormikProps } from "formik";
import { ReactElement, ReactNode } from "react";
import { IDialogSize } from "../components/Dialog";
import { IFormFieldProps } from "../components/FormikForm";
import { IYupSchemaCallback } from "./common";

export type IDialogType = "warning" | "info";

/**
 * Confirm dialog types
 */

export type IConfirmDialogPayload = {
  type?: IDialogType;
  title: string;
  message: React.ReactNode;
  confirmButton?: string;
  onConfirm?: () => Promise<void> | void;
};

/**
 * Alert dialog types
 */

export type IAlertDialogPayload = {
  type: IDialogType;
  title: string;
  message: React.ReactNode;
};

/**
 * Form dialog types
 */

type IDialogArgs = {
  close: () => void;
  setLoading: (loading: boolean) => void;
};

export type IFormDialogPayload<T> = {
  size?: IDialogSize;
  title: string;
  initValues: T;
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
