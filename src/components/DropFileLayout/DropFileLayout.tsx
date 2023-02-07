import React, { isValidElement, ReactNode, useEffect } from "react";
import { useDropzone, Accept } from "react-dropzone";
import toast from "react-hot-toast";

export interface IDropFileLayoutProps {
  className?: string;
  accept?: Accept;
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
  accept,
  multiple,
  children,
  noClick = false,
  noDrag = false,
  onDrag,
  onUpload,
  onError,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted(files, event) {
      onUpload(files);
    },
    multiple,
    noClick,
    noDrag,
    accept,
    onDropRejected(fileRejections, event) {
      for (let error of fileRejections[0].errors) {
        toast.error?.(error.message);
      }
    },
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
