export interface Book {
  id: string;
  title: string;
  description: string;
}

export interface User {
  firstName: string;
  lastName: string;
  books: Book[];
  phone?: string;
  id?: string;
  description?: string;
}
