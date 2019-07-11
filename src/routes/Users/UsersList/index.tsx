import React from 'react';
import {
  Card,
  ExpansionPanel,
  ExpansionPanelDetails,
  Grid,
  ExpansionPanelSummary,
} from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';

import { User } from 'models/entities';
import { getFullName } from 'utils/helpers/entities';

import styles from './UsersList.module.scss';

interface Props {
  users: User[];
  deleteUser: (id: string) => any;
  editUser: (user: User) => any;
}

const UsersList = ({ users, deleteUser, editUser }: Props) => (
  <Grid container direction="column" className={styles.usersList}>
    {users.map(user => {
      const { id, books } = user;

      return (
        <ExpansionPanel key={id}>
          <ExpansionPanelSummary className={styles.userTitle}>
            {id && (
              <>
                <Edit
                  className={styles.edit}
                  onClick={e => {
                    e.stopPropagation();

                    editUser(user);
                  }}
                />
                <Close
                  className={styles.delete}
                  onClick={e => {
                    e.stopPropagation();

                    deleteUser(id);
                  }}
                />
              </>
            )}
            {getFullName(user)}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              {books.map(({ id, title }) => (
                <Card key={id} className={styles.bookCard}>
                  {title}
                </Card>
              ))}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    })}
  </Grid>
);

export default UsersList;
