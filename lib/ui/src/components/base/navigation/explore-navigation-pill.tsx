import { InternalLink } from '@echo/ui/components/base/internal-link'
import type { NavigationPillProps } from '@echo/ui/components/base/navigation/navigation-pill'
import { ExploreIconSvg } from '@echo/ui/components/base/svg/explore-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const ExploreNavigationPill: FunctionComponent<NavigationPillProps> = ({ name, path, selected }) => {
  return (
    <InternalLink
      className={clsx(
        'w-max',
        'h-max',
        'flex',
        'flex-row',
        'gap-2.5',
        'items-center',
        'py-3',
        'px-6',
        'rounded-lg',
        selected ? 'bg-white/[0.05]' : 'bg-transparent',
        !selected && 'hover:bg-white/[0.05]'
      )}
      path={path}
      disabled={selected}
    >
      <span className={clsx('prose-label-md', 'text-yellow-500', 'select-none')}>{name}</span>
      <span className={clsx('text-yellow-500')}>
        <ExploreIconSvg />
      </span>
    </InternalLink>
  )
}
