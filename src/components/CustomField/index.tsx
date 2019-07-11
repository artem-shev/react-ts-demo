import React from 'react';
import { Field } from 'formik';
import { TextField } from '@material-ui/core';

interface CustomFieldProps {
  name: string;
  label?: string;
  component: React.ComponentType;
}

const CustomField = ({ name, label = name, component: Cmp }: CustomFieldProps) => (
  <Field name={name}>
    {({ field, form }: any) => {
      const hasError = !!form.touched[field.name] && !!form.errors[field.name];
      const errorMessage = hasError && form.errors[field.name];

      return <Cmp {...field} label={label} error={hasError} helperText={errorMessage} />;
    }}
  </Field>
);

CustomField.defaultProps = {
  component: TextField,
};

export default CustomField;
