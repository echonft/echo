import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { Awaitable } from '@echo/utils/types/awaitable'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResult, AccountResultConnected } from '@echo/web3-dom/services/get-account'
import { isNil } from 'ramda'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'throttle-debounce'

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
  const onUnsupportedChainDebounced = isNil(handlers?.onUnsupportedChain)
    ? undefined
    : debounce(800, handlers.onUnsupportedChain, { atBegin: true })
  const onConnectDebounced = isNil(handlers?.onConnect)
    ? undefined
    : debounce(800, handlers.onConnect, { atBegin: true })
  const onDisconnectDebounced = isNil(handlers?.onDisconnect)
    ? undefined
    : debounce(800, handlers.onDisconnect, { atBegin: true })

  const onChange = useCallback(
    (account: AccountResult, prevAccount: AccountResult) => {
      setAccount(account)
      if (account.status === AccountStatus.UnsupportedChain && prevAccount.status !== AccountStatus.UnsupportedChain) {
        onUnsupportedChainDebounced?.(account)
      }
      if (account.status === AccountStatus.Connected && prevAccount.status !== AccountStatus.Connected) {
        onConnectDebounced?.(account)
      }
      if (account.status === AccountStatus.Disconnected && prevAccount.status !== AccountStatus.Disconnected) {
        onDisconnectDebounced?.(account)
      }
    },
    [onConnectDebounced, onDisconnectDebounced, onUnsupportedChainDebounced]
  )

  useEffect(() => {
    watchAccount(onChange)
  }, [onChange, watchAccount])

  return account
}
