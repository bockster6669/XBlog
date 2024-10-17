import { expect, test, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileAdditionalOptions from './ProfileAdditionalOptions';
import { render } from '../test/utils';

describe('ProfileAdditionalOptions',  () => {
  test('handleDelete gets called when clicking Delete Account button', async () => {
    const handleDeleteSpy = vi.fn(async (toast) => {
      return toast;
    });
    render(<ProfileAdditionalOptions onDelete={handleDeleteSpy} />);

    const deleteButton = screen.getByText(/delete account/i);

    await userEvent.click(deleteButton);

    expect(handleDeleteSpy).toHaveBeenCalled();
  });
});
