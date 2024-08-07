import { eqERC20 } from '@echo/model/helpers/token/eq-erc20'
import type { OwnedERC20Token } from '@echo/model/types/owned-erc20-token'
import { TokenSelectorInfo } from '@echo/ui/components/base/token-selector/token-selector-info'
import { TokenSelectorInput } from '@echo/ui/components/base/token-selector/token-selector-input'
import { TokenSelectorInputLayout } from '@echo/ui/components/base/token-selector/token-selector-input-layout'
import { TokenSelectorLayout } from '@echo/ui/components/base/token-selector/token-selector-layout'
import { TokenSelectorTokenInput } from '@echo/ui/components/base/token-selector/token-selector-token-input'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { always, find, head, ifElse, isNil, pipe, prop } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

interface Props {
  onAddToken?: (token: OwnedERC20Token, quantity: number) => unknown
  tokens: OwnedERC20Token[]
}

export const TokenSelector: FunctionComponent<Props> = ({ onAddToken, tokens }) => {
  const t = useTranslations('tokenSelector')
  const [tokenValue, setTokenValue] = useState<number>()
  // FIXME
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [selectedToken, setSelectedToken] = useState(head(tokens)!)

  const getTokenMaxValue = useCallback(
    () => pipe(find(eqERC20(selectedToken)), ifElse(isNil, always(0), prop('balance')))(tokens),
    [selectedToken, tokens]
  )

  return (
    <TokenSelectorLayout>
      <TokenSelectorInfo />
      <TokenSelectorInputLayout>
        <TokenSelectorInput onValueChange={setTokenValue} balance={getTokenMaxValue()} value={tokenValue} />
        <TokenSelectorTokenInput
          tokens={tokens}
          onTokenChanged={(token) => {
            setSelectedToken(token)
            setTokenValue(undefined)
          }}
          selectedToken={selectedToken}
        />
      </TokenSelectorInputLayout>

      <button
        className={clsx('btn-primary-reverse', 'group', 'w-full', 'py-2.5')}
        disabled={isNil(tokenValue) || tokenValue > getTokenMaxValue() || tokenValue <= 0}
        onClick={() => tokenValue && onAddToken?.(selectedToken, tokenValue)}
      >
        <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
      </button>
    </TokenSelectorLayout>
  )
}
