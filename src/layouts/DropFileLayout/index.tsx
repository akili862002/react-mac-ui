import React, { isValidElement, ReactNode, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getFilesFromFileList, isValidFileExtensionInput } from "./utils";

export interface IDropFileLayoutProps {
  className?: string;
  accepts?: string[];
  multiple?: boolean;
  children:
    | ReactNode
    | ((props: { isDragging: boolean }) => JSX.Element | JSX.Element[]);
  /**
   * @default false
   */
  noClick?: boolean;
  noDrag?: boolean;
  onDrag?: (isDragActive: boolean) => void;
  onUpload: (files: File[]) => void;
  onError?: (error: string) => void;
}

export const DropFileLayout: React.FC<IDropFileLayoutProps> = ({
  className,
  accepts = ["png", "jpg", "jpeg"],
  multiple,
  children,
  noClick = false,
  noDrag = false,
  onDrag,
  onUpload,
  onError,
}) => {
  const onDrop = (fileList: any[]) => {
    if (!fileList?.length) return;
    const files = getFilesFromFileList(fileList as any);

    for (let file of files) {
      if (!isValidFileExtensionInput(file.name, accepts)) {
        let errorMessage =
          "File '$fn' is not valid!\nIt must have extension is $ac";
        errorMessage = errorMessage
          .replace("$fn", file.name)
          .replace(
            "$ac",
            accepts.map((accept) => accept.toUpperCase()).join(" | ")
          );
        onError?.(errorMessage);
        return;
      }
    }

    onUpload && onUpload(files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    noClick,
    noDrag,
  });

  useEffect(() => {
    onDrag?.(isDragActive);
  }, [isDragActive]);

  return (
    <div {...getRootProps({ className: "dropzone" })} className={className}>
      {isValidElement(children)
        ? children
        : (children as any)({ isDragging: isDragActive })}
      <input {...getInputProps()} />
    </div>
  );
};
