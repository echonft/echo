'use client'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  nft: SelectableNft
  onClick?: MouseEventHandler
}

export const SelectableNftCardButton: FunctionComponent<Props> = ({ nft, onClick }) => {
  const { actionDisabled, disabled, action } = nft
  const t = useTranslations('nft.action')
  if (isNil(action)) {
    return null
  }
  if (!disabled && !actionDisabled) {
    return (
      <button
        className={clsx(
          'w-full',
          'h-max',
          'px-2.75',
          'pt-2.5',
          'pb-2.75',
          'text-left',
          'hover:bg-nftButtonHover',
          'transition-opacity ease-in-out',
          'opacity-0',
          'group-hover:opacity-100'
        )}
        onClick={onClick}
      >
        <span
          className={clsx(
            'font-inter',
            'text-[0.875rem]',
            'font-medium',
            'leading-[0.9375rem]',
            'tracking-[0.0175rem]',
            'text-yellow-500'
          )}
        >
          {t(action)}
        </span>
      </button>
    )
  }
  return (
    <div className={clsx('w-full', 'h-max', 'px-2.75', 'pt-2.5', 'pb-2.75', 'invisible')}>
      <span
        className={clsx(
          'font-inter',
          'text-[0.875rem]',
          'font-medium',
          'leading-[0.9375rem]',
          'tracking-[0.0175rem]',
          'invisible'
        )}
      >
        {'Placeholder'}
      </span>
    </div>
  )
}
