'use client'
import { DownCaretSvg } from '@echo/ui/components/base/svg/down-caret-svg'
import { classes } from '@echo/ui/helpers/classes'
import { type WithCollapsibleProps } from '@echo/ui/types/props/with-collapsible-props'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { type FunctionComponent } from 'react'

interface Props extends WithCollapsibleProps {
  name?: string
}

export const NftGroupButton: FunctionComponent<Props> = ({ name, collapsed, onToggleCollapsed }) => {
  if (isNilOrEmpty(name)) {
    return null
  }
  return (
    <button
      className={classes(
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
      <span className={classes('prose-label-md', 'text-white')}>{name}</span>
      <span className={classes('text-white/50', 'transition-transform', collapsed && 'rotate-180')}>
        <DownCaretSvg />
      </span>
    </button>
  )
}
