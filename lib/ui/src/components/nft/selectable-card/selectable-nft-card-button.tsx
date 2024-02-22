'use client'
import { classes } from '@echo/ui/helpers/classes'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
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
        className={classes(
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
        <span className={classes('prose-label-sm', 'text-yellow-500')}>{t(action)}</span>
      </button>
    )
  }
  return (
    <div className={classes('w-full', 'h-max', 'px-2.75', 'pt-2.5', 'pb-2.75', 'invisible')}>
      <span className={classes('prose-label-sm', 'invisible')}>{'Placeholder'}</span>
    </div>
  )
}
