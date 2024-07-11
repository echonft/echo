import { type ErrorCallback, errorCallback } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { assoc, pipe } from 'ramda'
import useSWRMutation from 'swr/mutation'

interface UseSWRTriggerArgs<TResponse, TArgs> {
  key: string
  fetcher: Fetcher<TResponse, TArgs>
  onSuccess?: (data: TResponse) => void
  onError?: Omit<ErrorCallback, 'show'>
}

export function useSWRTrigger<TResponse, TArgs>(args: UseSWRTriggerArgs<TResponse, TArgs>) {
  const { key, fetcher, onSuccess, onError } = args
  const { logger: parentLogger } = useDependencies()
  const logger = parentLogger?.child({ hook: useSWRTrigger.name })
  const { show } = useAlertStore()
  return useSWRMutation<TResponse, Error, string, TArgs>(
    key,
    (_key, { arg }) => {
      return fetcher(arg)
    },
    {
      throwOnError: false,
      onSuccess: (response) => {
        onSuccess?.(response)
      },
      onError: (err) => {
        errorCallback(pipe(assoc('show', show), assoc('logger', logger))(onError ?? {}))(err)
      }
    }
  )
}
