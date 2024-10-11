'use client'
import type { Erc20Token, Erc20TokenBalance } from '@echo/model/types/token'
import { TokenSelectorInfo } from '@echo/ui/components/base/token-selector/token-selector-info'
import { TokenSelectorInput } from '@echo/ui/components/base/token-selector/token-selector-input'
import { TokenSelectorInputLayout } from '@echo/ui/components/base/token-selector/token-selector-input-layout'
import { TokenSelectorLayout } from '@echo/ui/components/base/token-selector/token-selector-layout'
import { TokenSelectorMenu } from '@echo/ui/components/base/token-selector/token-selector-menu'
import { useTokensBalance } from '@echo/ui/hooks/use-tokens-balance'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { find, gt, head, isNil, map, type NonEmptyArray, pathEq, pipe, prop } from 'ramda'
import { type Dispatch, type FunctionComponent, type SetStateAction, useState } from 'react'

interface Props {
  onAddToken?: (token: Erc20Token, quantity: number) => unknown
}

export const TokenSelector: FunctionComponent<Props> = ({ onAddToken }) => {
  const t = useTranslations('tokenSelector')
  const tokens = useTokensBalance()
  const [selectedToken, setSelectedToken] = pipe<
    [NonEmptyArray<Erc20TokenBalance>],
    Erc20TokenBalance,
    Erc20Token,
    [Erc20Token, Dispatch<SetStateAction<Erc20Token>>]
  >(
    head,
    prop('token'),
    useState<Erc20Token>
  )(tokens)
  const [quantity, setQuantity] = useState<number>()
  const selectedTokenBalance = nonNullableReturn(
    find<Erc20TokenBalance>(pathEq(selectedToken.name, ['token', 'name']))
  )(tokens)

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
        className={clsx('btn-primary-reverse', 'group', 'w-full', 'py-2.5')}
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
        <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
      </button>
    </TokenSelectorLayout>
  )
}
