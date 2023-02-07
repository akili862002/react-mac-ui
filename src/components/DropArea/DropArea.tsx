import React from "react";
import { PropsWithChildren, useState } from "react";
import { useDrop } from "react-use";

export interface IDropAreaProps {
  className?: string;
  draggingDisplay?: React.ReactNode;
  onFiles: (files: File[]) => void;
  onUri?: (uri: string) => void;
  onText?: (text: string) => void;
}

export const DropArea: React.FC<PropsWithChildren<IDropAreaProps>> = ({
  className,
  draggingDisplay = (
    <h1 className="text-4xl font-semibold text-white">Drop files here</h1>
  ),
  children,
  onFiles,
  onUri,
  onText,
}) => {
  useDrop({
    onFiles,
    onUri,
    onText,
  });
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={className}
      onDragEnter={() => {
        setIsDragging(true);
      }}
      onMouseLeave={() => {
        setIsDragging(false);
      }}
      onDrop={() => {
        setIsDragging(false);
      }}
    >
      {isDragging && (
        <div className="fixed inset-0 bg-gray-900/60 z-100 center-children">
          {draggingDisplay}
        </div>
      )}
      {children}
    </div>
  );
};
