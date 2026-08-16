import { create } from 'zustand'

interface AppState {
  settings: {
    theme: string
    isMenuOpen: boolean
  }
  user: {
    email: string
  } | null
  setSetting: (propertyName: keyof AppState['settings'], value: any) => void
  setUser: (user: { email: string } | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  settings: {
    theme: 'dark',
    isMenuOpen: false,
  },
  user: null,
  setSetting: (propertyName, value) =>
    set((state) => ({
      settings: { ...state.settings, [propertyName]: value },
    })),
  setUser: (user) => set(() => ({ user })),
}))
