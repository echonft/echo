import { type ErrorCallback, errorCallback } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { assoc } from 'ramda'
import useSWRMutation from 'swr/mutation'

export interface UseSWRTriggerArgs<TResponse, TArgs> {
  key: string
  fetcher: Fetcher<TResponse, TArgs>
  options?: {
    debug?: boolean
  }
  onSuccess?: (data: TResponse) => void
  onError?: Omit<ErrorCallback, 'show'>
}
export function useSWRTrigger<TResponse, TArgs>(args: UseSWRTriggerArgs<TResponse, TArgs>) {
  const { key, fetcher, onSuccess, onError } = args
  const { show } = useAlertStore()
  return useSWRMutation<TResponse, Error, string, TArgs>(
    key,
    (_key, { arg }) => {
      if (args.options?.debug) {
        pinoLogger.debug(`started fetching from ${key}`)
      }
      return fetcher(arg)
    },
    {
      throwOnError: false,
      onSuccess: (response) => {
        if (args.options?.debug) {
          pinoLogger.debug(`successfully fetched from ${key}`)
          pinoLogger.debug(`response is ${JSON.stringify(response)}`)
        }
        onSuccess?.(response)
      },
      onError: (error) => {
        if (args.options?.debug) {
          pinoLogger.debug(`error fetching from ${key}: ${errorMessage(error)}`)
        }
        return errorCallback(assoc('show', show, onError ?? {}))(error)
      }
    }
  )
}
