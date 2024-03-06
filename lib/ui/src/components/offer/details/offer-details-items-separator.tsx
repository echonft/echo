import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  disabled?: boolean
}
export const OfferDetailsItemsSeparator: FunctionComponent<Props> = ({ disabled }) => {
  return (
    <div className={clsx('pb-4')}>
      <ItemsSeparator disabled={disabled} />
    </div>
  )
}
