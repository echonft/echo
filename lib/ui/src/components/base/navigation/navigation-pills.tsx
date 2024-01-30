'use client'
import { NavigationPill } from '@echo/ui/components/base/navigation/navigation-pill'
import { NavigationPillsLayout } from '@echo/ui/components/base/navigation/navigation-pills-layout'
import { type NavigationItem } from '@echo/ui/types/navigation-item'
import { type NavigationItemId } from '@echo/ui/types/navigation-item-id'
import { isNil, map } from 'ramda'
import { Fragment, type FunctionComponent } from 'react'

interface Props {
  items: NavigationItem[]
  activeItem: NavigationItemId
}

export const NavigationPills: FunctionComponent<Props> = ({ items, activeItem }) => {
  return (
    <NavigationPillsLayout>
      {map(
        ({ id, name, path, render }) =>
          !isNil(render) ? (
            <Fragment key={id}>{render({ name, path, selected: id === activeItem })}</Fragment>
          ) : (
            <NavigationPill key={id} name={name} path={path} selected={id === activeItem} />
          ),
        items
      )}
    </NavigationPillsLayout>
  )
}
