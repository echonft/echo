'use client'
import type { NftAction } from '@echo/ui/types/nft-action'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  action?: Nullable<NftAction>
  onClick?: MouseEventHandler
}

export const SelectableNftCardButton: FunctionComponent<Props> = ({ action, onClick }) => {
  const t = useTranslations('nft.action')
  if (!isNil(action)) {
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
        <span className={clsx('prose-label-sm', 'text-yellow-500')}>{t(action)}</span>
      </button>
    )
  }
  return (
    <div className={clsx('w-full', 'h-max', 'px-2.75', 'pt-2.5', 'pb-2.75', 'invisible')}>
      <span className={clsx('prose-label-sm', 'invisible')}>{'Placeholder'}</span>
    </div>
  )
}
