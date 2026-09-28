import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'salary-manager-sidebar-collapsed';

function getInitialCollapsed(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === 'true';
}

// UI-only state: whether the desktop permanent sidebar is collapsed to an
// icon-only rail. Persisted to localStorage directly in the reducer since
// there's no other UI-persistence pattern in this app to route through.
export interface SidebarState {
  collapsed: boolean;
}

const initialState: SidebarState = {
  collapsed: getInitialCollapsed(),
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
      window.localStorage.setItem(STORAGE_KEY, String(state.collapsed));
    },
  },
});

export const { toggleCollapsed } = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
