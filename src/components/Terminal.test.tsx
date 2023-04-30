import { render, screen, waitFor } from '@testing-library/react';
import Terminal from './Terminal';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('renders Terminal component with user prompt', async () => {
  const userPrompts = [
    { input: 'test_command', output: 'test_output' },
  ];

  act(() => {
    render(<Terminal userPrompts={userPrompts} onCommand={() => {}}  delay={0}/>);
  });

  await waitFor(() => expect(screen.getByText(/test_command/i)).toBeInTheDocument());
});

test('executes onCommand when user presses Enter', async () => {
  const onCommand = jest.fn();
  const userPrompts = [
    { input: 'test_command', output: 'test_output' },
  ];

  act(() => {
    render(<Terminal userPrompts={userPrompts} onCommand={onCommand} delay={0} />);
  });

  const input = screen.getByRole('textbox');
  userEvent.type(input, 'test_command{enter}');

  await waitFor(() => expect(onCommand).toHaveBeenCalledWith('test_command'));
});
