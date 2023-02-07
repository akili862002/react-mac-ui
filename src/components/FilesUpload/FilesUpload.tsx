import { useField } from "formik";
import { Accept } from "react-dropzone";
import { FormControl, IFormControlProps } from "../FormControl";
import Ripple from "material-ripple-effects";
import React from "react";
import { DropFileLayout } from "../DropFileLayout";
import { cn } from "../../utils/classnames.utils";
import { UploadIcon } from "./icons";

const ripple = new Ripple();

export interface IBaseFileUploadProps extends IFormControlProps {
  accept?: Accept;
  files?: File[];
  onChange?: (files: File[]) => void;
  error?: string;
}

export const BaseFilesUpload: React.FC<IBaseFileUploadProps> = ({
  name,
  label,
  labelClassName,
  required,
  className,
  accept,
  files,
  onChange,
}) => {
  const handleUpload = (newFiles: File[]) => {
    if (onChange) {
      onChange([...files, ...newFiles]);
    }
  };
  return (
    <FormControl
      name={name}
      label={label}
      labelClassName={labelClassName}
      required={required}
      className={className}
    >
      <DropFileLayout multiple accept={accept} onUpload={handleUpload}>
        {({ isDragging }) => (
          <button
            type="button"
            className={cn(
              "pb-1.5 border rounded-lg w-full font-medium center-children",
              isDragging
                ? "border-blue-600 ring-1 ring-blue-600"
                : "border-gray-300"
            )}
            onMouseDown={(e) => ripple.create(e, "dark")}
          >
            <div className="flex flex-col items-center">
              <UploadIcon />
              <span className="rounded-lg">
                Upload file here or Drag your files here
              </span>
            </div>
          </button>
        )}
      </DropFileLayout>
      {files?.length > 0 && (
        <div className="mt-1 overflow-y-auto max-h-30">
          {files.map((file) => (
            <div
              className="py-0.5 w-full relative gap-1 flex items-center pr-7"
              key={file.name}
            >
              <div className="w-3">
                {file.type === "image/svg+xml" && (
                  <img src={URL.createObjectURL(file)} className="icon-md" />
                )}
              </div>
              <span className="truncate">{file.name}</span>
              <div className="absolute right-0 move-center-y">
                <button
                  type="button"
                  className="flex items-center flex-shrink-0 gap-1 underline"
                  onClick={() => onChange(files.filter((f) => f !== file))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </FormControl>
  );
};

interface IFileUploadProps extends IBaseFileUploadProps {
  name: string;
  required: boolean;
}

export const FilesUpload: React.FC<IFileUploadProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <BaseFilesUpload
      onChange={(files) => helpers.setValue(files)}
      files={field.value}
      error={meta.touched && meta.error}
      {...props}
    />
  );
};
