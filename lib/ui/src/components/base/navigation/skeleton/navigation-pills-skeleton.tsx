import { NavigationPillsLayout } from '@echo/ui/components/base/navigation/navigation-pills-layout'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import type { NavigationSkeletonItem } from '@echo/ui/types/navigation-skeleton-item'
import { clsx } from 'clsx'
import { isNil, map } from 'ramda'
import { Fragment, type FunctionComponent } from 'react'

interface Props {
  navigationItems: NavigationSkeletonItem[]
  activeNavigationItem: NavigationItemId
}

export const NavigationPillsSkeleton: FunctionComponent<Props> = ({ navigationItems, activeNavigationItem }) => {
  return (
    <NavigationPillsLayout>
      {map(
        ({ id, name, render }) =>
          !isNil(render) ? (
            <Fragment key={id}>{render({ name, selected: id === activeNavigationItem })}</Fragment>
          ) : (
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
    </NavigationPillsLayout>
  )
}
