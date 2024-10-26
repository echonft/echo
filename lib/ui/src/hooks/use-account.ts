import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import type { AccountResult } from '@echo/web3-dom/services/get-account'
import { useEffect, useState } from 'react'

export function useAccount(): AccountResult {
  const { getAccount } = useDependencies()
  const [account, setAccount] = useState<AccountResult>({
    wallet: undefined,
    status: 'disconnected'
  })
  // subscribe to account changes
  useEffect(() => {
    const { unsubscribe } = getAccount(setAccount)
    return unsubscribe
  }, [getAccount])
  return account
}
