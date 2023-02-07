import React from "react";
import { useEffect, useState } from "react";
import EventEmitter from "events";
import { dialogTypeIcons } from "../../common/icons/dialog.icons";
import { Dialog } from "../Dialog";
import { IAlertDialogPayload } from "../../types/dialog";
import { cn } from "../../utils/classnames.utils";
import { Button } from "../Button";

const eventManager = new EventEmitter();

const SHOW_ALERT = "SHOW_ALERT";
const FINISH_ALERT = "FINISH_ALERT";

export const alertDialog = function (payload: IAlertDialogPayload) {
  return new Promise<void>((resolve) => {
    eventManager.emit(SHOW_ALERT, payload);
    eventManager.on(FINISH_ALERT, () => {
      resolve();
    });
  });
};

export const AlertDialog: React.FC = (props) => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [payload, setPayload] = useState<IAlertDialogPayload>({
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    eventManager.on(SHOW_ALERT, (payload: IAlertDialogPayload) => {
      setOpenAlertDialog(true);
      setPayload(payload);
    });
  }, []);

  const handleConfirm = async () => {
    eventManager.emit(FINISH_ALERT);
    setOpenAlertDialog(false);
  };

  const handleCancel = () => {
    eventManager.emit("finish-alert");
    setOpenAlertDialog(false);
  };

  return (
    <Dialog open={openAlertDialog} onClose={handleCancel}>
      <Dialog.Header title={payload.title} />
      <Dialog.Content className="flex flex-row space-x-2">
        <div
          className={cn(
            "flex-shrink-0 w-5 h-5 p-1 rounded-full ",
            dialogTypeIcons[payload.type].className
          )}
        >
          {dialogTypeIcons[payload.type].icon}
        </div>
        <div>{payload.message}</div>
      </Dialog.Content>
      <Dialog.Buttons>
        <Button className="w-full" onClick={handleConfirm}>
          Tôi hiểu rồi
        </Button>
      </Dialog.Buttons>
    </Dialog>
  );
};
