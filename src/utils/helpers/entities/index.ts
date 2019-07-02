import { User } from 'models/entities';

export const getFullName = ({ firstName, lastName }: User) => `${firstName} ${lastName}`;
