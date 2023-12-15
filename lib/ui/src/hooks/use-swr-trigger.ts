import { type ErrorCallback, errorCallback } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { assoc } from 'ramda'
import useSWRMutation from 'swr/mutation'

export interface UseSWRTriggerArgs<TResponse, TArgs> {
  key: string
  fetcher: Fetcher<TResponse, TArgs>
  onSuccess?: (data: TResponse) => void
  onError?: Omit<ErrorCallback, 'show'>
}
export function useSWRTrigger<TResponse, TArgs>(args: UseSWRTriggerArgs<TResponse, TArgs>) {
  const { key, fetcher, onSuccess, onError } = args
  const { show } = useAlertStore()
  return useSWRMutation<TResponse, Error, string, TArgs>(key, (_key, { arg }) => fetcher(arg), {
    onSuccess,
    onError: errorCallback(assoc('show', show, onError ?? {}))
  })
}
