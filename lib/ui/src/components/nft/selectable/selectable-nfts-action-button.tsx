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

export const SelectableNftsActionButton: FunctionComponent<NftSelectionButtonProps> = ({ action, count, onClick }) => {
  const t = useTranslations('nft.action')
  if (isNil(action)) {
    return null
  }

  const label = action === NftAction.Offer ? t('offer') : t('listing')
  return (
    <button
      disabled={count === 0}
      onClick={onClick}
      className={clsx('btn-gradient', 'group', '!justify-between', 'w-max', 'p-3', 'items-center', 'gap-12')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{label}</span>
      <div className={clsx('flex', 'items-center', 'justify-center', 'px-2', 'rounded-lg', 'bg-dark-300')}>
        <span
          className={clsx(
            'text-[0.9375rem]',
            'font-medium',
            'leading-[155%]',
            'tracking-[0.00938rem]',
            'font-inter',
            'text-white/50'
          )}
        >
          {count}
        </span>
      </div>
    </button>
  )
}
