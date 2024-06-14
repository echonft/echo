import { type ErrorCallback, errorCallback } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { assoc } from 'ramda'
import useSWRMutation from 'swr/mutation'

interface UseSWRTriggerArgs<TResponse, TArgs> {
  key: string
  fetcher: Fetcher<TResponse, TArgs>
  options?: {
    debug?: boolean
  }
  onSuccess?: (data: TResponse) => void
  onError?: Omit<ErrorCallback, 'show'>
}

export function useSWRTrigger<TResponse, TArgs>(args: UseSWRTriggerArgs<TResponse, TArgs>) {
  const { logger } = useDependencies()
  const { key, fetcher, onSuccess, onError } = args
  const { show } = useAlertStore()
  return useSWRMutation<TResponse, Error, string, TArgs>(
    key,
    (_key, { arg }) => {
      if (args.options?.debug) {
        logger?.info(`started fetching from ${key}`)
      }
      return fetcher(arg)
    },
    {
      throwOnError: false,
      onSuccess: (response) => {
        if (args.options?.debug) {
          logger?.info({ response }, `successfully fetched from ${key}`)
        }
        onSuccess?.(response)
      },
      onError: (err) => {
        if (args.options?.debug) {
          logger?.error({ err }, `error fetching from ${key}`)
        }
        errorCallback(assoc('show', show, onError ?? {}))(err)
      }
    }
  )
}
