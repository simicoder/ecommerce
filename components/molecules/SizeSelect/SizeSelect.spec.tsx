import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SizeSelect } from './SizeSelect';

test('should S size be checked by default', () => {
  render(<SizeSelect onChange={jest.fn()} />);
  expect(screen.getByLabelText(/S/i)).toBeChecked();
});

test('should call onChange func when other size is selected', () => {
  const mockedChangeColorFunc = jest.fn();
  render(<SizeSelect onChange={mockedChangeColorFunc} />);
  userEvent.click(screen.getByLabelText(/M/i));
  expect(mockedChangeColorFunc).toHaveBeenCalled();
});
