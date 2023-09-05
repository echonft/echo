import { NavigationItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  items: Array<NavigationItem>
  selectedItemId: string
}

export const NavigationPillsSkeleton: FunctionComponent<Props> = ({ items, selectedItemId }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'w-full', 'gap-3.5')}>
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
              id === selectedItemId ? 'bg-white/[0.05]' : 'bg-transparent'
            )}
          >
            {name}
          </span>
        ),
        items
      )}
    </div>
  )
}
