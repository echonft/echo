import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

interface Props {
  label: string
}

export const CardSubtitle: FunctionComponent<Props> = ({ label }) => {
  return <p className={classes('prose-label-sm-light', 'text-white/70', 'truncate')}>{label}</p>
}
