import type { Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { append, drop, modify } from 'ramda'
import { create } from 'zustand'

interface AlertStore {
  alerts: Alert[]
  show: (alert: Alert) => unknown
  dismiss: EmptyFunction
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  show: (alert) => {
    set(modify('alerts', append(alert)))
  },
  dismiss: () => {
    set(modify('alerts', drop(1)))
  }
}))
