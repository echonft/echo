import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithClassNameProps {
  name: string
}

export const NftCardTitleCollectionName: FunctionComponent<Props> = ({ className, name }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.875rem]',
        'font-medium',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white',
        'truncate',
        className
      )}
    >
      {name}
    </p>
  )
}
