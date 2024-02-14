import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

interface Props {
  disabled?: boolean
}
export const OfferDetailsItemsSeparator: FunctionComponent<Props> = ({ disabled }) => {
  return (
    <div className={classes('pb-4')}>
      <ItemsSeparator disabled={disabled} />
    </div>
  )
}
