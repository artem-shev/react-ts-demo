import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import { booksActions, booksSelectors } from 'state/entities/books';
import users from 'state/entities/users';
import { User, Book } from 'models/entities';

import UserForm from './UserForm';
import UsersList from './UsersList';

interface Props {
  fetchBooks: () => any;
  fetchUsers: () => any;
  saveUser: (user: User) => any;
  deleteUser: (id: string) => any;
  users: User[];
  books: Book[];
}

const userSchema: User = {
  firstName: '',
  lastName: '',
  phone: '',
  description: '',
  books: [],
};

const Users = ({ fetchBooks, fetchUsers, saveUser, deleteUser, users, books }: Props) => {
  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, [fetchBooks, fetchUsers]);

  const [currentUser, setUser] = useState(userSchema);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setModalOpen(false);
  const handleOpen = () => setModalOpen(true);
  const handleSubmit = async (user: User) => {
    await saveUser(user);

    handleClose();
  };
  const openEditUser = (user: User) => {
    setUser(user);
    handleOpen();
  };
  const openCreateUser = () => openEditUser(userSchema);

  return (
    <Grid container>
      <Grid item>
        <Button color="primary" variant="contained" onClick={openCreateUser}>
          add user
        </Button>
      </Grid>
      <UsersList users={users} deleteUser={deleteUser} editUser={openEditUser} />
      {modalOpen && (
        <UserForm
          books={books}
          handleClose={handleClose}
          onSubmit={handleSubmit}
          initialValues={currentUser}
        />
      )}
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  books: booksSelectors.getBooks,
  users: users.selectors.getEntities,
});
const mapDispatchToProps = {
  fetchBooks: booksActions.fetch,
  fetchUsers: users.actions.fetch,
  saveUser: users.actions.save,
  deleteUser: users.actions.delete,
};

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
