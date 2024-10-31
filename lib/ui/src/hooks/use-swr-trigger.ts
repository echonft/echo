import { type ErrorCallback, errorCallback } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { assoc, pipe } from 'ramda'
import useSWRMutation from 'swr/mutation'

interface UseSWRTriggerArgs<TResponse, TArgs> {
  key: string
  fetcher: (args: TArgs) => Promise<TResponse>
  onSuccess?: (data: TResponse) => void
  onError?: Omit<ErrorCallback, 'show'>
}

export function useSWRTrigger<TResponse, TArgs>(args: UseSWRTriggerArgs<TResponse, TArgs>) {
  const { key, fetcher, onSuccess, onError } = args
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
        errorCallback(pipe(assoc('show', show))(onError ?? {}))(err)
      }
    }
  )
}
