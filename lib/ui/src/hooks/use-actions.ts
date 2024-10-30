import { actionsStoreContext } from '@echo/ui/components/providers/actions-provider'
import { ProviderError } from '@echo/ui/constants/errors/provider-error'
import { captureAndLogError } from '@echo/ui/helpers/capture-and-log-error'
import { isNil } from 'ramda'
import { useContext } from 'react'
import { useStore } from 'zustand'

export const useActions = () => {
  const storeContext = useContext(actionsStoreContext)
  if (isNil(storeContext)) {
    const err = Error(ProviderError.Actions)
    captureAndLogError(err, { severity: 'fatal' })
    throw err
  }
  return useStore(storeContext)
}
