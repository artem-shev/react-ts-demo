import React from 'react';
import { shallow } from 'enzyme';

import BooksList from './index';
import { Book } from '../../../models/entities';

describe('<BooksList />', () => {
  const handleDelete = jest.fn();
  const books: Book[] = [
    { id: '1', title: 'book 1', description: 'book 1 descr' },
    { id: '2', title: 'book 2', description: 'book 2 descr' },
    { id: '3', title: 'book 3', description: 'book 3 descr' },
    { id: '4', title: 'book 4', description: 'book 4 descr' },
  ];

  it('should render wrapper', () => {
    const wrapper = shallow(<BooksList books={books} onDelete={handleDelete} />);

    expect(wrapper.find('[data-test="wrapper"]')).toHaveLength(1);
  });

  it('should render array of books', function() {
    const wrapper = shallow(<BooksList books={books} onDelete={handleDelete} />);

    expect(wrapper.find('[data-test="book_item"]')).toHaveLength(4);
  });

  books.forEach(({ id }) => {
    it(`should call onDelete with proper id: ${id}`, function() {
      const onDelete = jest.fn();
      const wrapper = shallow(<BooksList books={books} onDelete={onDelete} />);

      wrapper.find(`[data-test="delete_${id}"]`).simulate('click');

      expect(onDelete).toBeCalledWith(String(id));
    });
  });
});
