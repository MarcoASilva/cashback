import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Register from '../Register';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('should render render all Register fields', () => {
  act(() => {
    render(<Register />, container);
  })
	expect(container.querySelector('#name')).toBeDefined();

  act(() => {
    render(<Register />, container);
  })
  expect(container.querySelector('#cpf')).toBeDefined();
	
  act(() => {
    render(<Register />, container);
  })
  expect(container.querySelector('#email')).toBeDefined();

  act(() => {
    render(<Register />, container);
  });
  expect(container.querySelector('#password')).toBeDefined();

  act(() => {
    render(<Register />, container);
  });
  expect(container.querySelector('#passwordConfirmation')).toBeDefined();

  act(() => {
    render(<Register />, container);
  });
  expect(container.querySelector(`button[type="submit"]`)).toBeDefined();
});