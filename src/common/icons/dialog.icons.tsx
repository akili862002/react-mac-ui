import React, { ReactNode } from "react";
import { IDialogType } from "../../types/dialog";
import { IIconSVGProps } from "../../types/common";
import { cn } from "../../utils/classnames.utils";

export const InfoIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 16v104h28a16 16 0 010 32z" />
  </svg>
);

export const WarningIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0080 446.25h340.89a32 32 0 0028.18-47.17zm-198.6-1.83a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.95a21.73 21.73 0 0121.5-22.69h.21a21.74 21.74 0 0121.73 22.7z" />
  </svg>
);

export const ErrorIcon: React.FC<IIconSVGProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.94v-.05a21.74 21.74 0 1143.44 0z" />
  </svg>
);

export const dialogTypeIcons: Record<
  IDialogType,
  {
    className: string;
    icon: ReactNode;
  }
> = {
  warning: {
    className: cn(" bg-red-200 text-red-600"), //tw
    icon: <WarningIcon />,
  },
  info: {
    className: cn(" text-gray-700 bg-gray-200"), //tw
    icon: <InfoIcon />,
  },
};
