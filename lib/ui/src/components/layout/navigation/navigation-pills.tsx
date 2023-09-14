'use client'
import { NavigationPill } from '@echo/ui/components/layout/navigation/navigation-pill'
import type { NavigationItem } from '@echo/ui/types/navigation-item'
import type { NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { clsx } from 'clsx'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  items: Array<NavigationItem>
  activeItem: NavigationItemId
}

export const NavigationPills: FunctionComponent<Props> = ({ items, activeItem }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-3.5', 'h-max', 'py-12')}>
      {map(
        ({ id, name, path }) => (
          <NavigationPill key={id} name={name} path={path} selected={id === activeItem} />
        ),
        items
      )}
    </div>
  )
}
