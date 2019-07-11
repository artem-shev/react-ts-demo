import React from 'react';
import { Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import CustomField from 'components/CustomField';
import DialogBoilerplate from 'components/DialogBoilerplate';

const fieldNames = {
  title: 'title',
  description: 'description',
};

const validationSchema = yup.object().shape({
  [fieldNames.title]: yup
    .string()
    .required()
    .min(2)
    .max(30),
  [fieldNames.description]: yup
    .string()
    .required()
    .min(4)
    .max(30),
});

interface Props {
  handleClose: (arg0: any) => any;
  handleSubmit: (values: any, actions: any) => any;
  initialValues?: any;
}

const BookForm = ({ handleClose, handleSubmit, initialValues }: Props) => (
  <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => (
      <DialogBoilerplate title="Book Form" handleClose={handleClose} onConfirm={handleSubmit}>
        <Form>
          <Grid container spacing={4}>
            {Object.values(fieldNames).map(name => (
              <Grid item xs={6} key={name}>
                <CustomField name={name} />
              </Grid>
            ))}
          </Grid>
        </Form>
      </DialogBoilerplate>
    )}
  </Formik>
);

export default BookForm;
