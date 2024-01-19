'use client'
import { NavigationPill } from '@echo/ui/components/navigation/navigation-pill'
import { NavigationPillsLayout } from '@echo/ui/components/navigation/navigation-pills-layout'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: NavigationItem[]
  activeItem: NavigationItemId
}

export const NavigationPills: FunctionComponent<Props> = ({ items, activeItem }) => {
  return (
    <NavigationPillsLayout>
      {map(
        ({ id, name, path }) => (
          <NavigationPill key={id} name={name} path={path} selected={id === activeItem} />
        ),
        items
      )}
    </NavigationPillsLayout>
  )
}
