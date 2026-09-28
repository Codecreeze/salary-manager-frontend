import { beforeEach, describe, expect, it } from 'vitest';
import { sidebarReducer, toggleCollapsed } from '../sidebarSlice';

const STORAGE_KEY = 'salary-manager-sidebar-collapsed';

describe('sidebarSlice', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('toggleCollapsed flips collapsed from false to true', () => {
    const state = sidebarReducer({ collapsed: false }, toggleCollapsed());
    expect(state.collapsed).toBe(true);
  });

  it('toggleCollapsed flips collapsed from true to false', () => {
    const state = sidebarReducer({ collapsed: true }, toggleCollapsed());
    expect(state.collapsed).toBe(false);
  });

  it('persists the new collapsed value to localStorage', () => {
    sidebarReducer({ collapsed: false }, toggleCollapsed());
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('true');

    sidebarReducer({ collapsed: true }, toggleCollapsed());
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('false');
  });
});
