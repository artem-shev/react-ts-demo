import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

import { Book } from 'models/entities';

import styles from './BooksList.module.scss';

interface Props {
  books: Book[];
  onDelete: (arg0: string) => any;
}

const BooksList = ({ books, onDelete }: Props) => {
  return (
    <Grid container direction="row">
      {books.map(({ id, title, description }) => (
        <Card key={id} className={styles.card}>
          <CardContent>
            <Clear
              onClick={() => {
                onDelete(id);
              }}
              className={styles.delete}
            />
            <Typography>title: {title}</Typography>
            <Typography>description: {description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default BooksList;
