import { DownCaretSvg } from '@echo/ui/components/base/svg/down-caret-svg'
import { type CollapsibleProps } from '@echo/ui/types/props/collapsible-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends CollapsibleProps {
  name: string
}

export const NftGroupButton: FunctionComponent<Props> = ({ name, collapsed, onToggleCollapsed }) => {
  return (
    <button
      className={clsx(
        'flex',
        'flex-row',
        'h-max',
        'w-max',
        'items-center',
        'gap-2.5',
        'p-2.5',
        'prose-label-md',
        'outline-none'
      )}
      onClick={() => {
        onToggleCollapsed?.(!collapsed)
      }}
    >
      <span className={clsx('prose-label-md', 'text-white')}>{name}</span>
      <span className={clsx('text-white/50', 'transition-transform', collapsed && 'rotate-180')}>
        <DownCaretSvg />
      </span>
    </button>
  )
}
