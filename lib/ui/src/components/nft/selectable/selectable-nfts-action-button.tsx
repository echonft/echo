import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import type { NftAction } from '@echo/ui/types/nft-action'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface NftSelectionButtonProps {
  count: number
  action?: NftAction
  onClick?: MouseEventHandler
}

export const SelectableNftsActionButton: FunctionComponent<NftSelectionButtonProps> = ({ action, count, onClick }) => {
  const t = useTranslations('nft.action')
  if (isNil(action)) {
    return null
  }

  const label = action === NFT_ACTION_OFFER ? t('offer') : t('listing')
  return (
    <button
      disabled={count === 0}
      onClick={onClick}
      className={clsx('btn-gradient', 'group', '!justify-between', 'w-full', 'p-2.5', 'h-[2.875rem]', 'items-center')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{label}</span>
      <div className={clsx('flex', 'items-center', 'justify-center', 'w-6', 'h-6', 'rounded-lg', 'bg-dark-300')}>
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
