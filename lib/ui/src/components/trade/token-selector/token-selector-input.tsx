import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'
import { TokenSelectorInputMaxButton } from '@echo/ui/components/trade/token-selector/token-selector-input-max-button'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  tokenBalance: TokenBalance<Erc20Token>
  value: number | undefined
  onChange?: (value: number) => unknown
}

export const TokenSelectorInput: FunctionComponent<Props> = ({ tokenBalance, value, onChange }) => {
  const t = useTranslations('trade.tokenSelector')
  const {
    token: { decimals },
    balance
  } = tokenBalance
  const step = Math.pow(10, -decimals)
  return (
    <div className={clsx('flex', 'flex-col', 'grow', 'relative')}>
      <span className={clsx('prose-paragraph-xs', 'text-white/50', 'mb-3')}>{t('balance', { balance })}</span>
      <input
        type={'number'}
        max={balance}
        min={step}
        step={step}
        className={clsx(
          'bg-transparent',
          'rounded-lg',
          'border',
          'border-white/[0.08]',
          'py-2',
          'px-2.5',
          'h-9',
          'placeholder:text-white/50',
          'placeholder:prose-label-xs-semi',
          'prose-label-xs-semi',
          'text-white',
          'outline-none'
        )}
        placeholder={t('placeholder')}
        onChange={(event) => {
          try {
            onChange?.(Number(event.target.value))
          } catch (_err) {
            /* onChange won't be called */
          }
        }}
        value={value}
      ></input>
      <div className={clsx('w-max', 'h-max', 'absolute', 'bottom-1.5', 'right-1.5')}>
        <TokenSelectorInputMaxButton
          tokenBalance={tokenBalance}
          quantity={value}
          onClick={() => {
            onChange?.(tokenBalance.balance)
          }}
        />
      </div>
    </div>
  )
}
