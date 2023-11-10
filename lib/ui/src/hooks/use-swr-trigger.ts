import { type ErrorCallback, errorCallback } from '@echo/ui/helpers/error-callback'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { assoc } from 'ramda'
import useSWRMutation from 'swr/mutation'

export interface UseSWRTriggerArgs<Data = unknown, ExtraArg = never> {
  key: string
  fetcher: (args: ExtraArg) => Promise<Data>
  onSuccess?: (data: Data) => void
  onError?: Omit<ErrorCallback, 'show'>
}
export function useSWRTrigger<Data = unknown, ExtraArg = never>(args: UseSWRTriggerArgs<Data, ExtraArg>) {
  const { key, fetcher, onSuccess, onError } = args
  const { show } = useAlertStore()
  return useSWRMutation<Data, Error, string, ExtraArg>(key, (_key, { arg }) => fetcher(arg), {
    onSuccess,
    onError: errorCallback(assoc('show', show, onError ?? {}))
  })
}
