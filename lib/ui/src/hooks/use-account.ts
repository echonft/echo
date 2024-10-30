import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResult } from '@echo/web3-dom/services/get-account'
import { useEffect, useState } from 'react'

export function useAccount(): AccountResult {
  const { getAccount } = useDependencies()
  const [account, setAccount] = useState<AccountResult>({
    address: undefined,
    chain: undefined,
    status: AccountStatus.Disconnected
  })
  // subscribe to account changes
  useEffect(() => {
    const { unsubscribe } = getAccount(setAccount)
    return unsubscribe
  }, [getAccount])
  return account
}
