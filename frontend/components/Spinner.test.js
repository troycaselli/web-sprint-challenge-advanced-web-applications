import React from 'react';
import {render} from '@testing-library/react';
import Spinner from './Spinner';
// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.

test('sanity', () => {
  const {rerender} = render(<Spinner on={true} />);
  rerender(<Spinner on={false} />);
});
