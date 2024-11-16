import type { Path } from '@echo/routing/types/path'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc } from 'ramda'
import { create } from 'zustand'

export interface LoginStoreApi {
  callbackPath: Nullable<Path>
  setCallbackPath: (path: Path) => void
  reset: VoidFunction
}

export const useLoginStore = create<LoginStoreApi>((set) => ({
  callbackPath: undefined,
  setCallbackPath: (path: Path) => {
    set(assoc('callbackPath', path))
  },
  reset: () => {
    set(assoc('callbackPath', undefined))
  }
}))
