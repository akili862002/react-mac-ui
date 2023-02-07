import { Button } from "../../components/Button";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useRef } from "react";
import {
  BaseFormatNumber,
  IBaseFormatNumberRef,
} from "../../components/FormatNumber/BaseFormatNumber";
import { codePreview } from "../utils";
import { FormikForm } from "../../components/FormikForm";
import { FormatNumber } from "../../components/FormatNumber";
import { SectionSb } from "../StoryLayout";
import {
  BasePriceField,
  IBasePriceFieldRef,
  PriceField,
} from "../../components/FormatNumber/PriceField";
import React from "react";

const phoneRegex = /^(\+\d{1,4}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

export default {
  component: BaseFormatNumber,
} as ComponentMeta<typeof BaseFormatNumber>;

export const BaseFormatFieldDemo: ComponentStory<typeof BaseFormatNumber> = (
  args
) => {
  const formatNumberRef = useRef<IBaseFormatNumberRef>();
  return (
    <SectionSb title="BaseFormatField Demo">
      <BaseFormatNumber {...args} ref={formatNumberRef} />
      <Button
        className="mt-3"
        onClick={() =>
          alert(JSON.stringify(formatNumberRef.current.getValue()))
        }
      >
        Show value
      </Button>
    </SectionSb>
  );
};
BaseFormatFieldDemo.args = {
  format: "+84 (###) ###-####",
  mask: "_",
  label: "Format field (Phone)",
  placeholder: "+84",
  className: "w-30",
};
BaseFormatFieldDemo.parameters = {
  preview: codePreview`
const formatNumberRef = useRef<IBaseFormatNumberRef>(); 

formatNumberRef.current.getValue();
formatNumberRef.current.setValue();

<BaseFormatNumber 
  ref={formatNumberRef}
  format="+84 ### ### ####"
  label="Format field (Phone)"
/>
    `,
};

export const FormatNumberDemo: ComponentStory<typeof FormatNumber> = (args) => {
  return (
    <SectionSb title="FormNumber Demo">
      <FormikForm
        initValues={{
          cardNumber: "",
          expiry: "",
          cvc: "",
        }}
        onSubmit={(values) => alert(JSON.stringify(values))}
        yupSchema={(yup) => ({
          cardNumber: yup.string().min(16, "Invalid!").required("Required!"),
          expiry: yup
            .string()
            .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Not valid")
            .required("Required!"),
          cvc: yup
            .string()
            .matches(/^[0-9]{3,4}$/, "Not valid")
            .required("Required!"),
        })}
      >
        {({ fieldProps }) => (
          <>
            <div className="w-40 space-y-1">
              <FormatNumber
                {...fieldProps.cardNumber}
                label="Card number"
                format="#### #### #### ####"
                placeholder="1234 5678 9012 3456"
              />
              <div className="flex gap-1">
                <FormatNumber
                  {...fieldProps.expiry}
                  className="w-2/3"
                  label="Expiry"
                  format="##/##"
                  placeholder="MM/YY"
                />
                <FormatNumber
                  {...fieldProps.cvc}
                  className="w-1/3"
                  label="CVC"
                  format="###"
                  placeholder="Security code"
                />
              </div>
            </div>
            <Button className="mt-3" type="submit">
              Validate Card Details
            </Button>
          </>
        )}
      </FormikForm>
    </SectionSb>
  );
};
FormatNumberDemo.parameters = {
  preview: codePreview`
<FormikForm
  initValues={{
    cardNumber: "",
    expiry: "",
    cvc: "",
  }}
  onSubmit={(values) => alert(JSON.stringify(values))}
  yupSchema={(yup) => ({
    cardNumber: yup.string().min(16, "Invalid!").required("Required!"),
    expiry: yup
      .string()
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Not valid")
      .required("Required!"),
    cvc: yup
      .string()
      .matches(/^[0-9]{3,4}$/, "Not valid")
      .required("Required!"),
  })}
>
  {({ fieldProps }) => (
    <>
      <div className="w-40 space-y-1">
        <FormatNumber
          {...fieldProps.cardNumber}
          label="Card number"
          format="#### #### #### ####"
          placeholder="1234 5678 9012 3456"
        />
        <div className="flex gap-1">
          <FormatNumber
            {...fieldProps.expiry}
            className="w-2/3"
            label="Expiry"
            format="##/##"
            placeholder="MM/YY"
          />
          <FormatNumber
            {...fieldProps.cvc}
            className="w-1/3"
            label="CVC"
            format="###"
            placeholder="Security code"
          />
        </div>
      </div>
      <Button className="mt-3" type="submit">
        Validate Card Details
      </Button>
    </>
  )}
</FormikForm>
    `,
};

export const BasePriceFieldDemo: ComponentStory<typeof BasePriceField> = (
  args
) => {
  const priceFieldRef = useRef<IBasePriceFieldRef>(null);
  return (
    <SectionSb title="BasePriceField Demo">
      <BasePriceField ref={priceFieldRef} {...args} />
      <div className="flex gap-2">
        <Button
          onClick={() =>
            alert(JSON.stringify(priceFieldRef.current.getValue()))
          }
        >
          Get value
        </Button>
        <Button onClick={() => priceFieldRef.current.setValue(12345)}>
          Set value 12345
        </Button>
        <Button onClick={() => priceFieldRef.current.focus()}>Focus</Button>
      </div>
    </SectionSb>
  );
};
BasePriceFieldDemo.args = {
  label: "Price",
  placeholder: "0.00",
};
BasePriceFieldDemo.parameters = {
  preview: codePreview`
const priceFieldRef = useRef<IBasePriceFieldRef>(null);

priceFieldRef.current.getValue();
priceFieldRef.current.setValue();
priceFieldRef.current.focus();
priceFieldRef.current.blur();

<BasePriceField 
  ref={priceFieldRef} 
  label="Price"
  placeholder="0.00"
/>
  `,
};
BasePriceFieldDemo.storyName = "Inherit/PriceField/Base";

export const PriceFieldDemo: ComponentStory<typeof BasePriceField> = (args) => {
  return (
    <SectionSb title="BasePriceField Demo">
      <FormikForm
        initValues={{ price: undefined as number }}
        yupSchema={(yup) => ({
          price: yup.number().min(0).required(),
        })}
        onSubmit={(values) => alert(JSON.stringify(values))}
      >
        {({ fieldProps }) => (
          <>
            <PriceField
              {...fieldProps.price}
              label="Price"
              placeholder="0.00"
            />
            <Button type="submit">Submit</Button>
          </>
        )}
      </FormikForm>
    </SectionSb>
  );
};
PriceFieldDemo.args = {
  label: "Price",
  placeholder: "0.00",
};
PriceFieldDemo.parameters = {
  preview: codePreview`
<FormikForm
  initValues={{ price: undefined as number }}
  yupSchema={(yup) => ({
    price: yup.number().min(0).required(),
  })}
  onSubmit={(values) => alert(JSON.stringify(values))}
>
  {({ fieldProps }) => (
    <>
      <PriceField
        {...fieldProps.price}
        label="Price"
        placeholder="0.00"
      />
      <Button type="submit">Submit</Button>
    </>
  )}
</FormikForm>
  `,
};
PriceFieldDemo.storyName = "Inherit/PriceField/WithForm";
