import { TokenSelectorInfo } from '@echo/ui/components/base/token-selector/token-selector-info'
import { TokenSelectorInput } from '@echo/ui/components/base/token-selector/token-selector-input'
import { TokenSelectorInputLayout } from '@echo/ui/components/base/token-selector/token-selector-input-layout'
import { TokenSelectorLayout } from '@echo/ui/components/base/token-selector/token-selector-layout'
import { TokenSelectorTokenInput } from '@echo/ui/components/base/token-selector/token-selector-token-input'
import { defaultERC20Token, supportedERC20Tokens } from '@echo/web3-dom/constants/supported-erc20-tokens'
import type { ERC20Token } from '@echo/web3-dom/types/erc20-token'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  onAddToken?: (token: ERC20Token, quantity: number) => unknown
}

export const TokenSelector: FunctionComponent<Props> = ({ onAddToken }) => {
  const t = useTranslations('tokenSelector')
  const [tokenValue, setTokenValue] = useState<number>()
  const [selectedToken, setSelectedToken] = useState<ERC20Token>(defaultERC20Token)

  return (
    <TokenSelectorLayout>
      <TokenSelectorInfo />
      <TokenSelectorInputLayout>
        <TokenSelectorInput onValueChange={setTokenValue} maxValue={100} value={tokenValue} />
        <TokenSelectorTokenInput
          tokens={supportedERC20Tokens}
          onTokenChanged={setSelectedToken}
          selectedToken={selectedToken}
        />
      </TokenSelectorInputLayout>

      <button
        className={clsx('btn-primary-reverse', 'group', 'w-full', 'py-2.5')}
        disabled={isNil(tokenValue)}
        onClick={() => tokenValue && onAddToken?.(selectedToken, tokenValue)}
      >
        <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
      </button>
    </TokenSelectorLayout>
  )
}
