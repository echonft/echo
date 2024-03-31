import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const OfferDetailsItemsSeparator: FunctionComponent = () => {
  return (
    <div className={clsx('pb-4')}>
      <ItemsSeparator />
    </div>
  )
}
