import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { Awaitable } from '@echo/utils/types/awaitable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResult, AccountResultConnected } from '@echo/web3-dom/services/get-account'
import { useCallback, useEffect, useState } from 'react'

interface Handlers {
  onConnect?: (account: AccountResultConnected) => Awaitable<void>
  onDisconnect?: (
    account: Omit<AccountResult, 'status' & Record<'status', AccountStatus.Disconnected>>
  ) => Awaitable<void>
  onUnsupportedChain?: (
    account: Omit<AccountResult, 'status' & Record<'status', AccountStatus.UnsupportedChain>>
  ) => Awaitable<void>
}

export function useAccount(handlers?: Handlers): AccountResult {
  const { getAccount, watchAccount } = useDependencies()
  const [account, setAccount] = useState<AccountResult>(getAccount())
  const onChange = useCallback(
    (account: AccountResult, prevAccount: AccountResult) => {
      setAccount(account)
      if (account.status === AccountStatus.UnsupportedChain && prevAccount.status !== AccountStatus.UnsupportedChain) {
        handlers?.onUnsupportedChain?.(account)
      }
      if (account.status === AccountStatus.Connected && prevAccount.status !== AccountStatus.Connected) {
        handlers?.onConnect?.(account)
      }
      if (account.status === AccountStatus.Disconnected && prevAccount.status !== AccountStatus.Disconnected) {
        handlers?.onDisconnect?.(account)
      }
    },
    [handlers]
  )

  useEffect(() => {
    return watchAccount(onChange)
  }, [watchAccount, onChange])

  return account
}
