import React from 'react';
import { mount } from 'enzyme';

import { Books } from './index';
import BookForm from './BookForm';

describe('<Books />', function() {
  it('should call fetch users and books actions when mounted', function() {
    const props = {
      books: [],
      fetchBooks: jest.fn(),
      saveBook: jest.fn(),
      deleteBook: jest.fn(),
    };
    mount(<Books {...props} />);

    expect(props.fetchBooks).toBeCalled();
  });

  it('should render book form after add btn click', function() {
    const props = {
      books: [],
      fetchBooks: jest.fn(),
      saveBook: jest.fn(),
      deleteBook: jest.fn(),
    };
    const wrapper = mount(<Books {...props} />);

    wrapper.find('[data-test="add_book"]').simulate('click');

    // wrapper.update();

    expect(wrapper.find(BookForm).first()).toHaveLength(1);
  });
});
