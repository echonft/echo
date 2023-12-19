import { assoc } from 'ramda'
import { create } from 'zustand'

interface SettingsStore {
  hasLoggedInOnce: boolean
  setLoggedInOnce: VoidFunction
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  hasLoggedInOnce: false,
  setLoggedInOnce: () => set(assoc('hasLoggedInOnce', true))
}))
