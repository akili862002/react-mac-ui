import { Button } from "../../components/Button";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FormikForm, IFormikFormRef } from "../../components/FormikForm";
import { codePreview } from "../utils";
import { TextField } from "../../components/TextField";
import { IImage } from "../../types/common";
import { SectionSb } from "../StoryLayout";
import { Checkbox } from "../../components/Checkbox";
import { PriceField } from "../../components/FormatNumber/PriceField";
import { PropsWithChildren, useRef, useState } from "react";
import { confirmDialog } from "../../components/ConfirmDialog";
import { BaseFeature } from "../../BaseFeature";
import React from "react";
import { cn } from "../../utils/classnames.utils";
import { Select } from "../../components/Select";

type ISellingOption = {
  _id: string;
  name: string;
};

const sellingOptions: ISellingOption[] = [
  { _id: "1", name: "I'm just playing around" },
  { _id: "2", name: "I'm not selling product yet" },
  { _id: "3", name: "I'm selling just not online" },
  { _id: "4", name: "I sell with a different system" },
];

export default {
  component: FormikForm,
} as ComponentMeta<typeof FormikForm>;

export const FormikFormBasic: ComponentStory<React.FC<typeof FormikForm>> =
  () => {
    const [initValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      selling: null as ISellingOption,
      agree: false,
    });

    const formRef = useRef<IFormikFormRef<typeof initValues>>();

    const handleSubmit = (values: typeof initValues) => {
      console.log(JSON.stringify(values));
      alert(JSON.stringify(values, null, 2));
    };

    return (
      <BaseFeature>
        <FormikForm
          ref={formRef}
          className=""
          initValues={initValues}
          yupSchema={(yup) => ({
            firstName: yup.string().required("First name is required"),
            lastName: yup.string().required("Last name is required"),
            email: yup.string().email().required("Email is required"),
            password: yup
              .string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref("password")], "Password must match")
              .required("Confirm password is required"),
            selling: yup.object().nullable().required("Selling is required"),
            agree: yup.boolean().oneOf([true], "You must agree to terms"),
          })}
          onSubmit={handleSubmit}
        >
          {({ fieldProps, resetForm }) => {
            return (
              <>
                <SectionForm title="Register">
                  <Select
                    {...fieldProps.selling}
                    options={sellingOptions}
                    label="Selling"
                    placeholder="Select one"
                    renderOption={(option) => option.name}
                  />
                  <SectionRow>
                    <TextField
                      {...fieldProps.firstName}
                      label="First Name"
                      placeholder="John"
                    />
                    <TextField
                      {...fieldProps.lastName}
                      label="Last Name"
                      placeholder="Wick"
                    />
                  </SectionRow>
                  <TextField
                    {...fieldProps.email}
                    label="Email"
                    placeholder="example@gmail.com"
                  />
                  <TextField
                    {...fieldProps.password}
                    label="Password"
                    type="password"
                    placeholder="••••••"
                  />
                  <TextField
                    {...fieldProps.confirmPassword}
                    label="Confirm password"
                    type="password"
                    placeholder="••••••"
                  />
                  <Checkbox
                    {...fieldProps.agree}
                    className="!mt-2"
                    label="I agree to the Terms and Conditions"
                  />
                  <div className="flex gap-1 !mt-1.5 pt-1.5 border-t">
                    <Button
                      onClick={() => resetForm()}
                      className="w-1/2"
                      variant="outline"
                    >
                      Reset
                    </Button>
                    <Button type="submit" className="w-1/2">
                      Register now
                    </Button>
                  </div>
                </SectionForm>
              </>
            );
          }}
        </FormikForm>
      </BaseFeature>
    );
  };
FormikFormBasic.parameters = {
  preview: codePreview`

`,
};

const SectionForm: React.FC<
  PropsWithChildren<{
    className?: string;
    title: string;
  }>
> = ({ title, className, children }) => {
  return (
    <div
      className={cn(
        "max-w-[500px] w-full p-1.5 shadow-md bg-white rounded-lg",
        className
      )}
    >
      <p className="text-lg font-semibold">{title}</p>
      <div className="mt-1 space-y-1">{children}</div>
    </div>
  );
};

const SectionRow: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className="flex space-x-1">{children}</div>;
};
