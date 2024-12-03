import { NftAction } from '@echo/ui/constants/nft-actions'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface NftSelectionButtonProps {
  count: number
  action?: Nullable<NftAction>
  onClick?: MouseEventHandler
}

export const SelectableNftCardsActionButton: FunctionComponent<NftSelectionButtonProps> = ({
  action,
  count,
  onClick
}) => {
  const t = useTranslations('nft.action')
  if (isNil(action)) {
    return null
  }

  const label = action === NftAction.Offer ? t('offer') : t('listing')
  return (
    <button disabled={count === 0} onClick={onClick} className={clsx('btn-gradient', 'group')}>
      <div className={clsx('btn-label-with-icon-layout')}>
        <span className={clsx('btn-label-gradient')}>{label}</span>
        <div
          className={clsx(
            'w-5',
            'h-5',
            'rounded-lg',
            'flex',
            'items-center',
            'justify-center',
            'bg-dark-100',
            'select-none'
          )}
        >
          <span className={clsx('prose-label-xs-semi', 'text-white/75', 'group-hover:text-white', 'select-none')}>
            {count}
          </span>
        </div>
      </div>
    </button>
  )
}
