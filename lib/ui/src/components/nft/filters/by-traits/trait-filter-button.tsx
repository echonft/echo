import { DownCaretSvg } from '@echo/ui/components/base/svg/down-caret-svg'
import { type WithCollapsibleProps } from '@echo/ui/types/props/with-collapsible-props'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props extends WithCollapsibleProps {
  trait: string
}

export const TraitFilterButton: FunctionComponent<Props> = ({ trait, collapsed, onToggleCollapsed }) => {
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
        'bg-white/[0.08]',
        'prose-label-sm-semi',
        'outline-none'
      )}
      onClick={() => {
        onToggleCollapsed?.(!collapsed)
      }}
    >
      <span className={clsx('prose-label-sm-semi', 'text-white', 'truncate')}>{t('title', { trait })}</span>
      <span className={clsx('text-white/50', 'transition-transform', collapsed && 'rotate-180')}>
        <DownCaretSvg />
      </span>
    </button>
  )
}
