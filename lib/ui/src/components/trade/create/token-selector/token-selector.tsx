'use client'

import type { Erc20Token, TokenBalance } from '@echo/model/types/token'
import { TokenSelectorInfo } from '@echo/ui/components/trade/create/token-selector/token-selector-info'
import { TokenSelectorInput } from '@echo/ui/components/trade/create/token-selector/token-selector-input'
import { TokenSelectorInputLayout } from '@echo/ui/components/trade/create/token-selector/token-selector-input-layout'
import { TokenSelectorLayout } from '@echo/ui/components/trade/create/token-selector/token-selector-layout'
import { TokenSelectorMenu } from '@echo/ui/components/trade/create/token-selector/token-selector-menu'
import { useErc20TokenBalances } from '@echo/ui/hooks/use-erc20-token-balances'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { find, gt, head, isNil, map, type NonEmptyArray, pathEq, pipe, prop } from 'ramda'
import { type Dispatch, type FunctionComponent, type SetStateAction, useState } from 'react'

interface Props {
  onAddToken?: (token: Erc20Token, quantity: number) => void
}

export const TokenSelector: FunctionComponent<Props> = ({ onAddToken }) => {
  const t = useTranslations('trade.tokenSelector')
  const tokens = useErc20TokenBalances()
  const [selectedToken, setSelectedToken] = pipe<
    [NonEmptyArray<TokenBalance<Erc20Token>>],
    TokenBalance<Erc20Token>,
    Erc20Token,
    [Erc20Token, Dispatch<SetStateAction<Erc20Token>>]
  >(
    head,
    prop('token'),
    useState<Erc20Token>
  )(tokens)
  const [quantity, setQuantity] = useState<number>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selectedTokenBalance = find<TokenBalance<Erc20Token>>(pathEq(selectedToken.name, ['token', 'name']))(tokens)!

  return (
    <TokenSelectorLayout>
      <TokenSelectorInfo />
      <TokenSelectorInputLayout>
        <TokenSelectorInput tokenBalance={selectedTokenBalance} value={quantity} onChange={setQuantity} />
        <TokenSelectorMenu
          tokens={map(prop('token'), tokens)}
          onTokenChanged={(token) => {
            setSelectedToken(token)
            setQuantity(undefined)
          }}
          selectedToken={selectedToken}
        />
      </TokenSelectorInputLayout>
      <button
        className={clsx('btn-primary', 'group', '!w-full')}
        disabled={
          isNil(quantity) ||
          quantity > selectedTokenBalance.balance ||
          quantity <= Math.pow(10, -selectedToken.decimals)
        }
        onClick={() => {
          if (!isNil(quantity) && gt(quantity, 0)) {
            onAddToken?.(selectedToken, quantity)
          }
        }}
      >
        <span className={clsx('btn-label-primary')}>{t('btn')}</span>
      </button>
    </TokenSelectorLayout>
  )
}
