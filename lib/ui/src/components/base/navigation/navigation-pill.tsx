import { InternalLink } from '../internal-link'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  name: string
  path: string
  selected?: boolean
}

export const NavigationPill: FunctionComponent<Props> = ({ name, path, selected }) => {
  return (
    <InternalLink className={'group'} path={path} disabled={selected}>
      <span
        className={clsx(
          'w-max',
          'h-max',
          'prose-label-md',
          'text-white',
          'py-3',
          'px-6',
          'rounded-lg',
          selected ? 'bg-white/[0.05]' : 'bg-transparent',
          !selected && 'group-hover:bg-white/[0.05]'
        )}
      >
        {name}
      </span>
    </InternalLink>
  )
}
