import { RequireOnlyOne } from "./utils";
import * as yup from "yup";

export type IFieldExtensions = "jpg" | "png" | "jpeg" | "gif";

export type IImageSizeDetail = {
  w: number;
  h: number;
};

export type IImageSize = {
  small: RequireOnlyOne<IImageSizeDetail, "w" | "h">;
  medium: RequireOnlyOne<IImageSizeDetail, "w" | "h">;
};

export type IResult<T> = {
  products: T[];
  total: number;
};

export type IIconSVGProps = React.SVGProps<SVGSVGElement>;

export type IImage = {
  small?: string;
  medium?: string;
};

export type IYupSchemaCallback<T> = (_yup: typeof yup) => {
  [key in keyof T]?: yup.SchemaOf<
    T[key] extends string
      ? string
      : T[key] extends number
      ? number
      : T[key] extends any[]
      ? any[]
      : any
  >;
};
