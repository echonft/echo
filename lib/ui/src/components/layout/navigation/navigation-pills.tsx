'use client'
import { NavigationItem } from '../../../types/navigation-item'
import { NavigationItemId } from '../../../types/navigation-item-id'
import { NavigationPill } from './navigation-pill'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

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
