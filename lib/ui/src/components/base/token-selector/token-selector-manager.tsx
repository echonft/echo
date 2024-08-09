'use client'
import type { OwnedERC20Token } from '@echo/model/types/owned-erc20-token'
import { TokenSelector } from '@echo/ui/components/base/token-selector/token-selector'
import { useTokensBalance } from '@echo/ui/hooks/use-tokens-balance'
import type { FunctionComponent } from 'react'

interface Props {
  onAddToken?: (token: OwnedERC20Token, quantity: number) => unknown
}

export const TokenSelectorManager: FunctionComponent<Props> = ({ onAddToken }) => {
  const tokenBalances = useTokensBalance()

  return <TokenSelector tokens={tokenBalances} onAddToken={onAddToken} />
}
