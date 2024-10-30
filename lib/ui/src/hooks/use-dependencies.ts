import { dependenciesContext } from '@echo/ui/components/providers/dependencies-provider'
import { ProviderError } from '@echo/ui/constants/errors/provider-error'
import { captureAndLogError } from '@echo/ui/helpers/capture-and-log-error'
import type { Dependencies } from '@echo/ui/stores/dependencies-store'
import { isNil } from 'ramda'
import { useContext } from 'react'
import { useStore } from 'zustand'

export function useDependencies(): Dependencies {
  const storeContext = useContext(dependenciesContext)
  if (isNil(storeContext)) {
    const err = Error(ProviderError.Dependencies)
    captureAndLogError(err, { severity: 'fatal' })
    throw err
  }
  return useStore(storeContext)
}
