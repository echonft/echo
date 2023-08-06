import { CollapsibleProps } from '../../../types/collapsible-props'
import { DownCaretSvg } from '../../base/svg/down-caret-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface TraitFilterButtonProps extends CollapsibleProps {
  trait: string
  selectionCount: number
}

export const TraitFilterButton: FunctionComponent<TraitFilterButtonProps> = ({
  trait,
  selectionCount,
  collapsed,
  onToggleCollapsed
}) => {
  const t = useTranslations('collection.filters.traits.button')
  return (
    <button
      className={clsx(
        'flex',
        'flex-row',
        'justify-between',
        'items-center',
        'w-full',
        'h-max',
        'px-3',
        'py-2',
        'rounded-lg',
        'bg-white/[0.08]'
      )}
      onClick={() => {
        onToggleCollapsed?.(!collapsed)
      }}
    >
      <span className={clsx('prose-label-sm-semi', 'text-white', 'truncate')}>
        {t('title', { trait, count: selectionCount })}
      </span>
      <span className={clsx('text-white/50', 'transition-transform', collapsed && 'rotate-180')}>
        <DownCaretSvg />
      </span>
    </button>
  )
}
