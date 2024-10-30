import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { createWalletStore, type CreateWalletStoreArgs, type WalletStoreApi } from '@echo/ui/stores/wallet-store'
import { isNil, mergeDeepLeft } from 'ramda'

type Handlers = Partial<Pick<CreateWalletStoreArgs, 'onConnect' | 'onDisonnect' | 'onUnsupportedChain'>>
type Selector<T> = (state: WalletStoreApi) => T

export function useWalletStore(handlers?: Handlers): WalletStoreApi
export function useWalletStore<T>(selector: Selector<T>, handlers?: Handlers): T

// Implementation
export function useWalletStore<T>(
  selectorOrHandlers?: Selector<T> | Handlers,
  handlers?: Handlers
): WalletStoreApi | T {
  const { getAccount, switchChain, watchAccount } = useDependencies()

  // If first argument is a function, it's the selector
  if (typeof selectorOrHandlers === 'function') {
    const selector = selectorOrHandlers
    if (isNil(handlers)) {
      return createWalletStore({ getAccount, watchAccount })(selector)
    }
    return createWalletStore(mergeDeepLeft({ getAccount, switchChain, watchAccount }, handlers))(selector)
  }

  // Otherwise, it's the handlers (or undefined)
  if (isNil(selectorOrHandlers)) {
    return createWalletStore({ getAccount, watchAccount })()
  }
  return createWalletStore(mergeDeepLeft({ getAccount, switchChain, watchAccount }, selectorOrHandlers))()
}
