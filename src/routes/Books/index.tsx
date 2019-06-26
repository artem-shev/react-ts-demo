import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import { booksActions, booksSelectors } from 'state/entities/books';
import BookForm from './BookForm';
import BooksList from './BooksList';

const bookSchema = { title: '', description: '' };

export const Books = ({ saveBook, fetchBooks, deleteBook, books }: any) => {
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const [currentBook] = useState(bookSchema);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);
  const handleSubmit = async (...args: any[]) => {
    await saveBook(...args);

    handleClose();
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Button color="primary" variant="contained" onClick={handleOpen} data-test="add_book">
          add book
        </Button>
      </Grid>
      <BooksList books={books} onDelete={deleteBook} />
      {modalOpen && (
        <BookForm
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          initialValues={currentBook}
        />
      )}
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  books: booksSelectors.getBooks,
});

export default connect(
  mapStateToProps,
  { fetchBooks: booksActions.fetch, saveBook: booksActions.save, deleteBook: booksActions.delete },
)(Books);
