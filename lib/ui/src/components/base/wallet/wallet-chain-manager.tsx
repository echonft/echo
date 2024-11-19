'use client'
import { logError } from '@echo/ui/helpers/log-error'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { type FunctionComponent, useRef } from 'react'

export const WalletChainManager: FunctionComponent = () => {
  const { switchChain } = useDependencies()
  const switchingChainRef = useRef(false)
  useAccount({
    onUnsupportedChain: async () => {
      if (!switchingChainRef.current) {
        switchingChainRef.current = true
        try {
          await switchChain()
        } catch (err) {
          logError(err)
        } finally {
          switchingChainRef.current = false
        }
      }
    }
  })

  return null
}
