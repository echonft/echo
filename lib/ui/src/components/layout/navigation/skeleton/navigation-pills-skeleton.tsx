import { NavigationItem } from '../../../../types/navigation-item'
import { NavigationItemId } from '../../../../types/navigation-item-id'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  navigationItems: Array<NavigationItem>
  activeNavigationItem: NavigationItemId
}

export const NavigationPillsSkeleton: FunctionComponent<Props> = ({ navigationItems, activeNavigationItem }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-3.5', 'py-12')}>
      {map(
        ({ id, name }) => (
          <span
            key={id}
            className={clsx(
              'w-max',
              'h-max',
              'prose-label-md',
              'text-white',
              'py-3',
              'px-6',
              'rounded-lg',
              id === activeNavigationItem ? 'bg-white/[0.05]' : 'bg-transparent'
            )}
          >
            {name}
          </span>
        ),
        navigationItems
      )}
    </div>
  )
}
