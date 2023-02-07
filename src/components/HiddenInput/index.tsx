import React from "react";

export const HiddenInput: React.FC<any> = (props) => (
  <input tabIndex={-1} className="sr-only" {...props} />
);
