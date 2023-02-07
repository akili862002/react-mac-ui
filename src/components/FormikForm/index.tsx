import { Form, Formik, FormikProps } from "formik";
import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import * as yup from "yup";
import { cn } from "../../utils/classnames.utils";

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

type IFieldProp<T> = {
  name: keyof T;
  required: boolean;
};

export type IFormFieldProps<T> = {
  fieldProps: Record<keyof T, IFieldProp<T>>;
};

export interface IFormikFormProps<T> {
  formId?: string;
  className?: string;
  initValues: T;
  children: React.FC<IFormFieldProps<T> & FormikProps<T>>;
  yupSchema?: IYupSchemaCallback<T>;
  onSubmit: (values: T) => Promise<void> | void;
}
export interface IFormikFormRef<T> {
  values: T;
  submit: () => void;
  reset: () => void;
  setInitValues: (values: T) => void;
}

const FormikFormInner = <T,>(
  {
    formId,
    className,
    initValues,
    children,
    yupSchema,
    onSubmit,
  }: IFormikFormProps<T>,
  ref: ForwardedRef<IFormikFormRef<T>>
) => {
  const validateSchema = yupSchema?.(yup);
  const formikRef = useRef<FormikProps<T>>(null);

  useImperativeHandle(
    ref,
    () => ({
      values: formikRef.current.values,
      submit: formikRef.current.submitForm,
      setInitValues: formikRef.current.setValues,
      reset: formikRef.current.resetForm,
    }),
    []
  );

  const generatePropsForFields = (): Record<keyof T, IFieldProp<T>> => {
    const object: Record<keyof T, IFieldProp<T>> = {} as any;

    for (let key in initValues) {
      object[key] = {
        name: key,
        required: !!(validateSchema?.[key] as any)?.exclusiveTests?.required,
      };
    }
    return object;
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initValues}
      validationSchema={yup.object().shape(validateSchema || {})}
      onSubmit={onSubmit}
    >
      {(props) => (
        <Form id={formId} className={cn("space-y-1", className)}>
          {children?.({
            ...props,
            fieldProps: generatePropsForFields(),
          })}
        </Form>
      )}
    </Formik>
  );
};

export const FormikForm = forwardRef(FormikFormInner) as <T>(
  props: IFormikFormProps<T> & {
    ref?: ForwardedRef<IFormikFormRef<T>>;
  }
) => ReturnType<typeof FormikFormInner>;
