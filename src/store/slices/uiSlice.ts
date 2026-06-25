import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
  userMenuOpen: boolean;
  activeModal: string | null;
}

const initialState: UiState = {
  sidebarOpen: true,
  mobileSidebarOpen: false,
  userMenuOpen: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleMobileSidebar(state) {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
    toggleUserMenu(state) {
      state.userMenuOpen = !state.userMenuOpen;
    },
    setUserMenuOpen(state, action: PayloadAction<boolean>) {
      state.userMenuOpen = action.payload;
    },
    openModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload;
    },
    closeModal(state) {
      state.activeModal = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileSidebar,
  setMobileSidebarOpen,
  toggleUserMenu,
  setUserMenuOpen,
  openModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;
