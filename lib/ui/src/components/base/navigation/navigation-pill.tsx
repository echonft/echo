import { InternalLink } from '@echo/ui/components/base/internal-link'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface NavigationPillProps {
  name: string
  path: string
  selected?: boolean
}

export const NavigationPill: FunctionComponent<NavigationPillProps> = ({ name, path, selected }) => {
  return (
    <InternalLink
      className={clsx(
        'w-max',
        'h-max',
        'py-3',
        'px-6',
        'rounded-lg',
        selected ? 'bg-white/[0.05]' : 'bg-transparent',
        !selected && 'hover:bg-white/[0.05]'
      )}
      path={path}
      disabled={selected}
    >
      <span className={clsx('prose-label-md', 'text-white', 'select-none')}>{name}</span>
    </InternalLink>
  )
}
