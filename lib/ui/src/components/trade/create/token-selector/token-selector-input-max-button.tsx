import type { Erc20Token, TokenBalance } from '@echo/model/types/token'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  tokenBalance: TokenBalance<Erc20Token>
  quantity?: number
  onClick?: MouseEventHandler
}

export const TokenSelectorInputMaxButton: FunctionComponent<Props> = ({ tokenBalance, quantity, onClick }) => {
  const t = useTranslations('trade.tokenSelector')
  const { balance } = tokenBalance

  if (balance === 0) {
    return null
  }
  return (
    <button
      className={clsx(
        'w-max',
        'p-1',
        'rounded',
        'bg-dark-450',
        'border',
        'border-solid',
        'border-white/[0.08]',
        'outline-none',
        'select-none',
        'disabled:opacity-40 ',
        'enabled:hover:bg-white/[0.12]',
        'transition-colors'
      )}
      disabled={!isNil(quantity) && quantity >= balance}
      onClick={onClick}
    >
      <span className={clsx('w-max', 'h-max', 'prose-label-xs-semi', 'text-white', 'select-none')}>{t('max')}</span>
    </button>
  )
}
