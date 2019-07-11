import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Books } from './index';
import BookForm from './BookForm';

describe('<Books />', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should call fetch users and books actions when mounted', () => {
    const props = {
      books: [],
      fetchBooks: jest.fn(),
      saveBook: jest.fn(),
      deleteBook: jest.fn(),
    };
    wrapper = mount(<Books {...props} />);

    expect(props.fetchBooks).toBeCalled();
  });

  it('should render book form after add btn click', () => {
    const props = {
      books: [],
      fetchBooks: jest.fn(),
      saveBook: jest.fn(),
      deleteBook: jest.fn(),
    };
    wrapper = mount(<Books {...props} />);

    wrapper
      .find('[data-test="add_book"]')
      .first()
      .simulate('click');

    expect(wrapper.find(BookForm).first()).toHaveLength(1);
  });

  it('should render book form modal', () => {
    const props = {
      books: [],
      fetchBooks: jest.fn(),
      saveBook: jest.fn(),
      deleteBook: jest.fn(),
    };
    wrapper = mount(<Books {...props} />);

    wrapper
      .find('[data-test="add_book"]')
      .first()
      .simulate('click');

    wrapper
      .find('[data-test="dialog_cancel_btn"]')
      .first()
      .simulate('click');

    expect(wrapper.find(BookForm).first()).toHaveLength(0);
  });
});
