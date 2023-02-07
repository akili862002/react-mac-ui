import React from "react";
import EventEmitter from "events";
import { useEffect, useState } from "react";
import { dialogTypeIcons } from "../../common/icons/dialog.icons";
import { IConfirmDialogPayload } from "../../types/dialog";
import { cn } from "../../utils/classnames.utils";
import { Dialog } from "../Dialog";
import { Button } from "../Button";

const SHOW_CONFIRM = "SHOW_CONFIRM";
const FINISH_CONFIRM = "FINISH_CONFIRM";

const eventManager = new EventEmitter();

export const confirmDialog = function (payload: IConfirmDialogPayload) {
  return new Promise((resolve) => {
    eventManager.emit(SHOW_CONFIRM, payload);
    eventManager.on(FINISH_CONFIRM, (isOk: boolean) => {
      resolve(isOk);
    });
  });
};

export const ConfirmDialog: React.FC = () => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [payload, setPayload] = useState<IConfirmDialogPayload>({
    type: "warning",
    title: "",
    message: "",
    confirmButton: "Xác nhận",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    eventManager.addListener(SHOW_CONFIRM, (payload) => {
      setOpenAlertDialog(true);
      setPayload({
        type: "warning",
        ...payload,
      });
    });
  }, []);

  const handleConfirm = async () => {
    eventManager.emit(FINISH_CONFIRM, true);
    setLoading(true);
    try {
      await payload.onConfirm?.();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setOpenAlertDialog(false);
  };

  const handleCancel = () => {
    if (loading) return;

    eventManager.emit("finish-confirm", false);
    setOpenAlertDialog(false);
  };

  if (!payload.type) return null;

  return (
    <Dialog open={openAlertDialog} onClose={handleCancel}>
      <Dialog.Header title={payload.title} />
      <Dialog.Content className="flex flex-row space-x-2">
        <div
          className={cn(
            "flex-shrink-0 w-5 h-5 p-1 text-red-500 rounded-full bg-red-50",
            dialogTypeIcons[payload.type].className
          )}
        >
          {dialogTypeIcons[payload.type].icon}
        </div>
        <div>{payload.message}</div>
      </Dialog.Content>
      <Dialog.Buttons>
        <Dialog.CancelButton>Cancel</Dialog.CancelButton>
        <Button
          className="w-full"
          variant={
            {
              warning: "danger" as const,
              info: "primary" as const,
            }[payload.type]
          }
          loading={loading}
          onClick={handleConfirm}
        >
          {payload.confirmButton || "Confirm"}
        </Button>
      </Dialog.Buttons>
    </Dialog>
  );
};
