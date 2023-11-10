import { onError } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { type Alert } from '@echo/ui/types/alert'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { assoc, pipe } from 'ramda'
import { useCallback } from 'react'

export interface UseErrorCallback {
  contexts?: Record<string, Record<string, unknown> | undefined>
  alert?: Alert
  onError?: EmptyFunction
}

export function useErrorCallback(args: UseErrorCallback) {
  const { show } = useAlertStore()

  return useCallback(
    (error: Error) => {
      onError(pipe(assoc('show', show), assoc('error', error))(args))
    },
    [args, show]
  )
}
