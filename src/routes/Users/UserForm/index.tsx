import React from 'react';
import { FieldArray, Formik } from 'formik';
import * as yup from 'yup';
import { omit } from 'lodash';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

import DialogBoilerplate from 'components/DialogBoilerplate';
import CustomField from 'components/CustomField';
import { Book, User } from 'models/entities';

const fieldNames = {
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  description: 'description',
  books: 'books',
};

const validationSchema = yup.object().shape({
  [fieldNames.firstName]: yup.string().required(),
  [fieldNames.lastName]: yup.string().required(),
  [fieldNames.phone]: yup.string(),
  [fieldNames.description]: yup.string(),
  [fieldNames.books]: yup.array().required(),
});

const inputFieldNames = omit(fieldNames, fieldNames.books);

interface Props {
  onSubmit: (user: any) => any;
  books: Book[];
  handleClose: () => any;
  initialValues: User;
}

const UserForm = ({ handleClose, initialValues, onSubmit, books }: Props) => {
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ handleSubmit }) => {
        return (
          <DialogBoilerplate handleClose={handleClose} title="User Form" onConfirm={handleSubmit}>
            <Grid container>
              {Object.values(inputFieldNames).map(
                fieldName =>
                  fieldName && (
                    <Grid item xs={6} key={fieldName}>
                      <CustomField name={fieldName} />
                    </Grid>
                  ),
              )}
              <FieldArray name={fieldNames.books}>
                {props => {
                  const { push, remove, form } = props;
                  console.log('form', form);
                  return (
                    <Grid item xs={12}>
                      {books.map(book => {
                        // @ts-ignore
                        const { id, title } = book || {};
                        const selectedBooks = form.values[fieldNames.books];
                        const index = selectedBooks.findIndex(
                          (selectedBook: any) => selectedBook.id === id,
                        );
                        const checked = index !== -1;

                        return (
                          <FormControlLabel
                            key={id}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={() => (checked ? remove(index) : push(book))}
                              />
                            }
                            label={title}
                          />
                        );
                      })}
                    </Grid>
                  );
                }}
              </FieldArray>
            </Grid>
          </DialogBoilerplate>
        );
      }}
    </Formik>
  );
};

export default UserForm;
