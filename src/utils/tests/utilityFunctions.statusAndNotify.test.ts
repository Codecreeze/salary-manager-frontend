import { describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';
import { getStatusToggleConfig, notifyError, notifySuccess } from '../utilityFunctions';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('getStatusToggleConfig', () => {
  it('offers the "Inactive" action when the current status is ACTIVE', () => {
    expect(getStatusToggleConfig('ACTIVE')).toEqual({
      nextStatus: 'INACTIVE',
      actionLabel: 'Inactive',
      color: 'error',
    });
  });

  it('offers the "Active" action when the current status is INACTIVE', () => {
    expect(getStatusToggleConfig('INACTIVE')).toEqual({
      nextStatus: 'ACTIVE',
      actionLabel: 'Active',
      color: 'success',
    });
  });
});

describe('notifySuccess / notifyError', () => {
  it('delegates to toast.success with the given message', () => {
    notifySuccess('Saved successfully');
    expect(toast.success).toHaveBeenCalledWith('Saved successfully');
  });

  it('delegates to toast.error with the given message', () => {
    notifyError('Something went wrong');
    expect(toast.error).toHaveBeenCalledWith('Something went wrong');
  });
});
