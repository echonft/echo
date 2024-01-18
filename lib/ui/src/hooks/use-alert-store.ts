import type { Alert } from '@echo/ui/types/alert'
import { append, drop, modify } from 'ramda'
import { create } from 'zustand'

interface AlertStore {
  alerts: Alert[]
  show: (alert: Alert) => unknown
  dismiss: VoidFunction
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
