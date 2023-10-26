import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { append, drop, modify, pipe } from 'ramda'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AlertStore {
  alerts: Alert[]
  show: (alert: Alert) => unknown
  dismiss: EmptyFunction
}

export const useAlertStore = create<AlertStore>()(
  devtools(
    (set, get) => ({
      alerts: [],
      show: (alert) => {
        pipe<[], AlertStore, AlertStore, void>(get, modify('alerts', append(alert)), set)()
      },
      dismiss: () => {
        pipe<[], AlertStore, AlertStore, void>(get, modify('alerts', drop(1)), set)()
      }
    }),
    {
      name: 'alert-storage'
    }
  )
)
