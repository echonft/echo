import { assoc } from 'ramda'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  hasLoggedInOnce: boolean
  setLoggedInOnce: VoidFunction
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      hasLoggedInOnce: false,
      setLoggedInOnce: () => set(assoc('hasLoggedInOnce', true))
    }),
    {
      name: 'settings'
    }
  )
)
