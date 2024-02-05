import { type ErrorCallback, errorCallback } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { assoc } from 'ramda'
import useSWRMutation from 'swr/mutation'

export interface UseSWRTriggerArgs<TResponse, TArgs> {
  key: string
  fetcher: Fetcher<TResponse, TArgs>
  onSuccess?: (data: TResponse) => void
  onError?: Omit<ErrorCallback, 'show'>
  options?: {
    logging?: boolean
  }
}
export function useSWRTrigger<TResponse, TArgs>(args: UseSWRTriggerArgs<TResponse, TArgs>) {
  const { key, fetcher, onSuccess, onError, options } = args
  const loggingEnabled = Boolean(options?.logging)
  const { show } = useAlertStore()
  return useSWRMutation<TResponse, Error, string, TArgs>(
    key,
    (_key, { arg }) => {
      if (loggingEnabled) {
        logger.debug(`started fetching from ${key}`)
      }
      return fetcher(arg)
    },
    {
      onSuccess: (response) => {
        if (loggingEnabled) {
          logger.debug(`successfully fetched from ${key}`)
          logger.debug(`response is ${JSON.stringify(response)}`)
        }
        onSuccess?.(response)
      },
      onError: (error) => {
        if (loggingEnabled) {
          logger.debug(`error fetching from ${key}: ${errorMessage(error)}`)
        }
        return errorCallback(assoc('show', show, onError ?? {}))(error)
      }
    }
  )
}
