import React, { ReactNode } from "react";
import { AlertDialog } from "./components/AlertDialog";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { FormDialog } from "./components/FormDialog";

interface IBaseFeatureProps {
  children: ReactNode;
}

export const BaseFeature: React.FC<IBaseFeatureProps> = ({ children }) => {
  return (
    <>
      <AlertDialog />
      <ConfirmDialog />
      <FormDialog />
      {children}
    </>
  );
};
