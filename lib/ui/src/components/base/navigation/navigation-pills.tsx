'use client'
import { NavigationPill } from './navigation-pill'
import { NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  items: Array<NavigationItem>
  selectedItemId: string
}

export const NavigationPills: FunctionComponent<Props> = ({ items, selectedItemId }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-3.5')}>
      {map(
        ({ id, name, path }) => (
          <NavigationPill key={id} name={name} path={path} selected={id === selectedItemId} />
        ),
        items
      )}
    </div>
  )
}
