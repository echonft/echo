import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { AccountResult } from '@echo/web3/types/account-result'
import { useEffect, useState } from 'react'

export function useAccount(): AccountResult {
  const { getAccount } = useDependencies()
  const [account, setAccount] = useState<AccountResult>({
    address: undefined,
    chain: undefined,
    chainId: undefined,
    status: 'disconnected'
  })
  // subscribe to account changes
  useEffect(() => {
    const { unsubscribe } = getAccount(setAccount)
    return () => {
      unsubscribe?.()
    }
  }, [getAccount, setAccount])
  return account
}
